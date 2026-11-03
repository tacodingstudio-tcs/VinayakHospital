using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.EntityFrameworkCore;
using vinayankhospitalkodinar.Data;
using vinayankhospitalkodinar.Models;

var builder = WebApplication.CreateBuilder(args);

// Secrets come from environment / user-secrets only (ConnectionStrings__HospitalConnection, AdminPassword, TokenKey, WebOrigin).
var conn = builder.Configuration.GetConnectionString("HospitalConnection")
           ?? throw new InvalidOperationException("ConnectionStrings__HospitalConnection is not set.");
var adminPassword = builder.Configuration["AdminPassword"] ?? "";
var tokenKey = Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"] ?? RandomNumberGenerator.GetHexString(64));
var webOrigin = builder.Configuration["WebOrigin"] ?? "http://localhost:3000";

builder.Services.AddDbContext<ApplicationDbContext>(o => o.UseSqlServer(conn));
builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.WithOrigins(webOrigin).AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = 429;
    o.AddPolicy("forms", ctx => RateLimitPartition.GetFixedWindowLimiter(
        ctx.Connection.RemoteIpAddress?.ToString() ?? "x",
        _ => new FixedWindowRateLimiterOptions { PermitLimit = 8, Window = TimeSpan.FromMinutes(10) }));
    o.AddPolicy("login", ctx => RateLimitPartition.GetFixedWindowLimiter(
        ctx.Connection.RemoteIpAddress?.ToString() ?? "x",
        _ => new FixedWindowRateLimiterOptions { PermitLimit = 5, Window = TimeSpan.FromMinutes(15) }));
});

var app = builder.Build();
app.UseCors();
app.UseRateLimiter();

// ---------- helpers ----------
static bool Valid(object model, out Dictionary<string, string[]> errors)
{
    var results = new List<ValidationResult>();
    var ok = Validator.TryValidateObject(model, new ValidationContext(model), results, true);
    errors = results.GroupBy(r => r.MemberNames.FirstOrDefault() ?? "").ToDictionary(g => g.Key, g => g.Select(r => r.ErrorMessage ?? "Invalid").ToArray());
    return ok;
}

string Sign(long expires)
{
    var payload = expires.ToString();
    var sig = Convert.ToHexString(HMACSHA256.HashData(tokenKey, Encoding.UTF8.GetBytes(payload)));
    return $"{payload}.{sig}";
}

bool IsAdmin(HttpRequest req)
{
    var h = req.Headers.Authorization.ToString();
    if (!h.StartsWith("Bearer ")) return false;
    var parts = h[7..].Split('.');
    if (parts.Length != 2 || !long.TryParse(parts[0], out var exp) || exp < DateTimeOffset.UtcNow.ToUnixTimeSeconds()) return false;
    var expected = Convert.ToHexString(HMACSHA256.HashData(tokenKey, Encoding.UTF8.GetBytes(parts[0])));
    return CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(expected), Encoding.UTF8.GetBytes(parts[1]));
}

// ---------- public ----------
app.MapGet("/api/health", () => Results.Ok(new { ok = true }));

app.MapPost("/api/appointments", async (AppointmentIn i, ApplicationDbContext db) =>
{
    if (!string.IsNullOrEmpty(i.Website)) return Results.Ok(new { success = true }); // honeypot
    var a = new Appointment
    {
        FullName = i.FullName?.Trim(), MobileNumber = i.MobileNumber?.Trim(), Email = string.IsNullOrWhiteSpace(i.Email) ? null : i.Email.Trim(),
        DoctorName = i.DoctorName?.Trim(), AppointmentDate = i.AppointmentDate, Message = i.Message?.Trim(), CreatedAt = DateTime.Now
    };
    if (!Valid(a, out var err)) return Results.BadRequest(new { success = false, errors = err });
    if (a.AppointmentDate.Date < DateTime.Today) return Results.BadRequest(new { success = false, errors = new { AppointmentDate = new[] { "Choose today or a future date." } } });
    db.Appointments.Add(a);
    await db.SaveChangesAsync();
    return Results.Ok(new { success = true });
}).RequireRateLimiting("forms");

