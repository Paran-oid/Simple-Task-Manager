using Microsoft.EntityFrameworkCore;
using SimpleTaskManagerAPI.Models;

namespace SimpleTaskManagerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            AppDbContextConfig.Configure(builder);
            AppDbContextSeeder.Seed(builder);
        }
        public DbSet<AppTask> Tasks { get; set; }
    }
}
