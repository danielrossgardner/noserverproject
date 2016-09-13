angular.module('spaceTravel',['ui.router'])
  .config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home',{
        url: '/',
        templateUrl: './views/home.html',
        controller: 'homeCtrl'
      })
      .state('spaceTravel',{
        url: '/spaceTravel',
        templateUrl: './views/spaceTravel.html',
        controller: 'spaceTravelCtrl'
      })
      .state('map',{
        url: '/map/:len?speed',
        templateUrl: './views/map.html',
        controller: 'mapCtrl'
      })
      .state('planet',{
        url: '/planet/:id',
        templateUrl: './views/planet.html',
        controller: 'planetCtrl'
      })



  })
