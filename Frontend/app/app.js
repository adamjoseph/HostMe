(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'LocalStorageModule', 'oitozero.ngSweetAlert', 'angular-filepicker', 'socialLogin'])
        .value("baseAPI", "http://localhost:51319/api/")
        .config(function(filepickerProvider) {
            filepickerProvider.setKey('<API_KEY>')
        })
        .config(function(localStorageServiceProvider) {
            localStorageServiceProvider
        })
        .config(function(socialProvider) {
            socialProvider.setFbKey({ appId: "<FB_APP_ID>", apiVersion: "v2.8" })
        })
    .config(function($stateProvider, $urlRouterProvider) {
            //More any unmatched URL set up default route to main
            $urlRouterProvider.otherwise('/search');

            $stateProvider
                .state('search', {
                    url: "/search",
                    templateUrl: "app/search/search.html",
                    controller: "SearchController",
                    controllerAs: "sc"
                })
                .state('signin', {
                    url: "/signin",
                    templateUrl: "app/user/signin.html",
                    controller: "UserController",
                    controllerAs: "uc"
                })
                .state('register', {
                    url: "/register",
                    templateUrl: "app/user/register.html",
                    controller: "UserController",
                    controllerAs: "uc"
                })
                .state('profile', {
                    url: "/profile",
                    templateUrl: "app/user/profile.html",
                    controller: "UserController",
                    controllerAs: "uc"
                })
                .state('messages', {
                    url: "/messages",
                    templateUrl: "app/messages/myMessages.html",
                    controller: "MessageController",
                    controllerAs: "mc"
                })

                .state('roomDetail', {
                    url: "/roomDetail/:roomDetailDisplay",
                    templateUrl: "app/room/room.detail.html",
                    controller: "RoomController",
                    controllerAs: "rc"
                })
                .state('createRoom', {
                    url: "/createRoom",
                    templateUrl: "app/room/create.room.html",
                    controller: "RoomController",
                    controllerAs: "rc"
                })

                .state('favorites', {
                    url: "/favorites",
                    templateUrl: "app/user/room.favorites.html",
                    controller: "SearchController",
                    controllerAs: "sc"
                })


        })
        .run(function($rootScope,
                localStorageFactory,
                $state,
                $location) {
                // rootScope handler for when user changes states

                $rootScope.$on('$stateChangeStart', function() { //event, toState, toParams, fromState, from Params
                    // check if user id is stored
                    var isLogin = localStorageFactory.getKey("storedUserId");
                    if (isLogin === null) {
                        $location.path('/signin');
                    }
                })

                $rootScope.logOut = function(){
                  $rootScope.$broadcast("logOut");
                  localStorageFactory.logOut();
                  $state.go("search");
                }

                $rootScope.logIn = function(){
                  $rootScope.$broadcast("logIn");
                }

            }
        )

})();
