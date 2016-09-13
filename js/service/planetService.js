angular.module('spaceTravel').service('planetService',function($http){

  var baseUrl = 'http://swapi.co/api/planets/';

  this.getPlanet = function(planetId){

    return $http.get(baseUrl + planetId + '/').then(function (response) {
          if (Number(planetId) === 1) response.data['image'] = "https://lumiere-a.akamaihd.net/v1/images/Tatooine_36689d1b.jpeg?region=0%2C48%2C1536%2C768"
          else if (Number(planetId) === 2) response.data['image'] = "http://i.imgur.com/wd4ypx0.jpg"
          else if (Number(planetId) === 3) response.data['image'] = "http://i.imgur.com/LMvnATL.png"
          else if (Number(planetId) === 4) response.data['image'] = "https://media.starwars.ea.com/content/starwars-ea-com/en_US/starwars/battlefront/news-articles/creating-hoth/_jcr_content/featuredImage/renditions/rendition1.img.jpg"
          else if (Number(planetId) === 5) response.data['image'] = "https://www.wired.com/wp-content/uploads/2015/04/Dagobah.jpg"
          else if (Number(planetId) === 6)  response.data['image'] = "http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/11/Holiday-Shopping-Cloud-City-3.jpg"
          else if (Number(planetId) === 8) response.data['image'] = "http://1.bp.blogspot.com/-Ub_lcjnaIM4/UJU0QaxDdGI/AAAAAAAAAwo/DFJhLmWg-yY/s1600/naboo2"
          else if (Number(planetId) === 9) response.data['image'] = "http://img09.deviantart.net/4e58/i/2014/134/e/b/coruscant__2_by_daroz-d7idgv0.jpg"
          else if (Number(planetId) === 14) response.data['image'] = "http://i.imgur.com/VTw1aSB.jpg"

      return response.data
    });
  }

});
