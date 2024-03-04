using BeautyQueenApi.Constants;
using BeautyQueenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

namespace BeautyQueenApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { 
            // try
            // {
            //     var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;

            //     if(databaseCreator != null)
            //     {
            //         if (!databaseCreator.CanConnect()) databaseCreator.Create();
            //         if (!databaseCreator.HasTables()) databaseCreator.CreateTables();
            //     }
            // } catch(Exception e)
            // {
            //     Console.WriteLine(e.Message);
            // }
            // Database.EnsureCreated();
        }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<Specialization> Specialization { get; set; }
        public DbSet<Schedule> Schedule { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Permission> Permission { get; set; }
        public DbSet<PermissionGroup> PermissionGroup { get; set; }

        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User[]
            {
                new User()
                {
                    Id = 1,
                    Login = AuthOptions.INIT_ADMIN_LOGIN,
                    Password = BCrypt.Net.BCrypt.HashPassword(AuthOptions.INIT_USER_PASSWORD),
                    RoleId = 1
                }
            });
        }
    }
}
