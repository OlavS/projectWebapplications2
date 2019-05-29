using Microsoft.EntityFrameworkCore;
using Oblig3.Models;

namespace Oblig3.Context
{
    public class CustomerServiceContext : DbContext
    {
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Question> Questions { get; set; }

        public CustomerServiceContext(DbContextOptions<CustomerServiceContext> options) : base(options)
        { }
    }
}