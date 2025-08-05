export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  // Language configuration
  languages: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
  },
  // Internationalization settings
  internationalization: {
    enabled: true,
    defaultLocale: 'tr',
  },
  // Custom admin panel branding
  head: {
    title: 'Karagül Ajans - Yönetim Paneli',
  },
});