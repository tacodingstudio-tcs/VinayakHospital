namespace vinayankhospitalkodinar.Models
{
    /// <summary>
    /// A single developmental milestone. Content must come from a source
    /// the hospital's pediatrician has reviewed and approved — never
    /// invented. Until <see cref="ReviewStatus"/> is "approved", this
    /// entry must not be presented as confirmed medical guidance.
    /// </summary>
    public class Milestone
    {
        public string Id { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // movement | communication | social | learning | selfHelp
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }

        public string? Source { get; set; }
        public string? SourceVersion { get; set; }

        public string ReviewStatus { get; set; } = "pending";
        public string? ReviewedBy { get; set; }
        public string? ReviewedDate { get; set; }
    }

    /// <summary>
    /// An age-based grouping used to organize milestone content. The age
    /// boundaries themselves are an organizational scaffold, not a
    /// clinical claim — but the milestones inside each group must still
    /// come from an approved source before being treated as guidance.
    /// </summary>
    public class MilestoneGroup
    {
        public string Id { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public int MinAgeMonths { get; set; }
        public int MaxAgeMonths { get; set; }
        public List<Milestone> Milestones { get; set; } = new();
    }

    /// <summary>
    /// Wraps the milestone groups together with the overall content
    /// governance status, so the UI can clearly show a "pending review"
    /// placeholder instead of fabricating developmental guidance when no
    /// approved source has been wired in yet.
    /// </summary>
    public class MilestoneContent
    {
        public string MilestoneContentStatus { get; set; } = "pending-review"; // pending-review | approved
        public string? Source { get; set; }
        public string? SourceVersion { get; set; }
        public List<MilestoneGroup> Groups { get; set; } = new();
    }
}
