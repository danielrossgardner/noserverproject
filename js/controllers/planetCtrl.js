angular.module('spaceTravel').controller('planetCtrl',function($scope,planetService,$state){

    $scope.planetId = $state.params.id;

    $scope.getPlanet = function(id) {
      planetService.getPlanet(id).then(function(response){
        $scope.planet = response;
      })
    }

    $scope.getPlanet($scope.planetId);
    $scope.menuOpen = false;
});
