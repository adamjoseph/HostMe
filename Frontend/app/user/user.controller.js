(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', '$state', '$rootScope'];

    /* @ngInject */
    function UserController(UserFactory, $state, $rootScope) {
        var uc = this;
        uc.getUser = getUser;

        function getUser() {

          var login = {'Email': uc.email, 'Password': uc.password};

          UserFactory.getUser(login).then(
            function(response){
              console.log(response);
            },
            function(error){
              console.log(error);
            });
        }//close getUser

        $rootScope.$on('event:social-sign-in-success', function(event, userDetails){
          console.log(userDetails);

          var login = {'Email': userDetails.email, 'Password': userDetails.uid};

          UserFactory.getUser(login).then(
            function(response){
              console.log(response);
            },
            function(error){
              console.log(error);
            });
        })//close rootScope
    }
})();
