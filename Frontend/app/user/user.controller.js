(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', '$state'];

    /* @ngInject */
    function UserController(UserFactory, $state) {
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
    }
})();
