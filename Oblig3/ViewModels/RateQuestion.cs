using System.ComponentModel.DataAnnotations;

namespace Oblig3.ViewModels
{
    /// <summary>
    /// Provides validation of the question's rate change.
    /// </summary>
    public class RateQuestion
    {
        [Required]
        [Range(-1,1)]
        public int Rate { get; set; }
    }
}
