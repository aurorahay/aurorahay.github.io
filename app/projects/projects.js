
(function () {
    'use strict';
    angular.module('ahay.projects', []);
    var app = angular.module('ahay.projects');

    function ProjectsController($scope, $location) {
        var vm = this;
        
        $.fn.lightspeedBox({
            zIndex: 1050,
            showDownloadButton: false
        }); 
    }

    app.controller('ahay.projects.ProjectsController', ProjectsController);

    app.directive('projects', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/projects/projects.html',
            controller: 'ahay.projects.ProjectsController',
            controllerAs: 'vm',
            bindToController: true
        };
    });
})();
