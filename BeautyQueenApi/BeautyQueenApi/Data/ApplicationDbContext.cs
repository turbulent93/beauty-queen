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
            try
            {
                var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;

                if(databaseCreator != null)
                {
                    if (!databaseCreator.CanConnect()) databaseCreator.Create();
                    if (!databaseCreator.HasTables()) databaseCreator.CreateTables();
                }
            } catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<Specialization> Specialization { get; set; }
        public DbSet<Schedule> Schedule { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Photo> Photo { get; set; }
        public DbSet<Promotion> Promo { get; set; }
        public DbSet<Unit> Unit { get; set; }
        public DbSet<Settings> Settings { get; set; }
        public DbSet<Meta> Meta { get; set; }
        public DbSet<Image> Image { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Meta>().HasData(new Meta[]
            {
                new Meta()
                {
                    Id = 1
                }
            });

            modelBuilder.Entity<Settings>().HasData(new Settings[]
            {
                new Settings()
                {
                    Id = 1,
                    DefaultStartWorkTime = TimeOnly.Parse("10:00"),
                    DefaultEndWorkTime = TimeOnly.Parse("18:00")
                }
            });

            modelBuilder.Entity<Role>().HasData(new Role[]
            {
                new Role()
                {
                    Id = 1,
                    Name = "Админ"
                },
                new Role()
                {
                    Id = 2,
                    Name = "Мастер"
                }
            });

            modelBuilder.Entity<User>().HasData(new User[]
            {
                new User()
                {
                    Id = 1,
                    Login = AuthOptions.INIT_USER_LOGIN,
                    Password = BCrypt.Net.BCrypt.HashPassword(AuthOptions.INIT_USER_PASSWORD),
                    RoleId = 1
                }
            });

            modelBuilder.Entity<Unit>().HasData(new Unit[]
            {
                new Unit()
                {
                    Id = 1,
                    Name = "р"
                },
                new Unit()
                {
                    Id = 2,
                    Name = "%"
                }
            });

            modelBuilder.Entity<Settings>()
                .HasOne(s => s.MainPhoto)
                .WithOne(i => i.MainPhoto)
                .HasForeignKey<Settings>(s => s.MainPhotoId)
                .HasPrincipalKey<Image>(i => i.Id)
                .IsRequired(false);

            modelBuilder.Entity<Settings>()
                .HasOne(s => s.Favicon)
                .WithOne(i => i.Favicon)
                .HasForeignKey<Settings>(s => s.FaviconId)
                .HasPrincipalKey<Image>(i => i.Id)
                .IsRequired(false);
        }
    }
}
