import { ADMIN_ROLE_NAME, MASTER_ROLE_NAME } from "./roleNames"

export type PermissionType = (typeof ADMIN_ROLE_NAME | typeof MASTER_ROLE_NAME)[] 

interface IPagePermissions {
    usersPage: PermissionType,
    employeesPage: PermissionType,

    appointmentssPage: PermissionType,
    appointmentsPage: PermissionType,
    galleryPage: PermissionType,
    promoPage: PermissionType,
    schedulesPage: PermissionType,
    fillSchedulePage: PermissionType,
    servicesPage: PermissionType,
    specializationsPage: PermissionType,
    statisticsPage: PermissionType,   
    profilePage: PermissionType,
    settingsPage: PermissionType,
    metaPage: PermissionType,
}

export const PagePermissions: IPagePermissions = {
    usersPage: ["Админ"],
    employeesPage: ["Админ"],

    appointmentssPage: ["Админ", "Мастер"],
    appointmentsPage: ["Админ", "Мастер"],
    galleryPage: ["Админ", "Мастер"],
    promoPage: ["Админ", "Мастер"],
    schedulesPage: ["Админ", "Мастер"],
    fillSchedulePage: ["Админ", "Мастер"],
    servicesPage: ["Админ", "Мастер"],
    specializationsPage: ["Админ", "Мастер"],
    statisticsPage: ["Админ", "Мастер"],
    profilePage: ["Админ", "Мастер"],
    settingsPage: ["Админ"],
    metaPage: ["Админ"]
}