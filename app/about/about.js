(function () {
    'use strict';
    angular.module('ahay.about', []);

    var app = angular.module('ahay.about');

    function About($scope, $location) {
        var vm = this;
    }

    app.controller('ahay.hero.About', About);

    app.directive('about', function () {
        return {
            restrict: 'E',
            controller: 'ahay.hero.About',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/about/about.html'
        };
    });
})();