namespace vinayankhospitalkodinar.Models
{
    /// <summary>
    /// Configuration for the medically-approved growth reference dataset
    /// (e.g. WHO Child Growth Standards) used to calculate percentiles and
    /// z-scores on the Baby Growth Tracker.
    ///
    /// IMPORTANT: Until <see cref="ReviewStatus"/> is "approved" and an
    /// actual reference dataset has been wired in, the tracker must NEVER
    /// display percentile/z-score values or reference growth curves. It
    /// must instead show a clear "pending review" message. This record
    /// exists so the hospital's pediatrician can review and approve a
    /// reference without any UI rebuild.
    /// </summary>
    public class GrowthReference
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Organization { get; set; }
        public string? Version { get; set; }

        public int SupportedAgeRangeMinDays { get; set; }
        public int SupportedAgeRangeMaxDays { get; set; }

        public List<string> SupportedMeasurements { get; set; } = new();

        public bool RequiresSex { get; set; }
        public bool SupportsPercentiles { get; set; }
        public bool SupportsZScores { get; set; }

        public string? ReviewedBy { get; set; }
        public string? ReviewedDate { get; set; }
        public string ReviewStatus { get; set; } = "pending";
    }
}
