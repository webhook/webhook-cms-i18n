This repository contains all the translations for [Webhook CMS](https://github.com/webhook/webhook-cms) powered by [Ember.I18n](https://github.com/jamesarosen/ember-i18n). All translation files are written in JSON within the translations directory.

During Webhook CMS initialization, the english language file is extended by the chosen language file. If the chosen language file is missing a translation key, the english value for that key will be used.

## Contributing

### Installing

- `git clone git@github.com:webhook/webhook-cms-i18n.git`
- `npm install`
- `bower install`
- run default `grunt` command and load up `http://localhost:8000`. See below for options.

### Add language file

If you would like to contribute a new language, add a file with an [ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code for a filename (ie: `fr.json` for French) to the `translations` directory.

### Developing

Running the `grunt` command will run a webserver for development. Open `http://localhost:8000` in your browser of choice. Choose a language to start from. Change any values you see fit. Click on the convert button to print out a JSON representation of the translation data. Copy/paste the output into your language file.

### Compiling

Webhook CMS uses the `translations.js` file found in the `lib` directory. It is created from all of the JSON files within the `translations` directory.

The default `grunt` task runs a watch command that looks for changes to the JSON files in the `translations` and compiles the `translations.js` file.

If you are not running the default `grunt` task, you need to run the `grunt concat` command to generate a new `translations.js` file with your changes.
