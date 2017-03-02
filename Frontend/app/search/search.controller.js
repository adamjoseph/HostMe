(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['RoomFactory', '$state', '$stateParams', '$rootScope', 'localStorageFactory'];

    /* @ngInject */
    function SearchController(RoomFactory, $state, $stateParams, $rootScope, localStorageFactory) {
        var sc = this;
        sc.title = 'SearchController'
        sc.storeRoomId = storeRoomId;
        sc.getRooms = getRooms;

        function getRooms() {

            var roomObject = {
                'City': sc.City,
                'Zip': sc.Zip,
                'MaxPrice': sc.MaxPrice,
                'GuestLimit': sc.GuestLimit,
                'Keyword': sc.Keyword,
                'Private': sc.Private
            }
            RoomFactory.getRooms(roomObject).then(
                function(response) {

                    sc.ReturnRoom = response.data;

                    console.log(response);
                },
                function(error) {
                    console.log(error);
                }
            )
        } //close getRooms

        function storeRoomId(id){

          localStorageFactory.setKey("roomId", id);
          $state.go("roomDetail");
        }








    }
})();
