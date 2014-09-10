Ember.Application.initializer({
  name: 'i18n',

  initialize: function (container, application) {

    application.deferReadiness();

    Ember.ENV.I18N_COMPILE_WITHOUT_HANDLEBARS = true;
    Ember.FEATURES.I18N_TRANSLATE_HELPER_SPAN = false;

    // Define somewhere else
    Ember.ENV.I18N_SUPPORTED_LANGUAGES = ['en', 'sp'];

    var language = 'en';
    var detectedLanguage = localStorage.getItem('language') || window.navigator.language;

    if (Ember.ENV.I18N_SUPPORTED_LANGUAGES.indexOf(detectedLanguage) !== 0) {
      language = detectedLanguage;
    }

    Ember.$.getJSON('i18n/translations/%@.json'.fmt(language)).done(function (translations) {
      Ember.I18n.translations = translations;
      application.advanceReadiness();
    });

  }
});
