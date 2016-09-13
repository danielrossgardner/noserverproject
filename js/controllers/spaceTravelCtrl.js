angular.module('spaceTravel').controller('spaceTravelCtrl',function($scope,starshipService){

      var baseUrl = 'http://swapi.co/api/starships'
      var prevUrl;
      var nextUrl;

      $scope.getShips = function(url) {
        starshipService.getShips(url).then(function(results){
          $scope.ships = results[0];
          prevUrl = results[1];
          nextUrl = results[2];
          $scope.testingShow = $scope.ships ? true : false;
        })
      }

      $scope.getShips(baseUrl);



      $scope.prev = function() {
        if(prevUrl){
          $scope.getShips(prevUrl);
        }
      }

      $scope.next = function() {
        if (nextUrl){
          $scope.getShips(nextUrl);
        }
      }

      $scope.menuOpen = false;
});
