Ember.Application.initializer({
  name: 'i18n',

  initialize: function (container, application) {

    Ember.ENV.I18N_COMPILE_WITHOUT_HANDLEBARS = true;
    Ember.FEATURES.I18N_TRANSLATE_HELPER_SPAN = false;

    var preferredLanguage = window.localStorage.getItem('webhook-cms-language') || window.navigator.language;

    if (Ember.ENV.I18N_SUPPORTED_LANGUAGES.indexOf(preferredLanguage) === -1) {
      preferredLanguage = null;
    }

    Ember.ENV.translations = Ember.ENV.translations || {};

    var translations = Ember.ENV.translations.en;

    if (preferredLanguage) {
      translations = Ember.$.extend(true, {}, translations, Ember.ENV.translations[preferredLanguage]);
    }

    Ember.I18n.language = preferredLanguage || 'en';
    Ember.I18n.translations = translations;

  }
});
