(function() {
    'use strict';

    angular
        .module('app')
        .factory('MessageFactory', MessageFactory);

    MessageFactory.$inject = ['$http', '$q', 'baseAPI'];

    /* @ngInject */
    function MessageFactory($http, $q, baseAPI) {
        var service = {
            addConversation: addConversation,
            addMessage: addMessage
        };

        function addConversation(conversation){
          return $http.post(baseAPI + 'Conversations', conversation);
        }

        function addMessage(message){
          return $http.post(baseAPI + 'Messages', message);
        }


    }
})();
