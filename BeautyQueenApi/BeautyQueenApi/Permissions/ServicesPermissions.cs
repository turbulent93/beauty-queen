namespace BeautyQueenApi.Permissions
{
    public static partial class ApplicationPermissions {
        public static class Services {
            // public string Get { get; set; } = "Permissions.Services.Get";
            // public string View { get; set; } = "Permissions.Services.View";
            // public string Create { get; set; } = "Permissions.Services.Create";
            // public string Update { get; set; } = "Permissions.Services.Update";
            // public string Remove { get; set; } = "Permissions.Services.Remove";
            public static string GroupName { get; set; } = "Услуги";
            public static string Get { get; set; } = "Получение услуг";
            public static string View { get; set; } = "Получение информации о услуге";
            public static string Create { get; set; } = "Создание услуги";
            public static string Update { get; set; } = "Обновление услуги";
            public static string Remove { get; set; } = "Удаление услуги";
        }
    }
}