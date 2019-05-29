using System.ComponentModel.DataAnnotations;

namespace Oblig3.Models
{
    /// <summary>
    /// The databases Question model.
    /// </summary>
    public class Question
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Answer { get; set; }

        public int Rating { get; set; } = 0;

        public virtual Category Category { get; set; }
    }
}