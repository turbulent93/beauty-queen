namespace BeautyQueenApi.Services.PermissionService
{
    public interface IPermissionService
    {
        bool IsEmployeeAccessAllowed(string login);
        bool IsScheduleAccessAllowed(int id);
        bool IsPhotoAccessAllowed(int id);
    }
}
