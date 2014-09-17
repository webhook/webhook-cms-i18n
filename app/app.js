var TranslationFormComponent = Ember.Component.extend({

  willInsertElement: function () {

    var translations = Ember.A([]);

    function extract(obj, nestedKey) {
      obj = typeof obj === 'object' ? obj : {};
      Ember.$.each(obj, function (key, placeholder) {

        if (nestedKey) {
          key = nestedKey + '.' + key;
        }

        if (typeof placeholder === 'object') {
          extract(placeholder, key);
        }

        if (typeof placeholder === 'string') {

          var value = Ember.ENV.translations[Ember.I18n.language];

          key.split('.').forEach(function (tkey) {
            value = (value || {})[tkey];
          });

          translations.push(Ember.Object.create({
            key: key,
            placeholder: placeholder,
            value: value
          }));

        }

      });
    }

    extract(Ember.ENV.translations.en);

    this.set('translations', translations);

  },

  convert: function () {

    var translationsObj = {};

    this.get('translations').forEach(function (item) {
      var key = item.get('key');
      var value = item.get('value');

      if (value) {

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

      }
    });

    this.set('converted', JSON.stringify(translationsObj, null, 2));

  }.observes('translations.@each.value')

});

// Location of translations json
Ember.ENV.translationPath = 'i18n/translations';

window.TranslationApp = Ember.Application.create();

TranslationApp.ApplicationController = Ember.Controller.extend({
  init: function () {
    this.set('supportedLanguages', Ember.ENV.I18N_SUPPORTED_LANGUAGES.map(function (code) {
      return { code: code, language: Ember.ENV.I18N_CODE_MAP[code] };
    }));
  },
  actions: {
    chooseLanguage: function (language) {
      window.localStorage.setItem('webhook-cms-language', language);
      TranslationApp.reset();
    },
    clearLanguage: function () {
      Ember.$('input').val(null).change();
    }
  }
});

TranslationApp.TranslationFormComponent = TranslationFormComponent.extend();
