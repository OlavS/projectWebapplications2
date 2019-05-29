using System.ComponentModel.DataAnnotations;

namespace Oblig3.ViewModels
{
    /// <summary>
    /// Provides validation of the answer.
    /// </summary>
    public class AnswerQuestion
    {
        [Required]
        [RegularExpression("^[0-9A-ZÆØÅa-zæøå ,.;'\"/?!-]{11,1000}$")]
        public string Answer { get; set; }
    }
}
