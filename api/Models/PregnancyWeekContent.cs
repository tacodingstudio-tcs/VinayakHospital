namespace vinayankhospitalkodinar.Models
{
    /// <summary>
    /// Structured, data-driven content for a single week of the Pregnancy
    /// Week-by-Week resource. Kept separate from the view templates so the
    /// hospital's medical team can review and update copy without touching
    /// any UI code.
    /// </summary>
    public class PregnancyWeekContent
    {
        public int Week { get; set; }
        public string Trimester { get; set; } = string.Empty;
        public string TrimesterRange { get; set; } = string.Empty;
        public string EmotionalLine { get; set; } = string.Empty;
        public string ImagePath { get; set; } = string.Empty;
        public string ImageAlt { get; set; } = string.Empty;

        /// <summary>
        /// Fun, non-medical "baby is about the size of a lemon" comparison
        /// widely used across pregnancy resources. Approximate and for
        /// engagement only — never a clinical measurement.
        /// </summary>
        public string SizeComparison { get; set; } = string.Empty;
        public string SizeEmoji { get; set; } = string.Empty;

        public string BabyDevelopment { get; set; } = string.Empty;
        public string MaternalChanges { get; set; } = string.Empty;

        public List<string> WellbeingTopics { get; set; } = new();
        public List<string> CareTopics { get; set; } = new();
        public List<string> QuestionsForDoctor { get; set; } = new();
        public List<string> Checklist { get; set; } = new();

        /// <summary>
        /// Internal-only workflow flag. Never rendered to site visitors —
        /// used so the hospital's clinical team can track which weeks still
        /// need a qualified gynaecologist's review before the copy is
        /// treated as clinically finalized.
        /// </summary>
        public string ReviewStatus { get; set; } = "needs-medical-review";
    }
}
