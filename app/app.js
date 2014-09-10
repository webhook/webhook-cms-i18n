window.App = Ember.Application.create();

App.Router.map(function() {});

App.ApplicationController = Ember.Controller.extend({
  init: function () {
    this.set('supportedLanguages', Ember.ENV.I18N_SUPPORTED_LANGUAGES);
  },
  actions: {
    chooseLanguage: function (language) {
      localStorage.setItem('language', language);
      document.location.reload();
    }
  }
});
