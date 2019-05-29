using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Oblig3.Models
{
    /// <summary>
    /// The databases Category model.
    /// </summary>
    public class Category
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual IEnumerable<Question> Questions { get; set; }
    }
}