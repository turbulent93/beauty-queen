namespace BeautyQueenApi.Permissions
{
    public static partial class ApplicationPermissions {
        public static class Users {
            // public string Get { get; set; } = "Permissions.Users.Get";
            // public string View { get; set; } = "Permissions.Users.View";
            // public string Create { get; set; } = "Permissions.Users.Create";
            // public string Update { get; set; } = "Permissions.Users.Update";
            // public string Remove { get; set; } = "Permissions.Users.Remove";
            public static string GroupName { get; set; } = "Пользователи";
            public static string Get { get; set; } = "Получение списка пользователей";
            public static string View { get; set; } = "Получение информации о пользователе";
            public static string Create { get; set; } = "Создание пользователя";
            public static string Update { get; set; } = "Обновление пользователя";
            public static string Remove { get; set; } = "Удаление пользователя";

        }
    }
}