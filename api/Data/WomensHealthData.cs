using vinayankhospitalkodinar.Models;

namespace vinayankhospitalkodinar.Data
{
    /// <summary>
    /// Central configuration for the Women's Health Library.
    ///
    /// Every article below is DRAFT content — general educational text
    /// written for architecture/review purposes only, deliberately hedged
    /// and non-diagnostic (no dosages, thresholds, diagnostic criteria or
    /// treatment recommendations). ReviewStatus is "pending" and
    /// ContentState is "pending-review" until Dr Hetal Jadav reviews and
    /// approves it. The UI deliberately keeps this draft content visible
    /// (not hidden) with a clear "Draft — Pending Clinical Review" badge
    /// so the hospital team can review it in place.
    ///
    /// The Pregnancy category is a "bridge" category: rather than holding
    /// its own articles, it links out to the site's existing, already-built
    /// pregnancy resources.
    ///
    /// When the hospital's gynecologist approves an article: set its
    /// ReviewStatus = "approved", ContentState = "published", and fill in
    /// Source, SourceVersion, ReviewedBy and ReviewedDate. No UI changes
    /// should be required — the page already renders whatever is here.
    /// </summary>
    public static class WomensHealthData
    {
        private const string DraftSource = "Draft — pending clinical review by Dr Hetal Jadav";

        private static HealthArticle Draft(string id, string slug, string category, string title, string excerpt, string content, string[]? tags = null)
        {
            return new HealthArticle
            {
                Id = id,
                Slug = slug,
                Category = category,
                Title = title,
                Excerpt = excerpt,
                Content = content,
                Tags = tags?.ToList() ?? new List<string>(),
                Source = DraftSource,
                ReviewStatus = "pending",
                ContentState = "pending-review",
            };
        }

