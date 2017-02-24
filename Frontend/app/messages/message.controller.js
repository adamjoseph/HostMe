(function() {
    'use strict';

    angular
        .module('app')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['UserFactory', '$state' ];

    /* @ngInject */
    function MessageController(UserFactory, $state)  {
        var mc = this;


    }
})();
