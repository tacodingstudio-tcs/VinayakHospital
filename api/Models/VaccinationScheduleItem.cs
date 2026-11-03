namespace vinayankhospitalkodinar.Models
{
    /// <summary>
    /// A single vaccination milestone in the schedule. This data is
    /// intentionally kept separate from the tracker UI so the hospital's
    /// pediatrician can review and update it without touching any code.
    ///
    /// IMPORTANT: Until <see cref="ReviewStatus"/> is "medically-reviewed",
    /// this data must never be presented to users as Vinayak Hospital's
    /// official vaccination schedule — only as general/sample guidance
    /// pending review.
    /// </summary>
    public class VaccinationScheduleItem
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string AgeGroup { get; set; } = string.Empty;
        public string TimingLabel { get; set; } = string.Empty;
        public int TimingInDays { get; set; }
        public string Description { get; set; } = string.Empty;

        public string ReviewStatus { get; set; } = "needs-medical-review";
        public string? ReviewedBy { get; set; }
        public string? ReviewedDate { get; set; }
    }
}
