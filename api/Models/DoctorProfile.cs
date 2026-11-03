namespace vinayankhospitalkodinar.Models
{
    /// <summary>
    /// A doctor's public profile. Only real, verified information belongs
    /// here — no invented qualifications, languages, availability or
    /// awards. Fields we don't actually have confirmed data for (e.g.
    /// languages spoken, specific clinic hours) are simply omitted rather
    /// than guessed.
    /// </summary>
    public class DoctorProfile
    {
        public string Slug { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
        public string Experience { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public List<string> AreasOfCare { get; set; } = new();

        /// <summary>A related patient resource relevant to this doctor's specialty, if any.</summary>
        public string? ResourceLabel { get; set; }
        public string? ResourceTitle { get; set; }
        public string? ResourceUrl { get; set; }
    }
}
