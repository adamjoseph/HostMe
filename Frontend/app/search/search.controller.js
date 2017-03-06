(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['RoomFactory', '$state', '$stateParams', 'localStorageFactory'];

    /* @ngInject */
    function SearchController(RoomFactory, $state, $stateParams, localStorageFactory) {
        var sc = this;
        sc.title = 'SearchController'
        sc.storeRoomId = storeRoomId;
        sc.getRooms = getRooms;
        sc.addFavorite = addFavorite;


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

        function storeRoomId(id) {

            localStorageFactory.setKey("roomId", id);
            $state.go("roomDetail");
        } //close store room id

        function addFavorite(roomId) {
            if (localStorageFactory.getKey("storedUserId") == null) {
                SweetAlert.swal("Please Sign-In");
                $state.go("signin");

            } else {

                var favorite = {
                    "UserId": localStorageFactory.getKey("storedUserId"),
                    "RoomId": roomId
                };

                RoomFactory.addFavorite(favorite).then(
                    function(response) {
                        console.log(response);
                    },
                    function(error) {
                        console.log(error);
                    }
                )
            }
        } //closes addFavorites


        //Trying to scroll to search results

        // sc.scrollTo = function(id) {
        //     $document
        //         .scrollToElement(
        //             angular.element(document.getElementById(id)), 0, 1000);

        // }















    }
})();
