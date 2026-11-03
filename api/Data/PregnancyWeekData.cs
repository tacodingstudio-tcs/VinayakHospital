using vinayankhospitalkodinar.Models;

namespace vinayankhospitalkodinar.Data
{
    /// <summary>
    /// Provides the 40-week structured content set for the Pregnancy
    /// Week-by-Week resource. Content is intentionally general and
    /// non-diagnostic (no fabricated measurements, test schedules or
    /// individualized medical claims) and is flagged internally as
    /// ReviewStatus = "needs-medical-review" until the hospital's
    /// gynaecology team has reviewed and approved it. That flag is never
    /// shown to site visitors.
    /// </summary>
    public static class PregnancyWeekData
    {
        // Widely used, approximate "baby size" comparisons for fun/engagement
        // only (index 0 = week 1). Not a clinical measurement.
        private static readonly (string Comparison, string Emoji)[] SizeComparisons = new (string, string)[]
        {
            ("a poppy seed", "🌱"),        // week 1
            ("a poppy seed", "🌱"),        // 2
            ("a poppy seed", "🌱"),        // 3
            ("a poppy seed", "🌱"),        // 4
            ("a sesame seed", "🌾"),       // 5
            ("a lentil", "🫘"),            // 6
            ("a blueberry", "🫐"),         // 7
            ("a raspberry", "🍇"),         // 8
            ("a grape", "🍇"),             // 9
            ("a kumquat", "🍊"),           // 10
            ("a fig", "🫒"),               // 11
            ("a lime", "🍈"),              // 12
            ("a pea pod", "🫛"),           // 13
            ("a lemon", "🍋"),             // 14
            ("an apple", "🍎"),            // 15
            ("an avocado", "🥑"),          // 16
            ("a pear", "🍐"),              // 17
            ("a bell pepper", "🫑"),       // 18
            ("a tomato", "🍅"),            // 19
            ("a banana", "🍌"),            // 20
            ("a carrot", "🥕"),            // 21
            ("a spaghetti squash", "🎃"),  // 22
            ("a large mango", "🥭"),       // 23
            ("an ear of corn", "🌽"),      // 24
            ("a rutabaga", "🥔"),          // 25
            ("a bunch of scallions", "🧅"),// 26
            ("a cauliflower", "🥦"),       // 27
            ("an eggplant", "🍆"),         // 28
            ("a butternut squash", "🎃"),  // 29
            ("a cabbage", "🥬"),           // 30
            ("a coconut", "🥥"),           // 31
            ("a jicama", "🥔"),            // 32
            ("a pineapple", "🍍"),         // 33
            ("a cantaloupe", "🍈"),        // 34
            ("a honeydew melon", "🍈"),    // 35
            ("a head of romaine lettuce", "🥬"), // 36
            ("a bunch of leeks", "🥬"),    // 37
            ("a mini watermelon", "🍉"),   // 38
            ("a mini watermelon", "🍉"),   // 39
            ("a small pumpkin", "🎃"),     // 40
        };

        private static readonly string[] EmotionalLines = new[]
        {
            "Somewhere in you, a heartbeat is learning to keep time with yours.",
            "Every week brings you a little closer to meeting your baby.",
            "You are already someone's whole world — and they haven't even met you yet.",
            "Your journey continues — one week closer to holding them.",
            "A gentle reminder: you're doing beautifully, one week at a time.",
            "This tiny life is growing because of the quiet, steady love you're giving it.",
            "Some of the most important work in the world is happening right where you are.",
            "One more week of your body doing something truly extraordinary.",
            "Hold on to this moment — it's one you'll remember forever.",
            "You don't have to have it all figured out. You just have to keep going, and you are."
        };

        public static List<PregnancyWeekContent> GetAll()
        {
            var list = new List<PregnancyWeekContent>();
            for (int week = 1; week <= 40; week++)
            {
                list.Add(Build(week));
            }
            return list;
        }

        public static PregnancyWeekContent? Get(int week)
        {
            if (week < 1 || week > 40) return null;
            return Build(week);
        }

