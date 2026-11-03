using System.ComponentModel.DataAnnotations;

namespace vinayankhospitalkodinar.Models
{
    public class PregnancyLead
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Mobile number is required")]
        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "Enter a valid 10-digit mobile number")]
        public string Mobile { get; set; } = string.Empty;

        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string? Email { get; set; }

        [Required]
        public DateTime LastPeriodDate { get; set; }

        public int CycleLength { get; set; } = 28;

        public DateTime EstimatedDueDate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