app.MapPost("/api/reviews", async (ReviewIn i, ApplicationDbContext db) =>
{
    if (!string.IsNullOrEmpty(i.Website)) return Results.Ok(new { success = true });
    var r = new Review { FullName = i.FullName?.Trim() ?? "", City = i.City?.Trim(), Rating = i.Rating, ReviewMessage = i.ReviewMessage?.Trim() ?? "", IsApproved = false, CreatedAt = DateTime.Now };
    if (r.Rating is < 1 or > 5) return Results.BadRequest(new { success = false });
    if (!Valid(r, out var err)) return Results.BadRequest(new { success = false, errors = err });
    db.Reviews.Add(r);
    await db.SaveChangesAsync();
    return Results.Ok(new { success = true, pending = true });
}).RequireRateLimiting("forms");

app.MapGet("/api/reviews", async (ApplicationDbContext db) =>
    await db.Reviews.Where(r => r.IsApproved).OrderByDescending(r => r.CreatedAt).Take(12)
        .Select(r => new { r.FullName, r.City, r.Rating, r.ReviewMessage, r.CreatedAt }).ToListAsync());

app.MapPost("/api/leads/pregnancy", async (LeadIn i, ApplicationDbContext db) =>
{
    var l = new PregnancyLead { Name = i.Name?.Trim() ?? "", Mobile = i.Mobile?.Trim() ?? "", Email = string.IsNullOrWhiteSpace(i.Email) ? null : i.Email.Trim(), LastPeriodDate = i.LastPeriodDate, CycleLength = i.CycleLength is >= 20 and <= 45 ? i.CycleLength : 28, EstimatedDueDate = i.EstimatedDueDate, CreatedAt = DateTime.Now };
    if (!Valid(l, out _) || !System.Text.RegularExpressions.Regex.IsMatch(l.Mobile, @"^[6-9]\d{9}$")) return Results.BadRequest(new { success = false });
    db.PregnancyLeads.Add(l);
    await db.SaveChangesAsync();
    return Results.Ok(new { success = true });
}).RequireRateLimiting("forms");

app.MapGet("/api/blog", async (string? category, ApplicationDbContext db) =>
{
    var q = db.BlogPosts.Where(p => p.IsPublished);
    if (!string.IsNullOrWhiteSpace(category)) q = q.Where(p => p.Category == category);
    return await q.OrderByDescending(p => p.CreatedAt).Select(p => new { p.Slug, p.Title, p.Category, p.Summary, p.CoverImage, p.CreatedAt }).ToListAsync();
});

app.MapGet("/api/blog/{slug}", async (string slug, ApplicationDbContext db) =>
    await db.BlogPosts.FirstOrDefaultAsync(p => p.Slug == slug && p.IsPublished) is { } p ? Results.Ok(p) : Results.NotFound());


// ---------- static content (reused from the original project's data classes) ----------
app.MapGet("/api/content/pregnancy", () => PregnancyWeekData.GetAll());
app.MapGet("/api/content/pregnancy/{week:int}", (int week) => PregnancyWeekData.Get(week) is { } w ? Results.Ok(w) : Results.NotFound());
app.MapGet("/api/content/hospital-bag", () => HospitalBagData.GetCategories());
app.MapGet("/api/content/vaccination", () => VaccinationScheduleData.GetSchedule());
app.MapGet("/api/content/growth", () => GrowthReferenceData.GetReference());
app.MapGet("/api/content/milestones", () => MilestoneData.GetContent());
app.MapGet("/api/content/womens-health", () => WomensHealthData.GetContent());
app.MapGet("/api/content/womens-health/{slug}", (string slug) => WomensHealthData.GetArticleBySlug(slug) is { } a ? Results.Ok(a) : Results.NotFound());