        public static WomensHealthContent GetContent()
        {
            var categories = new List<WomensHealthCategory>
            {
                new()
                {
                    Id = "periods", Title = "Period & Menstrual Health", Icon = "🩸",
                    Description = "Understanding your cycle, period hygiene and common questions.",
                    Articles = new List<HealthArticle>
                    {
                        Draft("a_periods_1", "understanding-your-menstrual-cycle", "periods",
                            "Understanding Your Menstrual Cycle",
                            "A general overview of the phases of the menstrual cycle and what's commonly considered typical.",
                            "<p>The menstrual cycle is generally described in a few broad phases, and cycle length and symptoms can vary quite a bit from person to person and month to month.</p>" +
                            "<p>Many people find it helpful to simply notice their own pattern over time — length, flow, and any symptoms — rather than compare themselves to a fixed 'normal'.</p>" +
                            "<p>If you notice a change that concerns you, your gynecologist can help you understand what's going on for you individually.</p>",
                            new[] { "cycle", "periods" }),
                        Draft("a_periods_2", "period-hygiene-basics", "periods",
                            "Period Hygiene Basics",
                            "General, everyday habits that many people find helpful during their period.",
                            "<p>Choosing a period product that feels comfortable for you — pads, tampons, menstrual cups or period underwear — is a personal decision, and many people use different products at different times.</p>" +
                            "<p>Regularly changing your chosen product and washing your hands before and after can be part of a simple hygiene routine.</p>" +
                            "<p>If you have questions about what might suit you, your gynecologist can talk through the options.</p>",
                            new[] { "hygiene", "periods" }),
                    }
                },
                new()
                {
                    Id = "reproductive", Title = "Reproductive Health", Icon = "🌸",
                    Description = "Reproductive wellbeing, preconception health and fertility awareness.",
                    Articles = new List<HealthArticle>
                    {
                        Draft("a_repro_1", "preparing-for-a-pregnancy", "reproductive",
                            "Preparing for a Pregnancy",
                            "A general introduction to thinking about preconception health.",
                            "<p>If you're thinking about pregnancy, many people find it helpful to have a preconception conversation with their gynecologist first.</p>" +
                            "<p>This kind of visit is generally an opportunity to discuss your health history, any current medications, and general wellbeing — every person's situation is different.</p>" +
                            "<p>Your gynecologist can guide you on what's relevant for you specifically.</p>",
                            new[] { "preconception", "fertility" }),
                        Draft("a_repro_2", "fertility-awareness-the-basics", "reproductive",
                            "Fertility Awareness: The Basics",
                            "A general, non-diagnostic introduction to fertility awareness concepts.",
                            "<p>Fertility awareness generally refers to understanding your own cycle and body — it is not a guarantee of any particular outcome, and experiences vary widely from person to person.</p>" +
                            "<p>If you have questions about your own fertility or are trying to conceive, a conversation with your gynecologist is the best next step.</p>",
                            new[] { "fertility" }),
                    }
                },
                new()
                {
                    Id = "pregnancy", Title = "Pregnancy", Icon = "🤰",
                    Description = "Explore our dedicated pregnancy resources.",
                    IsBridge = true,
                    BridgeLinks = new List<WomensHealthBridgeLink>
                    {
                        new() { Label = "Pregnancy Calculator", Url = "/resources/pregnancy-calculator" },
                        new() { Label = "Pregnancy Week-by-Week", Url = "/resources/pregnancy" },
                        new() { Label = "Hospital Bag Checklist", Url = "/resources/hospital-bag-checklist" },
                    },
                    Articles = new List<HealthArticle>()
                },
                new()
                {
                    Id = "postpartum", Title = "Postpartum Care", Icon = "🤱",
                    Description = "Recovery, emotional wellbeing and support after baby arrives.",
                    Articles = new List<HealthArticle>
                    {
                        Draft("a_postpartum_1", "what-to-expect-in-postpartum-recovery", "postpartum",
                            "What to Expect in Postpartum Recovery",
                            "A general overview of the postpartum recovery period.",
                            "<p>Recovery after birth generally takes time, and the experience can vary a lot between individuals and between pregnancies.</p>" +
                            "<p>Many people find it helpful to prioritize rest where possible and to keep their postpartum follow-up appointments, where your care team can check on your recovery.</p>" +
                            "<p>If anything feels concerning to you, reach out to your healthcare provider rather than waiting for your next scheduled visit.</p>",
                            new[] { "postpartum", "recovery" }),
                        Draft("a_postpartum_2", "emotional-wellbeing-after-birth", "postpartum",
                            "Emotional Wellbeing After Birth",
                            "A general, non-diagnostic look at emotional wellbeing in the postpartum period.",
                            "<p>It's common for new parents to experience a wide range of emotions after birth. Many people describe ups and downs as they adjust.</p>" +
                            "<p>This page is not a screening or diagnostic tool. If you're finding things difficult, or your mood doesn't feel right to you, please talk with your healthcare provider — support is available.</p>",
                            new[] { "postpartum", "emotional-wellbeing" }),
                    }
                },
                new()
                {
                    Id = "wellness", Title = "Women's Wellness", Icon = "🌿",
                    Description = "Everyday health, nutrition, activity and preventive care.",
                    Articles = new List<HealthArticle>
                    {
                        Draft("a_wellness_1", "everyday-habits-for-womens-health", "wellness",
                            "Everyday Habits for Women's Health",
                            "A general look at everyday habits — nutrition, activity and sleep.",
                            "<p>Everyday habits like regular physical activity, balanced nutrition, and adequate sleep are broadly recognized as supportive of general wellbeing.</p>" +
                            "<p>What works well can look different for each person and each life stage. Your gynecologist or general physician can help you think through what's realistic and relevant for you.</p>",
                            new[] { "wellness", "nutrition" }),
                        Draft("a_wellness_2", "preventive-care-why-checkups-matter", "wellness",
                            "Preventive Care: Why Regular Check-ups Matter",
                            "A general introduction to the idea of preventive women's health visits.",
                            "<p>Regular check-ups are generally considered a useful way to stay in touch with your health over time, even when nothing feels wrong.</p>" +
                            "<p>Your gynecologist can advise on a check-up routine that's appropriate for your age and individual health history.</p>",
                            new[] { "preventive-care" }),
                    }
                },
                new()
                {
                    Id = "menopause", Title = "Menopause & Midlife", Icon = "🌙",
                    Description = "Understanding changes and questions to ask during midlife.",
                    Articles = new List<HealthArticle>
                    {
                        Draft("a_menopause_1", "understanding-menopause", "menopause",
                            "Understanding Menopause",
                            "A general, non-diagnostic overview of what menopause is.",
                            "<p>Menopause generally refers to a natural stage in a woman's life when periods stop. The timing and experience of this transition can vary widely from person to person.</p>" +
                            "<p>Many people notice a range of changes during this time. This page does not recommend any particular treatment — your gynecologist can discuss options suited to you individually.</p>",
                            new[] { "menopause" }),
                        Draft("a_menopause_2", "questions-to-ask-about-menopause", "menopause",
                            "Questions to Ask Your Gynecologist About Menopause",
                            "A practical, general list of topics some people choose to discuss.",
                            "<p>Some people find it helpful to prepare a few questions before a visit about midlife changes — for example, what changes are common, and what support is available.</p>" +
                            "<p>Your gynecologist can talk through what's relevant to your own experience.</p>",
                            new[] { "menopause" }),
                    }
                },
            };

            var questions = new List<GynQuestion>
            {
                new() { Id = "q_periods_1", Category = "periods", Text = "What changes in my cycle should I mention at my next visit?" },
                new() { Id = "q_periods_2", Category = "periods", Text = "What questions do I have about my period that I'd like explained?" },
                new() { Id = "q_reproductive_1", Category = "reproductive", Text = "What would I like to understand better about my reproductive health?" },
                new() { Id = "q_reproductive_2", Category = "reproductive", Text = "What questions do I have before trying to conceive?" },
                new() { Id = "q_pregnancy_1", Category = "pregnancy", Text = "What should I prepare before my next prenatal visit?" },
                new() { Id = "q_pregnancy_2", Category = "pregnancy", Text = "What questions do I have about my pregnancy care?" },
                new() { Id = "q_postpartum_1", Category = "postpartum", Text = "What recovery questions do I want to ask at my postpartum visit?" },
                new() { Id = "q_postpartum_2", Category = "postpartum", Text = "What would I like to discuss about my emotional wellbeing after birth?" },
                new() { Id = "q_menopause_1", Category = "menopause", Text = "What changes have I noticed that I'd like to discuss?" },
                new() { Id = "q_menopause_2", Category = "menopause", Text = "What questions do I have about managing midlife changes?" },
                new() { Id = "q_general_1", Category = "general", Text = "What general health questions do I have for my gynecologist?" },
                new() { Id = "q_general_2", Category = "general", Text = "Is there anything about my health history I should mention?" },
            };

            return new WomensHealthContent { Categories = categories, Questions = questions };
        }

        public static HealthArticle? GetArticleBySlug(string slug)
        {
            // Pending-review drafts are viewable (so the hospital team can review them
            // in place) but are never labelled "Clinically Reviewed" — only
            // ContentState == "published" && ReviewStatus == "approved" articles get
            // that badge. Draft/archived content is never exposed here.
            foreach (var category in GetContent().Categories)
            {
                var match = category.Articles.FirstOrDefault(a =>
                    a.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase) &&
                    (a.ContentState == "published" || a.ContentState == "pending-review"));
                if (match != null) return match;
            }
            return null;
        }
    }
}
