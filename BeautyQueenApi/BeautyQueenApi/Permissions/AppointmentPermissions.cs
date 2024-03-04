namespace BeautyQueenApi.Permissions
{
    public static partial class ApplicationPermissions {
        public static class Appointments {
            // public string Get { get; set; } = "Permissions.Appointment.Get";
            // public string View { get; set; } = "Permissions.Appointment.View";
            // public string Create { get; set; } = "Permissions.Appointment.Create";
            // public string Update { get; set; } = "Permissions.Appointment.Update";
            // public string Remove { get; set; } = "Permissions.Appointment.Remove";
            public static string GroupName { get; set; } = "Записи";
            public static string Get { get; set; } = "Получение списка записей";
            public static string View { get; set; } = "Получение информации о записи";
            public static string Create { get; set; } = "Создание записи";
            public static string Update { get; set; } = "Обновление записи";
            public static string Remove { get; set; } = "Удаление записи";
        }
    }
}