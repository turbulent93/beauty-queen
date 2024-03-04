namespace BeautyQueenApi.Permissions
{
    public static partial class ApplicationPermissions {
        public static class Employees {
            // public string Get { get; set; } = "Permissions.Employees.Get";
            // public string View { get; set; } = "Permissions.Employees.View";
            // public string Create { get; set; } = "Permissions.Employees.Create";
            // public string Update { get; set; } = "Permissions.Employees.Update";
            // public string Remove { get; set; } = "Permissions.Employees.Remove";
            public static string GroupName { get; set; } = "Сотрудники";
            public static string Get { get; set; } = "Получение списка сотрудников";
            public static string View { get; set; } = "Получение информации о сотрудника";
            public static string Create { get; set; } = "Создание сотрудника";
            public static string Update { get; set; } = "Обновление сотрудника";
            public static string Remove { get; set; } = "Удаление сотрудника";

        }
    }
}