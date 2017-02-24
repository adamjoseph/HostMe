(function() {
    'use strict';

    angular
        .module('app')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$q', 'baseAPI'];

    /* @ngInject */
    function UserFactory($http, $q, baseAPI) {
        var service = {
            getUser: getUser,
            // addUser: addUser,

        };

        return service;

        function getUser(login) {
          var defer =$q.defer();

          $http({
            method: 'POST',
            url: baseAPI + 'Users/Login',
            data: login
          }).then(
            function(response){
              defer.resolve(response);
            },
            function(error){
              defer.reject(error);
            }
          )

          return defer.promise;
        }

        // function addUser() {
        //
        // }

    }
})();
