(function () {
    'use strict';
    var app = angular.module('ahay', [
     'ui.router',
     'ahay.hero',
     'ahay.scrollTo',
     'ahay.about',
     'ahay.technologies',
     'ahay.codesamples',
     'ahay.header',
     'ahay.projects',
     'ngSanitize',
     'hc.marked'
    ]);

    app.config(['markedProvider', function (markedProvider) {
        markedProvider.setOptions({
          gfm: true,
          tables: true,
          highlight: function (code, lang) {
            if (lang) {
              return hljs.highlight(lang, code, true).value;
            } else {
              return hljs.highlightAuto(code).value;
            }
          }
        });
    }]);

})();