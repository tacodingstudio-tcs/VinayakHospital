namespace vinayankhospitalkodinar.Models
{
    public class DepartmentServiceItem
    {
        public string Title { get; set; } = string.Empty;
        public string Desc { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
    }

    /// <summary>
    /// A hospital department/specialty page. Services listed here mirror
    /// Views/Home/Services.cshtml's real content — keep both in sync.
    /// Overview copy is general and descriptive, not a clinical claim.
    /// </summary>
    public class Department
    {
        public string Slug { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Tagline { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public string Accent { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public List<DepartmentServiceItem> Items { get; set; } = new();

        /// <summary>Slug of the doctor most associated with this department, if any.</summary>
        public string? DoctorSlug { get; set; }
        public string? DoctorName { get; set; }
    }
}
