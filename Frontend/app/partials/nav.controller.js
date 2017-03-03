(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$scope', '$rootScope'];

    /* @ngInject */
    function NavController($scope, $rootScope) {
        // var vm = this;

        $scope.isHidden = true;

        $scope.$on('logIn', function() {
          // console.log("logged in");
          $scope.isHidden = false;

        });

        $scope.$on('logOut', function() {
          // console.log("logged out");
          $scope.isHidden = true;
        });

    }
})();
