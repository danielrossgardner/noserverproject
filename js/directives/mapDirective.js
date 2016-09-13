angular.module('spaceTravel').directive('outerSpace',function($state){
////////////////////////////////////////////////////////////////////////////////
 // * Draws a rounded rectangle using the current state of the canvas.
 // * If you omit the last three params, it will draw a rectangle
 // * outline with a 5 pixel border radius
 // * @param {Number} x The top left x coordinate
 // * @param {Number} y The top left y coordinate
 // * @param {Number} width The width of the rectangle
 // * @param {Number} height The height of the rectangle
 // * @param {Object} radius All corner radii. Defaults to 0,0,0,0;
 // * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 // * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke) {
    var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "object") {
        for (var side in radius) {
            cornerRadius[side] = radius[side];
        }
    }

    this.beginPath();
    this.moveTo(x + cornerRadius.upperLeft, y);
    this.lineTo(x + width - cornerRadius.upperRight, y);
    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    this.lineTo(x + cornerRadius.lowerLeft, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    this.lineTo(x, y + cornerRadius.upperLeft);
    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    this.closePath();
    if (stroke) {
        this.stroke();
    }
    if (fill) {
        this.fill();
    }
}
////////////////////////////////////////////////////////////////////////////////

  function newSpeed(speed){
    return (((speed - 10) / (120 - 10)) * (20 - .1)) + .1;
  }

  function newSize(size){
    return (((size - 9.2) / (120000 - 9.2)) * (20 - 2)) + 2;
  }

  // Speed Max 120 Min 10
  // Speed Max 20 Min .1

  // Size Max 120000 Min 9.2
  // Size Max 20 Min 2

  // Result := (((Input - InputLow) / (InputHigh - InputLow)) * (OutputHigh - OutputLow)) + OutputLow;


  function setPlanetCoordinates(windowWidth,windowHeight){
    var percentCoords = [
    [.08,.3, .5, '#00cc00', 3], // Yavin IV
    [.18,.9, 1, '#00ace6', 2], // Alderaan
    [.28,.425, .9, '#33ccff', 8], // Naboo
    [.38,.7, 2, '#ff6600', 6], // Bespin
    [.48,.2, .2, '#666600', 5], // Dagobah
    [.58,.33, 1, '#cccc99', 1], // Tatooine
    [.68,.79, 1.4, '#4d4d4d', 9], // Corusant
    [.78,.52, 1.2, '#666600', 14], // Kashyyyk
    [.88,.245, .6, '#66e0ff', 4], // Hoth
    ];
    var newCoordinates = [];
    for (var i = 0; i < percentCoords.length; i++){
      // [x-coor, y-coord, size-scale, color, id]
      newCoordinates.push([windowWidth * percentCoords[i][0],windowHeight * percentCoords[i][1],percentCoords[i][2],percentCoords[i][3],percentCoords[i][4]])

    }
    return newCoordinates;
  }

  function collisionDetection(playerX,playerY,planets){
    for (var i = 0; i < planets.length; i++){
      if (
        (playerX >= planets[i][0] - (30*planets[i][2]) && playerX <= planets[i][0] + (30*planets[i][2]) )
        &&
        (playerY >= planets[i][1] - (30*planets[i][2]) && playerY <= planets[i][1] + (30*planets[i][2]) )
      ){
        $state.go('planet',{id: planets[i][4]})
      }
    }
  }

  return {
    restrict: 'EA',
    link: function(scope,element,attributes){
      var shipSpeed = newSpeed(Number($state.params.speed.replace(',','')));
      var shipSize = newSize(Number($state.params.len.replace(',','')));
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      // console.log(window.innerWidth,window.innerHeight)
      var can = element[0];
      can.width = windowWidth;
      can.height = windowHeight;
      // can.style.width = (window.innerWidth / 1.2) + "px";
      // can.style.height = (window.innerHeight / 1.2) + "px";
      var ctx = can.getContext('2d');

      // just to show where we are drawing these things

      can.tabIndex = 1; // quick way to get focus so keypresses register
      //ctx.font = '8px sans';
      // console.log(setPlanetCoordinates(windowWidth,windowHeight));
      var thingsOnMap = setPlanetCoordinates(windowWidth,windowHeight)


      // player's position
      var playerX = windowWidth/2;
      var playerY = windowHeight/2;

      // how far offset the canvas is
      var offsetX = 0;
      var offsetY = 0;

      function draw() {
          ctx.save();
          ctx.translate(offsetX, offsetY);
          // clear the viewport
          ctx.clearRect(-offsetX, -offsetY, 2000,1000);

          // draw the player
          if (shipSize === 20){
            ctx.fillStyle = 'grey';
          }
          else {
            ctx.fillStyle = 'yellow';
          }

          ctx.beginPath();
          ctx.roundRect(playerX-offsetX, playerY-offsetY, shipSize, shipSize, {upperLeft: shipSize/2,upperRight: shipSize/2,lowerLeft: shipSize/2,lowerRight: shipSize/2}, true, true)
          // ctx.fillRect(playerX-offsetX, playerY-offsetY, 10, 10);
          ctx.closePath();
          // draw the other stuff
          var l = thingsOnMap.length;
          for (var i = 0; i < l; i++) {
              var x = thingsOnMap[i][0];
              var y = thingsOnMap[i][1];
              var pSize = 30*thingsOnMap[i][2];
              var pColor = thingsOnMap[i][3];
              ctx.beginPath();
              var my_gradient = ctx.createLinearGradient(x-pSize,y-pSize,x+pSize,y+pSize);
              my_gradient.addColorStop(0,"black");
              my_gradient.addColorStop(0.5,pColor);
              my_gradient.addColorStop(1,"white");
              ctx.fillStyle = my_gradient;
              ctx.arc(x,y,pSize,0,2*Math.PI);
              ctx.fill();
              ctx.closePath();

              // ctx.fillStyle = 'yellow';
              // ctx.fillText(x + ', ' + y, x, y) // just to show where we are drawing these things

          }

          ctx.restore();
      }

          can.addEventListener('keydown', function(e) {
              if (e.keyCode === 37) { // left
                  playerX-= shipSpeed;
              } else if (e.keyCode === 39) { // right
                  playerX+= shipSpeed;
              }
              else if (e.keyCode === 38) { // up
                  playerY-= shipSpeed;
              }
              else if (e.keyCode === 40) { // down
                  playerY+= shipSpeed;
              }
              collisionDetection(playerX,playerY,thingsOnMap);
              draw();
          }, false);

// requestAnimationFrame
      draw();

    }
  }


})
