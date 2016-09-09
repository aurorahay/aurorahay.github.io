/**
 * Created by ahay on 7/12/2016.
 */
(function () {
    'use strict';

    var app = angular.module('ahay');

   app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
        function( $stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('/', {
                    url: "/",
                    template: "<h1>Hello World!</hi>"
                });
        }]);

    app.run(['$rootScope', '$location', '$window',
        function($rootScope, $location, $resource, $window) {
        }
    ]);
})();
