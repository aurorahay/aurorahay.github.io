
(function () {
    'use strict';
    angular.module('ahay.hero', []);
    var app = angular.module('ahay.hero');

    function HeroController($scope, $location) {
        var vm = this;
    }

    app.controller('ahay.hero.HeroController', HeroController);

    app.directive('hero', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/hero/hero.html',
            controller: 'ahay.hero.HeroController',
            controllerAs: 'vm',
            bindToController: true
        };
    });
})();