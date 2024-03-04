using System.Reflection;
using BeautyQueenApi.Constants;
using BeautyQueenApi.Models;
using BeautyQueenApi.Permissions;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Data;

public class DbInitializer
{
    private readonly ApplicationDbContext _context;

    public DbInitializer(
        ApplicationDbContext context)
    {
        _context = context;
    }

    private IEnumerable<string> GetAllPermissions() {
        return typeof(ApplicationPermissions)
            .GetNestedTypes(BindingFlags.Public | BindingFlags.Static)
            .SelectMany(c => c
                .GetProperties()
                .Where(p => p.Name != "GroupName")
                .Select(p => p
                    !.GetValue(null)
                    !.ToString()!
                ));
    }

    private IEnumerable<string> GetAllPermissionGroups() {
        return typeof(ApplicationPermissions)
            .GetNestedTypes(BindingFlags.Public | BindingFlags.Static)
            .SelectMany(c => c
                .GetProperties()
                .Where(p => p.Name == "GroupName")
                .Select(p => p
                    !.GetValue(null)
                    !.ToString()!
                ));
    }

    public async Task SeedingPermissions() {
        var permissionsGroups = typeof(ApplicationPermissions)
            .GetNestedTypes(BindingFlags.Public | BindingFlags.Static);

        foreach(var permissionGroup in permissionsGroups) {
            var props = permissionGroup.GetProperties();

            var groupName = permissionGroup
                .GetProperty("GroupName")
                !.GetValue(null)
                !.ToString();
            var group = await _context.PermissionGroup.FirstOrDefaultAsync(p => p.Name == groupName);

            if (group == null) {
                Console.WriteLine($"Add permission group {groupName}");

                group = new PermissionGroup {
                    Name = groupName!
                };

                await _context.PermissionGroup.AddAsync(group);

                await _context.SaveChangesAsync();
            }

            var groupPermissions = permissionGroup
                .GetProperties()
                .Where(p => p.Name != "GroupName")
                .Select(p => p.GetValue(null)!.ToString());

            foreach(var permission in groupPermissions) {
                var permissionExist = await _context.Permission.AnyAsync(p => p.Name == permission);

                if(!permissionExist) {
                    Console.WriteLine($"Add permission {permission}");
                    _context.Permission.Add(new Permission {
                        Name = permission!,
                        GroupId = group.Id
                    });
                }
            }
        }

        var permissionGroups = GetAllPermissionGroups();

        if(_context.PermissionGroup.Count() > permissionGroups.Count()) {
            var permissionGroupsToRemove = _context.PermissionGroup.Where(p => !permissionGroups.Contains(p.Name));

            foreach(var permissionGroup in permissionGroups) {
                Console.WriteLine($"Remove permissoin group {permissionGroup}");
            }

            _context.PermissionGroup.RemoveRange(permissionGroupsToRemove);
        }

        var permissions = GetAllPermissions();

        if(_context.Permission.Count() > permissions.Count()) {
            var permissionsToRemove = _context.Permission.Where(p => !permissions.Contains(p.Name));

            foreach(var permission in permissionsToRemove) {
                Console.WriteLine($"Remove permission {permission}");
            }

            _context.Permission.RemoveRange(permissionsToRemove);
        }

        await _context.SaveChangesAsync();
    }
    
    public async Task SeedingRolesAsync() {
        var adminRole = await _context.Role.AnyAsync(r => r.Name == AuthOptions.INIT_ADMIN_ROLE_NAME);

        if(!adminRole) {
            await _context.Role.AddAsync(new Role {
                Name = AuthOptions.INIT_ADMIN_ROLE_NAME,
                Permissions = await _context.Permission.ToListAsync()
            });

            await _context.SaveChangesAsync();
        }
    }

    public async Task SeedingUsersAsync() {
        var admin = await _context.User.AnyAsync(u => u.Login == AuthOptions.INIT_ADMIN_LOGIN);

        if(!admin) {
            var adminRole = await _context.Role.FirstOrDefaultAsync(r => r.Name == AuthOptions.INIT_ADMIN_ROLE_NAME);

            // await _context.User.AddAsync(new User {
            //     Login = AuthOptions.INIT_ADMIN_LOGIN,
            //     Password = 
            // });
        }
    }

    public async Task InitializeAsync()
    {
        // if(_context.Database.GetMigrations().Any()) {
        //     // if((await _context.Database.GetPendingMigrationsAsync()).Any()) {
        //     //     Console.WriteLine("Applying migrations...");
        //     //     await _context.Database.MigrateAsync();
        //     // }

        //     if(await _context.Database.CanConnectAsync()) {
        //     }
        // }
        await SeedingPermissions();
    }
}
