(function() {
    'use strict';

    angular
        .module('app')
        .controller('RoomController', RoomController);

    RoomController.$inject = ['$state', 'RoomFactory'];

    /* @ngInject */
    function RoomController($state, RoomFactory) {
        var rc = this;


    }
})();
