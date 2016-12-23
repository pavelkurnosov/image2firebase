var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
    .constant('FIREBASE_URL', 'https://shknowledge.firebaseIO.com/');


myApp.run(['$rootScope', '$location',
    function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError',
            function (event, next, previous, error) {
                if (error == 'AUTH_REQUIRED') {
                    $rootScope.message = 'Sorry, you need to be logged in to get there...';
                    $location.path('/login');
                }
            });
    }]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController',

    })./*
     If we do need to register new users -
     */
    when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
    }).when('/updatePassword', {
        templateUrl: 'views/updatePassword.html',
        controller: 'RegistrationController'
    }).when('/resetPassword', {
        templateUrl: 'views/resetPassword.html',
        controller: 'RegistrationController'
    }).when('/bringit', {
        templateUrl: 'views/bringit2017.html',
        controller: 'bringitController',
//       resolve: {
//          currentAuth: function(Authentication){
//              return Authentication.requireAuth();
//          }
//      }
    }).otherwise({
        redirectTo: '/bringit'
    });
}]);


      