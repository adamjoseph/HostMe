(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['RoomFactory', '$state'];

    /* @ngInject */
    function SearchController(RoomFactory, $state) {
        var sc = this;
        sc.title = 'SearchController'
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
                function(error) {
                    console.log(error);
                }
            )
        } //close getRooms
    }
})();
