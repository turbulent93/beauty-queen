namespace BeautyQueenApi.Permissions
{
    public static partial class ApplicationPermissions {
        public static class Roles {
            // public string Get { get; set; } = "Permissions.Roles.Get";
            // public string View { get; set; } = "Permissions.Roles.View";
            // public string Create { get; set; } = "Permissions.Roles.Create";
            // public string Update { get; set; } = "Permissions.Roles.Update";
            // public string Remove { get; set; } = "Permissions.Roles.Remove";
            public static string GroupName { get; set; } = "Роли";
            public static string Get { get; set; } = "Получение списка ролей";
            public static string View { get; set; } = "Получение информации о роли";
            public static string Create { get; set; } = "Создание роли";
            public static string Update { get; set; } = "Обновление роли";
            public static string Remove { get; set; } = "Удаление роли";

        }
    }
}