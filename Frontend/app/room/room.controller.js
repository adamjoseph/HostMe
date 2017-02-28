(function() {
    'use strict';

    angular
        .module('app')
        .controller('RoomController', RoomController);

    RoomController.$inject = ['$state', 'RoomFactory', '$stateParams', 'filepickerService'];

    /* @ngInject */
    function RoomController($state, RoomFactory, $stateParams, filepickerService) {
        var rc = this;
        rc.addRoom = addRoom;
        rc.pickFile = pickFile;

//After brought in from first function, went from object to a string, angular method converted back to object
        // rc.AllRoomDetail =  angular.fromJson($stateParams.roomDetailDisplay);
        // console.log(rc.AllRoomDetail.roomName)

        function addRoom() {

                var room = {
                    'UserId': localStorageService.get("storedUserId"),
                    'RoomName': rc.rName,
                    'Description': rc.description,
                    'Address': rc.address,
                    'City': rc.city,
                    'State': rc.state,
                    'Zip': rc.zip,
                    'Price': rc.price,
                    'PictureUrl': rc.picUrl,
                    'Private': rc.private,
                    'GuestLimit': rc.guest,
                    'RoomNumber': rc.roomNumber
                }

                RoomFactory.addRoom(room).then(
                    function(response) {
                      console.log(response);
                        SweetAlert.swal("Room Added!" + user.firstName, "", "success");
                        $('input').val('');
                    },
                    function(error) {
                        console.log(error);
                    }
                )

        } //close addUser

        function pickFile(){
          filepickerService.pick(
            {mimetype: 'image/*',
             containter: 'modal',
             services: ['COMPUTER', 'FACEBOOK']},
             function onSuccess(Blob){
               console.log(Blob);
               rc.picUrl = Blob.url;
             }
            )
          }//close pickFile

    }
})();
