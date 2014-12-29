var canvas = document.getElementById("gamebox");
var context = canvas.getContext("2d");

var opts = {
  distance : 100,
  lineWidth : 1,
  gridColor  : "#66ff00",
  caption : false
};
new Grid(opts).draw(context);
