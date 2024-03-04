namespace BeautyQueenApi.Permissions
{
    public static partial class ApplicationPermissions {
        public static class Schedules {
            // public string Get { get; set; } = "Permissions.Schedules.Get";
            // public string View { get; set; } = "Permissions.Schedules.View";
            // public string Create { get; set; } = "Permissions.Schedules.Create";
            // public string Update { get; set; } = "Permissions.Schedules.Update";
            // public string Remove { get; set; } = "Permissions.Schedules.Remove";
            public static string GroupName { get; set; } = "Расписание";
            public static string Get { get; set; } = "Получение расписания";
            public static string View { get; set; } = "Получение информации о дне расписания";
            public static string Create { get; set; } = "Создание дня расписания";
            public static string Update { get; set; } = "Обновление дня расписания";
            public static string Remove { get; set; } = "Удаление дня расписания";
        }
    }
}