(function () {
    'use strict';
    angular.module('ahay.header', []);
    var app = angular.module('ahay.header');

    function HeaderController($scope, $location) {
        var vm = this;
        $('.navbar-fixed-top').hide();
        $(window).scroll(function() {
            if($(this).scrollTop() > 500) {
                $('.navbar-fixed-top').fadeIn();
            } else {
                $('.navbar-fixed-top').fadeOut();
            }
        });

    }

    app.controller('ahay.header.HeaderController', HeaderController);

    app.directive('header', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/header/header.html',
            controller: 'ahay.header.HeaderController',
            controllerAs: 'vm',
            bindToController: true
        };
    });
})();