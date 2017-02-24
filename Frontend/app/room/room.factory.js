(function() {
    'use strict';

    angular
        .module('app')
        .factory('RoomFactory', RoomFactory);

    RoomFactory.$inject = ['$http', 'baseAPI', '$q'];

    /* @ngInject */
    function RoomFactory($http, baseAPI, $q) {
        var service = {
          getRooms: getRooms

        };

        return service;

        function getRooms (search) {
          var defer = $q.defer();
          $http({
            method: 'GET',
            url: baseAPI + 'Rooms/Search',
            params: search
          }).then(function(response) {
            defer.resolve(response);
          },
            function(error) {
              defer.reject(error);
            });

            return defer.promise;
          }
    }
})();
