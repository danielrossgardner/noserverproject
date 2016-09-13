angular.module('spaceTravel').service('starshipService',function($q,$http){

  var allShips;


  this.getShips = function(url){

    return $http.get(url).then(function (response) {
      var ships = [];
response.data.results
      for (var i = 0; i < response.data.results.length; i++){
        if (response.data.results[i]['MGLT'] === 'unknown' || response.data.results[i]['length'] === 'unknown'){}
        else {
          ships.push(response.data.results[i])
        }
      }

      return [ships,response.data.previous,response.data.next];
    });



  }

});
