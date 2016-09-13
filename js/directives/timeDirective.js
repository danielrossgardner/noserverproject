angular.module('spaceTravel').directive('showTime',function($interval){

  return {
    restrict: 'E',
    template: '<div>{{time}}</div>',
    link: function(scope, element, attrs) {
      $interval(function(){
        var time = new Date()
        scope.time = ( ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2) + ':' + time.getSeconds() )
      },998);
      // var currentTime = new Date();
      // scope.time = currentTime.toString();
    }
  }
});
