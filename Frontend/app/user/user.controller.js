(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', '$state', '$rootScope', 'localStorageService', 'filepickerService', 'SweetAlert'];

    /* @ngInject */
    function UserController(UserFactory, $state, $rootScope, localStorageService, filepickerService, SweetAlert) {
        var uc = this;
        uc.getUser = getUser;
        uc.addUser = addUser;
        uc.addFacebookUser = addFacebookUser;
        uc.updateUser = updateUser;
        uc.viewUser = viewUser;
        uc.pickFile = pickFile;


        //checks user email and password
        function getUser() {

            var login = { 'Email': uc.email, 'Password': uc.password };

            UserFactory.getUser(login).then(
                function(response) {
                  var user = response.data;
                    if (user[0] == null) {

                        $state.go('register');
                    } else {
                        localStorageService.set('storedUserId', user[0].userId);
                        SweetAlert.swal("Welcome Back " + user[0].firstName, "", "success");

                        console.log('user exists original');
                        $state.go('search');
                    }
                },
                function(error) {
                    console.log(error);
                });
        } //close getUser

        //Event for successful FB login

        $rootScope.$on('event:social-sign-in-success', function(event, userDetails) {

                uc.userDetails = userDetails;


                var login = { 'Email': userDetails.email, 'Password': userDetails.uid };

                UserFactory.getUser(login).then(
                    function(response) {

                        //check user email/password to see if exists
                        if (user[0] == null) {
                            //Go create new user
                            addFacebookUser(uc.userDetails);
                            $state.go('profile');
                        } else {
                            localStorageService.set('storedUserId', user[0].userId);
                            SweetAlert.swal("Welcome Back " + user[0].firstName, "", "success");
                            console.log("hello");
                            $state.go('search');
                        }
                    },
                    function(error) {
                        console.log(error);
                    });
            }) //close rootScope


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
                function(response) {
                    console.log(response);
                    SweetAlert.swal("Welcome " + user.firstName, "", "success");
                },
                function(error) {
                    console.log(error);
                }
            )
        } //close addFacebookUser

        function pickFile(){
          filepickerService.pick(
            {mimetype: 'image/*',
             containter: 'modal',
             services: ['COMPUTER', 'FACEBOOK']},
             function onSuccess(Blob){
               console.log(Blob);
               uc.picUrl = Blob.url;
             }
            )
          }//close pickFile


        //Create new user
        function addUser() {
            //check if passwords match
            if (uc.password == uc.confirm) {
                var user = {
                    'FirstName': uc.fname,
                    'LastName': uc.lname,
                    'Email': uc.email,
                    'UserName': uc.uname,
                    'Zip': uc.zip,
                    'ContactPhone': uc.phone,
                    'BirthDate': uc.bday,
                    'Password': uc.password,
                    'ProfilePic': uc.picUrl
                }

                UserFactory.addUser(user).then(
                    function(response) {
                        SweetAlert.swal("Welcome " + user.firstName, "", "success");
                        $('input').val('');
                    },
                    function(error) {
                        console.log(error);
                    }
                )
            } else {
                  SweetAlert.swal("Passwords do not match", "", "warning");
            } //close if/else
        } //close addUser

        //Update User Profile with -->function updateUser(id, user)
        function updateUser(user) {

            var storedUserId = localStorageService.get("storedUserId");
            //add updated profile pic
            user.profilePic = uc.picUrl;

            UserFactory.updateUser(storedUserId, user).then(
                function(response) {
                    console.log(response);
                    SweetAlert.swal("Profile Updated", "", "success");
                },
                function(error) {
                    console.log(error)
                }
            )
        }
        //viewUser
        function viewUser() {
            var storedUserId = localStorageService.get("storedUserId");

            UserFactory.viewUser(storedUserId).then(
                function(response) {

                   uc.user = response.data;

                    console.log(uc.user);

                },

                function(error) {
                    console.log(error)
                }
            )
        }//close viewUser


    } //close UserController
})();
