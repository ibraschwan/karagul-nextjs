export default {
  config: {
    // Make Turkish the default language
    locales: ['tr', 'en'],
    // Set project name
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'Karagül Ajans',
        'app.components.LeftMenu.navbrand.workplace': 'Admin Panel',
        'Auth.form.welcome.title': 'Welcome to Karagül Ajans!',
        'Auth.form.welcome.subtitle': 'Sign in to your admin account',
      },
      tr: {
        'app.components.LeftMenu.navbrand.title': 'Karagül Ajans',
        'app.components.LeftMenu.navbrand.workplace': 'Yönetim Paneli',
        'Auth.form.welcome.title': 'Karagül Ajans\'a Hoş Geldiniz!',
        'Auth.form.welcome.subtitle': 'Yönetici hesabınıza giriş yapın',
        'Settings.profile.form.section.experience.interfaceLanguage': 'Arayüz dili',
        'global.localeToggle.label': 'Dili değiştir',
        'Settings.profile.form.section.experience.mode.label': 'Arayüz modu',
        'Auth.form.email.label': 'E-posta',
        'Auth.form.password.label': 'Şifre',
        'Auth.form.rememberMe.label': 'Beni hatırla',
        'Auth.form.forgotPassword.label': 'Şifremi unuttum',
        'Auth.form.button.login': 'Giriş yap',
        'app.components.HomePage.welcomeBlock.content': 'Karagül Ajans yönetim paneline hoş geldiniz. Sol menüden içeriklerinizi yönetebilirsiniz.',
        'content-manager.header.name': 'İçerik Yönetimi',
        'content-type-builder.plugin.name': 'İçerik Tipi Oluşturucu',
      },
    },
    // Theme customization
    theme: {
      colors: {
        primary100: '#f0f9ff',
        primary200: '#e0f2fe',
        primary500: '#3b82f6',
        primary600: '#2563eb',
        primary700: '#1d4ed8',
        danger700: '#b91c1c',
        neutral0: '#ffffff',
        neutral100: '#f3f4f6',
      },
    },
    // Set tutorials to false
    tutorials: false,
    // Disable video tutorials
    notifications: { releases: false },
  },
  bootstrap(app: any) {
    console.log('Karagül Ajans Admin Panel başlatılıyor...');
  },
};