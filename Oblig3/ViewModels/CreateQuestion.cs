using System.ComponentModel.DataAnnotations;

namespace Oblig3.ViewModels
{
    /// <summary>
    /// Provides validation of the question title ie. the question and
    /// its corresponding category id.
    /// </summary>
    public class CreateQuestion
    {
        [Required]
        [RegularExpression("^[0-9A-ZÆØÅa-zæøå ,.;'\"/?!-]{11,400}$")]
        public string Title { get; set; }

        [Required]
        [Range(1, 4)]
        public int CategoryId { get; set; }
    }
}