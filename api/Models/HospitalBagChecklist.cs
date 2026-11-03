namespace vinayankhospitalkodinar.Models
{
    public class HospitalBagItem
    {
        public string Id { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string? HelperText { get; set; }
        public bool Optional { get; set; }
    }

    public class HospitalBagCategory
    {
        public string Key { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? Note { get; set; }
        public List<HospitalBagItem> Items { get; set; } = new();
    }
}
