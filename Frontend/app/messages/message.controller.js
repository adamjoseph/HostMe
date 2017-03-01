(function() {
    'use strict';

    angular
        .module('app')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['MessageFactory', '$state', 'localStorageService' ];

    /* @ngInject */
    function MessageController(MessageFactory, $state, localStorageService)  {
        var mc = this;
        mc.activate = activate;
        mc.replyMessage = replyMessage;


        activate();

        function activate(){

          var id = localStorageService.get("storedUserId");

          MessageFactory.getMessages(id).then(
            function(response){
              console.log(response.data);
              mc.conversations = response.data;
            },
            function(error){
              console.log(error);
            })
        }

        function replyMessage(m){

          var message = {
                        "ConversationId": m.conversationId,
                        "Subject": m.subject,
                        "Body": mc.body,
                        "DateCreated": new Date()
                      };

          MessageFactory.addMessage(message).then(
            function(response){
              console.log(response);
            },
            function(error){
              console.log(error);
            }
          )

        }


    }
})();
