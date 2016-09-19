
(function () {
    'use strict';
    angular.module('ahay.codesamples', []);
    var app = angular.module('ahay.codesamples');

    function CodeSamplesController($scope, $location) {
        var vm = this;
    }

    app.controller('ahay.codesamples.CodeSamplesController', CodeSamplesController);

    app.directive('codeSamples', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/codesamples/codesamples.html',
            controller: 'ahay.codesamples.CodeSamplesController',
            controllerAs: 'vm',
            bindToController: true
        };
    });
})();