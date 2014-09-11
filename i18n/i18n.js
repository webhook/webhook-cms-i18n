Ember.Application.initializer({
  name: 'i18n',

  initialize: function (container, application) {

    application.deferReadiness();

    Ember.ENV.I18N_COMPILE_WITHOUT_HANDLEBARS = true;
    Ember.FEATURES.I18N_TRANSLATE_HELPER_SPAN = false;

    // Define somewhere else
    Ember.ENV.I18N_SUPPORTED_LANGUAGES = ['en', 'sp'];

    var detectedLanguage = localStorage.getItem('webhook-cms-language') || window.navigator.language;

    if (Ember.ENV.I18N_SUPPORTED_LANGUAGES.indexOf(detectedLanguage) === -1) {
      detectedLanguage = null;
    }

    var english = Ember.$.getJSON('%@/%@.json'.fmt(Ember.ENV.translationPath, 'en'));
    var translation = Ember.RSVP.Promise.resolve({});

    if (detectedLanguage) {
      translation = Ember.$.getJSON('%@/%@.json'.fmt(Ember.ENV.translationPath, detectedLanguage));
    }

    Ember.RSVP.Promise.all([english, translation]).then(function (translations) {
      Ember.I18n.translations = Ember.$.extend(true, {}, translations[0], translations[1]);
      application.advanceReadiness();
    });

  }
});
