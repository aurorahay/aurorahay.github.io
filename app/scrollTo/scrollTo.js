(function () {
    'use strict';
    angular.module('ahay.scrollTo', []);

    var app = angular.module('ahay.scrollTo');

    function ScrollTo($scope, $location, $anchorScroll) {
        var vm = this;

        function scrollTo(elementId) {
            var element = document.getElementById(elementId);
        	//var header = document.getElementById('header');
        	if (element) {
        		$location.hash(elementId);
        		$anchorScroll();
        	}
        }

        $scope.scrollTo = scrollTo;
    }

    app.controller('ahay.hero.ScrollTo', ScrollTo);

    app.directive('scrollTo', function () {
        return {
            restrict: 'EA',
            controller: 'ahay.hero.ScrollTo',
            controllerAs: 'vm',
            bindToController: true
        };
    });
})();