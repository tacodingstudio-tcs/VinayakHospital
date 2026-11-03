using vinayankhospitalkodinar.Models;

namespace vinayankhospitalkodinar.Data
{
    /// <summary>
    /// Central configuration for the Baby Milestones resource.
    ///
    /// Every milestone below is DRAFT content — compiled from general,
    /// widely-published developmental milestone references for
    /// architecture/review purposes only. ReviewStatus is "pending" and
    /// MilestoneContentStatus is "pending-review" until Dr Pradhyuman
    /// Jadav reviews and approves it. The UI deliberately keeps this
    /// draft content visible (not hidden) with a clear "Draft — pending
    /// medical review" badge so the hospital team can review it in place.
    ///
    /// The age groupings below are an organizational scaffold only (not a
    /// clinical claim). When the pediatrician approves this content:
    /// update each Milestone's ReviewStatus to "approved" (and set
    /// ReviewedBy / ReviewedDate), then set MilestoneContentStatus =
    /// "approved" below. No UI changes should be required.
    /// </summary>
    public static class MilestoneData
    {
        private const string DraftSource = "Draft — compiled from general developmental milestone references; pending pediatrician review";

        public static MilestoneContent GetContent()
        {
            var groupDefs = new (string Id, string Label, int Min, int Max, string[] Movement, string[] Communication, string[] Social, string[] Learning)[]
            {
                ("0-3", "0–3 Months", 0, 3,
                    new[] { "Begins to hold their head up for short periods during tummy time.", "Moves arms and legs more smoothly." },
                    new[] { "Makes cooing sounds.", "Turns toward familiar voices." },
                    new[] { "Begins to smile at people.", "Calms when spoken to or picked up." },
                    new[] { "Watches faces with interest.", "Follows moving objects with their eyes." }),
                ("4-6", "4–6 Months", 4, 6,
                    new[] { "Rolls over in one direction.", "Pushes up onto their hands during tummy time." },
                    new[] { "Begins to babble with different sounds.", "Responds to their own name." },
                    new[] { "Laughs and enjoys playful interaction.", "Enjoys looking at themselves in a mirror." },
                    new[] { "Reaches for and grasps objects.", "Explores objects by putting them in their mouth." }),
                ("7-9", "7–9 Months", 7, 9,
                    new[] { "Sits without support.", "May begin to crawl or scoot." },
                    new[] { "Babbles with strings of sounds like 'bababa'.", "Responds to simple words like 'no'." },
                    new[] { "Shows interest in familiar people and may be cautious with strangers.", "Enjoys simple games like peekaboo." },
                    new[] { "Looks for objects that are hidden.", "Passes objects from one hand to the other." }),
                ("10-12", "10–12 Months", 10, 12,
                    new[] { "Pulls up to stand holding onto furniture.", "May take a few steps while holding on, or begin to walk." },
                    new[] { "May say simple words like 'mama' or 'dada'.", "Responds to simple requests." },
                    new[] { "Shows a preference for certain people and toys.", "Copies gestures such as waving bye-bye." },
                    new[] { "Explores objects by shaking, banging and dropping them.", "Looks at the correct picture or object when it is named." }),
                ("12-18", "12–18 Months", 12, 18,
                    new[] { "Walks independently.", "Begins to climb onto furniture." },
                    new[] { "Uses a small number of words and gestures to communicate.", "Points to show interest in something." },
                    new[] { "Shows affection to familiar people.", "May have brief tantrums." },
                    new[] { "Points to a few body parts when asked.", "Begins to use simple objects as intended, like drinking from a cup." }),
                ("18-24", "18–24 Months", 18, 24,
                    new[] { "Runs and begins to climb more confidently.", "Kicks a ball." },
                    new[] { "Combines two words together.", "Follows simple two-step instructions." },
                    new[] { "Plays alongside other children.", "Shows a range of emotions." },
                    new[] { "Points to pictures when they are named in a book.", "Begins simple pretend play." }),
                ("2-3y", "2–3 Years", 24, 36,
                    new[] { "Climbs well and may begin to run more steadily.", "Walks up and down stairs with support." },
                    new[] { "Speaks in short sentences.", "Is understood by familiar people most of the time." },
                    new[] { "Shows interest in other children and may begin to take turns.", "Expresses a wider range of emotions." },
                    new[] { "Sorts objects by shape and colour.", "Follows two- or three-step instructions." }),
                ("3-4y", "3–4 Years", 36, 48,
                    new[] { "Climbs and runs with more coordination.", "Pedals a tricycle." },
                    new[] { "Talks in longer sentences and asks questions.", "Can usually be understood by people outside the family." },
                    new[] { "Engages in cooperative play with other children.", "Shows a wider understanding of feelings — their own and others'." },
                    new[] { "Names some colours and numbers.", "Enjoys imaginative and pretend play." }),
                ("4-5y", "4–5 Years", 48, 60,
                    new[] { "Hops and may stand on one foot briefly.", "Uses stairs confidently, alternating feet." },
                    new[] { "Tells simple stories and uses more complex sentences.", "Can usually be understood by most people." },
                    new[] { "Enjoys playing with other children and may prefer certain playmates.", "Follows simple rules in games." },
                    new[] { "Counts a number of objects.", "Recognizes some letters and may begin to write their name." }),
            };

            var groups = groupDefs.Select(g =>
            {
                var milestones = new List<Milestone>();
                void AddAll(string category, string[] titles)
                {
                    for (int i = 0; i < titles.Length; i++)
                    {
                        milestones.Add(new Milestone
                        {
                            Id = $"{g.Id}_{category}_{i + 1}",
                            Category = category,
                            Title = titles[i],
                            Source = DraftSource,
                            ReviewStatus = "pending",
                        });
                    }
                }
                AddAll("movement", g.Movement);
                AddAll("communication", g.Communication);
                AddAll("social", g.Social);
                AddAll("learning", g.Learning);

                return new MilestoneGroup
                {
                    Id = g.Id,
                    Label = g.Label,
                    MinAgeMonths = g.Min,
                    MaxAgeMonths = g.Max,
                    Milestones = milestones
                };
            }).ToList();

            return new MilestoneContent
            {
                MilestoneContentStatus = "pending-review",
                Source = DraftSource,
                SourceVersion = null,
                Groups = groups
            };
        }
    }
}
