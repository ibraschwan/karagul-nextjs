export default ({ env }) => ({
  // Enable internationalization
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'tr',
      locales: ['tr', 'en'],
    },
  },
  // Configure upload plugin for Turkish
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000,
        },
      },
    },
  },
});
