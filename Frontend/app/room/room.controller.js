(function() {
    'use strict';

    angular
        .module('app')
        .controller('RoomController', RoomController);

    RoomController.$inject = ['$state', 'RoomFactory', '$stateParams'];

    /* @ngInject */
    function RoomController($state, RoomFactory, $stateParams) {
        var rc = this;
        
//After brought in from first function, went from object to a string, angular method converted back to object
        rc.AllRoomDetail =  angular.fromJson($stateParams.roomDetailDisplay);
        console.log(rc.AllRoomDetail.roomName)


    }
})();