// ---------- admin ----------
app.MapPost("/api/admin/login", (LoginIn i) =>
{
    if (adminPassword.Length == 0 || string.IsNullOrEmpty(i.Password)) return Results.Unauthorized();
    var ok = CryptographicOperations.FixedTimeEquals(SHA256.HashData(Encoding.UTF8.GetBytes(i.Password)), SHA256.HashData(Encoding.UTF8.GetBytes(adminPassword)));
    return ok ? Results.Ok(new { token = Sign(DateTimeOffset.UtcNow.AddHours(4).ToUnixTimeSeconds()) }) : Results.Unauthorized();
}).RequireRateLimiting("login");

var admin = app.MapGroup("/api/admin").AddEndpointFilter(async (ctx, next) =>
    IsAdmin(ctx.HttpContext.Request) ? await next(ctx) : Results.Unauthorized());

admin.MapGet("/appointments", async (ApplicationDbContext db) => await db.Appointments.OrderByDescending(a => a.Id).ToListAsync());
admin.MapGet("/leads", async (ApplicationDbContext db) => await db.PregnancyLeads.OrderByDescending(a => a.Id).ToListAsync());
admin.MapGet("/reviews", async (ApplicationDbContext db) => await db.Reviews.OrderByDescending(a => a.Id).ToListAsync());
admin.MapPost("/reviews/{id:int}/approve", async (int id, bool approved, ApplicationDbContext db) =>
{
    var r = await db.Reviews.FindAsync(id); if (r is null) return Results.NotFound();
    r.IsApproved = approved; await db.SaveChangesAsync(); return Results.Ok();
});
admin.MapDelete("/reviews/{id:int}", async (int id, ApplicationDbContext db) =>
{
    var r = await db.Reviews.FindAsync(id); if (r is null) return Results.NotFound();
    db.Reviews.Remove(r); await db.SaveChangesAsync(); return Results.Ok();
});
admin.MapGet("/blog", async (ApplicationDbContext db) => await db.BlogPosts.OrderByDescending(p => p.CreatedAt).ToListAsync());
admin.MapPost("/blog", async (BlogPost p, ApplicationDbContext db) =>
{
    if (!Valid(p, out var err)) return Results.BadRequest(new { errors = err });
    p.Id = 0; p.CreatedAt = p.UpdatedAt = DateTime.Now; db.BlogPosts.Add(p); await db.SaveChangesAsync(); return Results.Ok(p);
});
admin.MapPut("/blog/{id:int}", async (int id, BlogPost m, ApplicationDbContext db) =>
{
    var p = await db.BlogPosts.FindAsync(id); if (p is null) return Results.NotFound();
    if (!Valid(m, out var err)) return Results.BadRequest(new { errors = err });
    (p.Title, p.Slug, p.Category, p.Summary, p.Content, p.CoverImage, p.IsPublished, p.UpdatedAt) = (m.Title, m.Slug, m.Category, m.Summary, m.Content, m.CoverImage, m.IsPublished, DateTime.Now);
    await db.SaveChangesAsync(); return Results.Ok(p);
});
admin.MapDelete("/blog/{id:int}", async (int id, ApplicationDbContext db) =>
{
    var p = await db.BlogPosts.FindAsync(id); if (p is null) return Results.NotFound();
    db.BlogPosts.Remove(p); await db.SaveChangesAsync(); return Results.Ok();
});

app.Run();

record AppointmentIn(string? FullName, string? MobileNumber, string? Email, string? DoctorName, DateTime AppointmentDate, string? Message, string? Website);
record ReviewIn(string? FullName, string? City, int Rating, string? ReviewMessage, string? Website);
record LeadIn(string? Name, string? Mobile, string? Email, DateTime LastPeriodDate, int CycleLength, DateTime EstimatedDueDate);
record LoginIn(string? Password);
