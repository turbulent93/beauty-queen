namespace BeautyQueenApi.Permissions
{
    public static partial class ApplicationPermissions {
        public static class Specializations {
            // public string Get { get; set; } = "Permissions.Specializations.Get";
            // public string View { get; set; } = "Permissions.Specializations.View";
            // public string Create { get; set; } = "Permissions.Specializations.Create";
            // public string Update { get; set; } = "Permissions.Specializations.Update";
            // public string Remove { get; set; } = "Permissions.Specializations.Remove";
            public static string GroupName { get; set; } = "Специальности";
            public static string Get { get; set; } = "Получение списка специальностей";
            public static string View { get; set; } = "Получение информации о специальности";
            public static string Create { get; set; } = "Создание специальности";
            public static string Update { get; set; } = "Обновление специальности";
            public static string Remove { get; set; } = "Удаление специальности";

        }
    }
}