        private static PregnancyWeekContent Build(int week)
        {
            string trimester;
            string range;
            string babyDevelopment;
            string maternalChanges;
            List<string> wellbeing;
            List<string> care;
            string imagePath;
            string imageAlt;

            if (week <= 13)
            {
                trimester = "First Trimester";
                range = "Weeks 1–13";
                imagePath = "/images/pregnancy-journey.jpg";
                imageAlt = "Illustration representing early pregnancy care at Vinayak Hospital";
                babyDevelopment = "Right now, in the quiet of these earliest weeks, so much is already happening — the very beginnings of a whole new person are taking shape. It's one of the most remarkable stages of this journey, and your doctor can share more detail specific to your pregnancy at your prenatal visits.";
                maternalChanges = "You might be feeling more tired than usual, or a little unsettled in your stomach — and that's okay. Your body is quietly doing extraordinary work. Be gentle with yourself; every pregnancy has its own rhythm, and however you're feeling is valid.";
                wellbeing = new List<string>
                {
                    "Energy: some people feel more tired than usual during this stage.",
                    "Nutrition: your doctor may discuss prenatal vitamins and general nutrition.",
                    "Emotional wellbeing: it's common to feel a mix of emotions early in pregnancy."
                };
                care = new List<string>
                {
                    "The World Health Organization recommends a first antenatal care contact by around 12 weeks.",
                    "This is a good time to confirm your pregnancy with your doctor, if you haven't already.",
                    "Your healthcare provider may discuss general health and any early questions you have."
                };
            }
            else if (week <= 27)
            {
                trimester = "Second Trimester";
                range = "Weeks 14–27";
                imagePath = "/images/womens-health-journey.jpg";
                imageAlt = "A woman consulting with her gynecologist at Vinayak Hospital";
                babyDevelopment = "This is often called the 'golden window' of pregnancy — and for good reason. Your baby is growing steadily, and you may soon feel those first, unmistakable flutters of movement: a little hello from the inside. Your doctor can walk you through what's relevant to your baby's growth at your check-ups.";
                maternalChanges = "Many people find this stage a little easier, with more energy to actually enjoy the journey. Take a moment to notice it — the small kicks, the changing shape, the quiet conversations with a baby you haven't met yet but already love.";
                wellbeing = new List<string>
                {
                    "Energy: many people notice improved energy during this stage, though this varies.",
                    "Physical changes: your body continues to change to support your pregnancy.",
                    "Movement: some people begin to feel movement around this stage."
                };
                care = new List<string>
                {
                    "The WHO antenatal care model schedules contacts around weeks 20 and 26 of this trimester.",
                    "Routine scans, if recommended, are often scheduled during this stage.",
                    "Your healthcare provider may discuss any screening tests relevant to you."
                };
            }
            else
            {
                trimester = "Third Trimester";
                range = "Weeks 28–40";
                imagePath = "/images/birth-journey.jpg";
                imageAlt = "A newborn with parents and nurse at Vinayak Hospital";
                babyDevelopment = "You're in the home stretch now. Your baby is getting ready for the world outside, and every day that passes is one day closer to the moment you finally hold them. Your doctor can share what's most relevant to your baby's progress at this stage.";
                maternalChanges = "It's natural to feel a mix of excitement, impatience and maybe a little nervousness as your due date nears — that's a sign you care, not a sign something's wrong. Check-ups typically become more frequent now, so lean on your care team and let them carry some of the worry with you.";
                wellbeing = new List<string>
                {
                    "Comfort: some people experience more physical discomfort as their due date approaches.",
                    "Rest: many people find it helpful to prioritize rest during this stage.",
                    "Preparation: this can be a good time to prepare practically for your baby's arrival."
                };
                care = new List<string>
                {
                    "The WHO antenatal care model schedules more frequent contacts during this trimester (around weeks 30, 34, 36, 38 and 40).",
                    "This is a good time to discuss your birth plan and delivery preferences with your doctor.",
                    "Your healthcare provider will guide any additional monitoring relevant to your pregnancy."
                };
            }

            var questions = new List<string>
            {
                "Is my pregnancy progressing as expected?",
                "Are there any appointments or assessments I should prepare for?",
                "Are there any lifestyle or nutrition questions I should discuss?",
                "What symptoms should I contact the hospital about?",
                "When should I schedule my next visit?"
            };

            var checklist = new List<string>
            {
                "Keep track of questions for your next appointment",
                "Follow your healthcare provider's recommendations",
                "Take time for rest and wellbeing",
                "Keep your pregnancy records organized",
                "Plan your next appointment if needed"
            };

            var size = SizeComparisons[week - 1];

            return new PregnancyWeekContent
            {
                Week = week,
                Trimester = trimester,
                TrimesterRange = range,
                EmotionalLine = EmotionalLines[week % EmotionalLines.Length],
                SizeComparison = size.Comparison,
                SizeEmoji = size.Emoji,
                BabyDevelopment = babyDevelopment,
                MaternalChanges = maternalChanges,
                WellbeingTopics = wellbeing,
                CareTopics = care,
                QuestionsForDoctor = questions,
                Checklist = checklist,
                ImagePath = imagePath,
                ImageAlt = imageAlt,
                ReviewStatus = "needs-medical-review"
            };
        }
    }
}
