/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    API_URL: process.env.API_URL,
    EMPLOYEES_IMAGES_URL: process.env.EMPLOYEES_IMAGES_URL,

    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,

    GALLERY_IMAGES_URL: process.env.GALLERY_IMAGES_URL,
    EMPLOYEES_IMAGES_URL: process.env.EMPLOYEES_IMAGES_URL,
    
    EMPLOYEE_PATH: process.env.EMPLOYEE_PATH,
    EMPLOYEE_IMAGES_PATH: process.env.EMPLOYEE_IMAGES_PATH,
    SERVICE_PATH: process.env.SERVICE_PATH,
    SPECIALIZATION_PATH: process.env.SPECIALIZATION_PATH,
    ROLES_PATH: process.env.ROLES_PATH,
    SCHEDULES_PATH: process.env.SCHEDULES_PATH,
    APPOINTMENTS_PATH: process.env.APPOINTMENTS_PATH,
    USERS_PATH: process.env.USERS_PATH,
    REGISTRATION_PATH: process.env.REGISTRATION_PATH,
    LOGIN_PATH: process.env.LOGIN_PATH,
    SCHEDULE_PATH: process.env.SCHEDULE_PATH,
    REFRESH_TOKEN_PATH: process.env.REFRESH_TOKEN_PATH,
  }
}

module.exports = nextConfig
