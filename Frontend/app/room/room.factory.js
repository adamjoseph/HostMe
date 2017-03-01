(function() {
    'use strict';

    angular
        .module('app')
        .factory('RoomFactory', RoomFactory);

    RoomFactory.$inject = ['$http', 'baseAPI', '$q'];

    /* @ngInject */
    function RoomFactory($http, baseAPI, $q) {
        var service = {
          getRooms: getRooms,
          updateRoom: updateRoom,
          addRoom: addRoom,
          deleteRoom: deleteRoom,
          addFavorite: addFavorite,
          deleteFavorite: deleteFavorite,
          getRoomById: getRoomById

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

          function updateRoom(id, room){
            return $http.put(baseAPI + 'Rooms/' + id, room);
          }

          function addRoom(room){
            return $http.post(baseAPI + 'Rooms', room);
          }

          function deleteRoom(id){
            return $http.delete(baseAPI + 'Rooms/' + id);
          }

          function addFavorite(favorite){
            return $http.post(baseAPI + 'Favorites', favorite);
          }

          function deleteFavorite(id){
            return $http.delete(baseAPI + 'Favorites' + id);
          }

          function getRoomById(id){
            return $http.get(baseAPI + 'Rooms?id=' + id);
          }
    }
})();
