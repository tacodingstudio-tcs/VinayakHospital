using vinayankhospitalkodinar.Models;

namespace vinayankhospitalkodinar.Data
{
    /// <summary>
    /// Central configuration point for the Baby Growth Tracker's medical
    /// reference dataset. No approved reference (e.g. WHO Child Growth
    /// Standards) has been wired into this project yet, so ReviewStatus
    /// is "pending" and SupportsPercentiles / SupportsZScores are false.
    ///
    /// The tracker UI reads these flags to decide whether it may ever show
    /// a percentile, z-score or reference growth curve. Measurement
    /// recording and the parent's own raw-data trend view work regardless,
    /// since neither requires or implies any medical reference.
    ///
    /// When the hospital approves a reference dataset: update this record
    /// (Name, Organization, Version, age range, ReviewedBy, ReviewedDate,
    /// ReviewStatus = "approved", and the Supports* flags once the actual
    /// percentile/z-score calculation logic has been implemented against
    /// that dataset) — no UI changes should be required.
    /// </summary>
    public static class GrowthReferenceData
    {
        public static GrowthReference GetReference()
        {
            return new GrowthReference
            {
                Id = "growth-ref-draft",
                Name = "Growth chart reference pending selection",
                Organization = null,
                Version = null,
                SupportedAgeRangeMinDays = 0,
                SupportedAgeRangeMaxDays = 1826, // 0–5 years, pending confirmation
                SupportedMeasurements = new List<string> { "weight", "height", "headCircumference" },
                RequiresSex = false,
                SupportsPercentiles = false,
                SupportsZScores = false,
                ReviewedBy = null,
                ReviewedDate = null,
                ReviewStatus = "pending",
            };
        }
    }
}
