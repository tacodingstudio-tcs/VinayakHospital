using vinayankhospitalkodinar.Models;

namespace vinayankhospitalkodinar.Data
{
    /// <summary>
    /// Static, general-purpose hospital bag checklist content. Intentionally
    /// generic ("consider bringing") rather than prescriptive — hospital-specific
    /// policies are never fabricated here; those are flagged for the mother to
    /// confirm directly with Vinayak Children &amp; Maternity Hospital.
    /// </summary>
    public static class HospitalBagData
    {
        public static List<HospitalBagCategory> GetCategories()
        {
            return new List<HospitalBagCategory>
            {
                new HospitalBagCategory
                {
                    Key = "mom",
                    Title = "For Mom",
                    Items = new List<HospitalBagItem>
                    {
                        new() { Id = "mom_1", Label = "Comfortable nightwear" },
                        new() { Id = "mom_2", Label = "Nursing-friendly clothing" },
                        new() { Id = "mom_3", Label = "Comfortable underwear" },
                        new() { Id = "mom_4", Label = "Maternity pads" },
                        new() { Id = "mom_5", Label = "Slippers" },
                        new() { Id = "mom_6", Label = "Toiletries" },
                        new() { Id = "mom_7", Label = "Toothbrush and toothpaste" },
                        new() { Id = "mom_8", Label = "Hair ties" },
                        new() { Id = "mom_9", Label = "Comfortable shawl or light layer" },
                        new() { Id = "mom_10", Label = "Water bottle" },
                        new() { Id = "mom_11", Label = "Phone charger" },
                        new() { Id = "mom_12", Label = "Any regularly used personal items", HelperText = "Consider bringing items you use daily and wouldn't want to be without." },
                    }
                },
                new HospitalBagCategory
                {
                    Key = "baby",
                    Title = "For Baby",
                    Note = "Check with the hospital about which baby-care items are provided during your stay.",
                    Items = new List<HospitalBagItem>
                    {
                        new() { Id = "baby_1", Label = "Newborn clothes" },
                        new() { Id = "baby_2", Label = "Soft cotton clothing" },
                        new() { Id = "baby_3", Label = "Diapers" },
                        new() { Id = "baby_4", Label = "Soft wipes or cotton" },
                        new() { Id = "baby_5", Label = "Baby blanket" },
                        new() { Id = "baby_6", Label = "Swaddle" },
                        new() { Id = "baby_7", Label = "Baby cap" },
                        new() { Id = "baby_8", Label = "Baby socks" },
                        new() { Id = "baby_9", Label = "Burp cloths" },
                        new() { Id = "baby_10", Label = "Small towel" },
                    }
                },
                new HospitalBagCategory
                {
                    Key = "documents",
                    Title = "Documents & Essentials",
                    Note = "Keep important documents together in an easily accessible folder.",
                    Items = new List<HospitalBagItem>
                    {
                        new() { Id = "doc_1", Label = "ID / identification documents" },
                        new() { Id = "doc_2", Label = "Pregnancy records" },
                        new() { Id = "doc_3", Label = "Previous medical reports" },
                        new() { Id = "doc_4", Label = "Prescriptions / medication information" },
                        new() { Id = "doc_5", Label = "Insurance documents, if applicable" },
                        new() { Id = "doc_6", Label = "Hospital appointment details" },
                        new() { Id = "doc_7", Label = "Emergency contact information" },
                        new() { Id = "doc_8", Label = "Payment / UPI / card backup" },
                    }
                },
                new HospitalBagCategory
                {
                    Key = "companion",
                    Title = "For Your Companion",
                    Items = new List<HospitalBagItem>
                    {
                        new() { Id = "comp_1", Label = "Phone charger" },
                        new() { Id = "comp_2", Label = "Comfortable clothes" },
                        new() { Id = "comp_3", Label = "Water bottle" },
                        new() { Id = "comp_4", Label = "Snacks" },
                        new() { Id = "comp_5", Label = "Personal toiletries" },
                        new() { Id = "comp_6", Label = "Important contact numbers" },
                        new() { Id = "comp_7", Label = "Payment method" },
                        new() { Id = "comp_8", Label = "Any required identification" },
                    }
                },
                new HospitalBagCategory
                {
                    Key = "optional",
                    Title = "Optional Comfort Items",
                    Items = new List<HospitalBagItem>
                    {
                        new() { Id = "opt_1", Label = "Small pillow", Optional = true },
                        new() { Id = "opt_2", Label = "Light shawl", Optional = true },
                        new() { Id = "opt_3", Label = "Earphones", Optional = true },
                        new() { Id = "opt_4", Label = "Book / reading material", Optional = true },
                        new() { Id = "opt_5", Label = "Extra phone charger", Optional = true },
                        new() { Id = "opt_6", Label = "Small reusable bag for laundry", Optional = true },
                        new() { Id = "opt_7", Label = "Eye mask", Optional = true },
                    }
                },
            };
        }
    }
}
