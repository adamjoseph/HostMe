(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', '$state', '$rootScope','localStorageService'];

    /* @ngInject */
    function UserController(UserFactory, $state, $rootScope, localStorageService) {
        var uc = this;
        uc.getUser = getUser;
        uc.addUser = addUser;
        uc.addFacebookUser = addFacebookUser;

        function getUser() {

          var login = {'Email': uc.email, 'Password': uc.password};

          UserFactory.getUser(login).then(
            function(response){
              if(response.data[0]== null){

                $state.go('register');
              } else {
                localStorageService.set('storedUserId',response.data[0].userId);
                console.log(localStorageService.get('storedUserId'));

                console.log('user exists');
                $state.go('search');
              }
            },
            function(error){
              console.log(error);
            });
        }//close getUser

        //Event for successful FB login
        $rootScope.$on('event:social-sign-in-success', function(event, userDetails){

          uc.userDetails = userDetails;
          console.log(userDetails);

          var login = {'Email': userDetails.email, 'Password': userDetails.uid};

          UserFactory.getUser(login).then(
            function(response){
              console.log(response);
              //check user email/password to see if exists
              if(response.data[0]== null){
                //Go create new user
                addFacebookUser(uc.userDetails);
                $state.go('profile');
              } else {
                localStorageService.set('storedUserId',response.data[0].userId);
                console.log('user exists');
                $state.go('search');
              }
            },
            function(error){
              console.log(error);
            });
        })//close rootScope

        //Add user with FB response data
        function addFacebookUser(userDetails) {
          console.log(userDetails);

          //Separate User's first name and last name
          var fname = userDetails.name.split(' ')[0];
          var lname = userDetails.name.split(' ')[1];

          //Construct user object
          var user = {
                      'FirstName': fname,
                      'LastName': lname,
                      'Email': userDetails.email,
                      'Password': userDetails.uid,
                      'ProfilePic': userDetails.imageUrl
          };

          //Pass user object to factory function
          UserFactory.addUser(user).then(
            function(response){
              console.log(response);
            },
            function(error){
              console.log(error);
            }
          )
        }//close addFacebookUser

        function addUser(){

        //check if passwords match
        if(uc.password == uc.confirm){
            var user = {
                        'FirstName': uc.fname,
                        'LastName': uc.lname,
                        'Email': uc.email,
                        'UserName': uc.uname,
                        'Zip': uc.zip,
                        'ContactPhone': uc.phone,
                        'BirthDate': uc.bday,
                        'Password': uc.password,
                        'ProfilePic': uc.pic
                        }

            UserFactory.addUser(user).then(
              function(response){
                console.log(response);
                $('input').val('');
              },
              function(error){
                console.log(error);
              }
            )
          } else{
            console.log('Passwords do not match');
          }//close if/else
        }//close addUser



    }//close UserController
})();
