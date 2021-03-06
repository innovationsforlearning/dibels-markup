// Karma configuration
// Generated on Mon Mar 09 2015 21:06:12 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha-debug', 'mocha', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: [
      'www/js/vendor/jquery-2.1.3.min.js',
      'www/js/vendor/jquery-ui.min.js',
      'www/js/vendor/jquery.ui.touch-punch.min.js',
      'www/js/vendor/lodash.min.js',
      'www/js/vendor/backbone-1.1.2.js',
      'www/js/vendor/backbone.dualstorage.js',
      'www/js/vendor/handlebars-v3.0.0.js',
      'www/js/vendor/flickity.pkgd.min.js',
      'www/js/vendor/fittext.js',
      'www/js/vendor/moment.min.js',
      'node_modules/chai-jquery/chai-jquery.js',
      'www/js/handlebarsHelpers.js',
      'www/js/app.js',
      'www/js/database.js',
      'www/js/storyData.js',
      'www/js/compiled_templates/*.js',
      'www/js/models/*.js',
      'www/js/collections/*.js',
      'www/js/views/*.js',
      'spec/support/spec_helper.js',
      'spec/**/*_spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
