// (function() {
//     'use strict';
//
//     angular
//         .module('app')
//         .controller('navController', navController);
//
//     navController.$inject = ['localStorageService'];
//
//     /* @ngInject */
//     function navController(localStorageService) {
//         var vm = this;
//         vm.checkLogin = checkLogin;
//
//         checkLogin();
//
//         function checkLogin(){
//
//           if(localStorageService.get('storedUserId')){
//             vm.isLogin = true;
//           } else {
//             vm.isLogin = false;
//           }
//         }
//
//
//     }
// })();
