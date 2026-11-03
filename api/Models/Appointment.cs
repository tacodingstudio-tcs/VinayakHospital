using System.ComponentModel.DataAnnotations;

namespace vinayankhospitalkodinar.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public string ?FullName { get; set; }

        [Required(ErrorMessage = "Mobile number is required")]
        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "Enter a valid 10-digit mobile number")]
        public string ?MobileNumber { get; set; }

        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string ?Email { get; set; }

        [Required]
        public string ?DoctorName { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        public string? Message { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}







