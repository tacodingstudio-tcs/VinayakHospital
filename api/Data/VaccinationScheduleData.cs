using vinayankhospitalkodinar.Models;

namespace vinayankhospitalkodinar.Data
{
    /// <summary>
    /// DRAFT / SAMPLE vaccination schedule data. This has NOT been reviewed
    /// or approved by Vinayak Children &amp; Maternity Hospital's pediatrician.
    ///
    /// Every entry is flagged ReviewStatus = "needs-medical-review" and the
    /// tracker UI must always present this clearly as general/sample
    /// guidance — never as "the official Vinayak vaccination schedule" —
    /// until a pediatrician has reviewed and approved it (at which point
    /// ReviewedBy / ReviewedDate should be filled in and ReviewStatus
    /// updated to "medically-reviewed").
    ///
    /// Vaccine names below use common, globally-recognized vaccine
    /// categories for architecture/demo purposes only. Exact timing,
    /// dosing and applicability vary by country, program and the child's
    /// individual circumstances, and must be confirmed with a pediatrician.
    /// </summary>
    public static class VaccinationScheduleData
    {
        public static List<VaccinationScheduleItem> GetSchedule()
        {
            return new List<VaccinationScheduleItem>
            {
                new()
                {
                    Id = "v1", Name = "Hepatitis B (Birth Dose)", AgeGroup = "Birth",
                    TimingLabel = "At birth", TimingInDays = 0,
                    Description = "Often given soon after birth as part of a routine immunization program. Your pediatrician will confirm what applies to your child.",
                },
                new()
                {
                    Id = "v2", Name = "BCG", AgeGroup = "Birth",
                    TimingLabel = "At birth", TimingInDays = 0,
                    Description = "A routine early vaccination in many immunization programs. Ask your pediatrician for details specific to your child.",
                },
                new()
                {
                    Id = "v3", Name = "DTP / Pentavalent (Dose 1)", AgeGroup = "Early Infancy",
                    TimingLabel = "Around 6 weeks", TimingInDays = 42,
                    Description = "The first in a series of early-infancy doses. Timing and combination vaccines used can vary — confirm with your pediatrician.",
                },
                new()
                {
                    Id = "v4", Name = "Oral Polio Vaccine (Dose 1)", AgeGroup = "Early Infancy",
                    TimingLabel = "Around 6 weeks", TimingInDays = 42,
                    Description = "Commonly given alongside other early-infancy vaccinations. Your pediatrician can confirm the applicable schedule.",
                },
                new()
                {
                    Id = "v5", Name = "DTP / Pentavalent (Dose 2)", AgeGroup = "Early Infancy",
                    TimingLabel = "Around 10 weeks", TimingInDays = 70,
                    Description = "The second dose in the early-infancy series. Spacing between doses may vary by program.",
                },
                new()
                {
                    Id = "v6", Name = "DTP / Pentavalent (Dose 3)", AgeGroup = "Early Infancy",
                    TimingLabel = "Around 14 weeks", TimingInDays = 98,
                    Description = "The third dose in the early-infancy series, typically completing this initial set.",
                },
                new()
                {
                    Id = "v7", Name = "Measles-Rubella (Dose 1)", AgeGroup = "Infancy",
                    TimingLabel = "Around 9 months", TimingInDays = 270,
                    Description = "Usually introduced in the second half of the first year. Your pediatrician will advise on exact timing.",
                },
                new()
                {
                    Id = "v8", Name = "Vitamin A (Dose 1)", AgeGroup = "Infancy",
                    TimingLabel = "Around 9 months", TimingInDays = 270,
                    Description = "A supplement sometimes given alongside routine immunizations in some programs.",
                },
                new()
                {
                    Id = "v9", Name = "DTP Booster (Dose 1)", AgeGroup = "Toddler",
                    TimingLabel = "Around 18 months", TimingInDays = 548,
                    Description = "A booster dose commonly scheduled in the toddler years to maintain protection.",
                },
                new()
                {
                    Id = "v10", Name = "Measles-Rubella (Dose 2)", AgeGroup = "Toddler",
                    TimingLabel = "Around 18 months", TimingInDays = 548,
                    Description = "A second dose often given in the toddler years, timing varies by program.",
                },
                new()
                {
                    Id = "v11", Name = "Typhoid Conjugate Vaccine", AgeGroup = "Childhood",
                    TimingLabel = "Around 2 years", TimingInDays = 730,
                    Description = "Recommended in some programs during early childhood. Confirm applicability with your pediatrician.",
                },
                new()
                {
                    Id = "v12", Name = "DTP Booster (Dose 2)", AgeGroup = "Childhood",
                    TimingLabel = "Around 5 years", TimingInDays = 1825,
                    Description = "A later booster commonly scheduled before school age in some programs.",
                },
            };
        }
    }
}
