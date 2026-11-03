namespace vinayankhospitalkodinar.Models
{
    /// <summary>
    /// A single Women's Health Library article. Content must come from a
    /// source the hospital's gynecologist has clinically reviewed and
    /// approved — never invented. Until <see cref="ReviewStatus"/> is
    /// "approved" and <see cref="ContentState"/> is "published", this
    /// entry must never be presented publicly as hospital-approved
    /// medical guidance.
    /// </summary>
    public class HealthArticle
    {
        public string Id { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Excerpt { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public List<string> Tags { get; set; } = new();

        public string? Source { get; set; }
        public string? SourceVersion { get; set; }
        public string? ReviewedBy { get; set; }
        public string? ReviewedDate { get; set; }
        public string ReviewStatus { get; set; } = "pending"; // pending | approved

        public string ContentState { get; set; } = "draft"; // draft | pending-review | published | archived
        public string? PublishedDate { get; set; }
    }

    /// <summary>
    /// A generic, non-diagnostic discussion-starter prompt a woman might
    /// bring to her gynecologist appointment. These are conversation
    /// topics, not medical facts or guidance, so they do not require
    /// clinical review in the way article content does.
    /// </summary>
    public class GynQuestion
    {
        public string Id { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
    }

    public class WomensHealthCategory
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public bool IsBridge { get; set; } // true only for the "Pregnancy" category, which links to existing resources
        public List<WomensHealthBridgeLink> BridgeLinks { get; set; } = new();
        public List<HealthArticle> Articles { get; set; } = new();
    }

    public class WomensHealthBridgeLink
    {
        public string Label { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }

    public class WomensHealthContent
    {
        public List<WomensHealthCategory> Categories { get; set; } = new();
        public List<GynQuestion> Questions { get; set; } = new();
    }
}
