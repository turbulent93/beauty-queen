/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    API_URL: process.env.API_URL,

    LOGIN_PATH: process.env.LOGIN_PATH,
    REGISTER_PATH: process.env.REGISTER_PATH,
    REFRESH_TOKEN_PATH: process.env.REFRESH_TOKEN_PATH,
    CHECK_TOKEN_PATH: process.env.CHECK_TOKEN_PATH,

    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    
    EMPLOYEE_PATH: process.env.EMPLOYEE_PATH,
    SERVICE_PATH: process.env.SERVICE_PATH,
    SPECIALIZATION_PATH: process.env.SPECIALIZATION_PATH,
    ROLES_PATH: process.env.ROLES_PATH,
    SCHEDULES_PATH: process.env.SCHEDULES_PATH,
    APPOINTMENTS_PATH: process.env.APPOINTMENTS_PATH,
    USERS_PATH: process.env.USERS_PATH,
    SCHEDULE_PATH: process.env.SCHEDULE_PATH,
    PROMO_PATH: process.env.PROMO_PATH,
    GALLERY_PATH: process.env.GALLERY_PATH,
    META_PATH: process.env.META_PATH,
    SETTINGS_PATH: process.env.SETTINGS_PATH,

    UPLOAD_IMAGES_PATH: process.env.UPLOAD_IMAGES_PATH
  },
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:7169/:path*',
        },
      ]
    },
}

module.exports = nextConfig