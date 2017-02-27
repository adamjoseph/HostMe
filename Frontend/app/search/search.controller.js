(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['RoomFactory', '$state'];

    /* @ngInject */
    function SearchController(RoomFactory, $state) {
        var sc = this;
        sc.title= 'SearchController'
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
              console.log(response);
            },
            function(error){
              console.log(error);
            }
          )
        }//close getRooms



        // function getEachRoomData() {
        //     RoomFactory.getRoomDetail($stateParams.roomDetailDisply).then(
        //         function(response) {
        //             sc.detailresults = response.data;
        //             console.log(vm.detailresults);
        //         },
        //         function(error) {
        //             if (error.data) {
        //                 console.log("there was a problem: " + error.data);
        //             } else {
        //                 console.log('no data found.');
        //             }
        //         }
        //
        //    )
        // };
        // getEachRoomData();
    }
})();
