var TranslationFormComponent = Ember.Component.extend({

  willInsertElement: function () {

    var translations = Ember.A([]);

    function extract(obj, nestedKey) {
      Ember.$.each(obj, function (key, value) {

        if (nestedKey) {
          key = nestedKey + '.' + key;
        }

        if (typeof value === 'object') {
          extract(value, key);
        }

        if (typeof value === 'string') {
          translations.push(Ember.Object.create({
            key: key,
            value: value
          }));
        }

      });
    }

    extract(Ember.I18n.translations);

    this.set('translations', translations);

  },

  actions: {
    convert: function () {

      var translationsObj = {};

      this.get('translations').forEach(function (item) {
        var key = item.get('key');
        var value = item.get('value');
        if (key.indexOf('.') === -1) {
          translationsObj[key] = value;
        } else {
          var keyParts = key.split('.');

          var keyObj = translationsObj;
          keyParts.forEach(function (keyPart, index) {
            if (keyParts.length === index + 1) {
              keyObj[keyPart] = value;
            } else {
              if (keyObj[keyPart] === undefined) {
                keyObj[keyPart] = {};
              }
              keyObj = keyObj[keyPart];
            }
          });

        }
      });

      this.set('converted', JSON.stringify(translationsObj, null, 2));

    }
  }

});

// Location of translations json
Ember.ENV.translationPath = 'i18n/translations';

window.TranslationApp = Ember.Application.create();

TranslationApp.ApplicationController = Ember.Controller.extend({
  init: function () {
    this.set('supportedLanguages', Ember.ENV.I18N_SUPPORTED_LANGUAGES);
  },
  actions: {
    chooseLanguage: function (language) {
      localStorage.setItem('webhook-cms-language', language);
      TranslationApp.reset();
    },
    clearLanguage: function () {
      Ember.$('input').val(null).change();
    }
  }
});

TranslationApp.TranslationFormComponent = TranslationFormComponent.extend();
