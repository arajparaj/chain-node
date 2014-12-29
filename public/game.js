var canvas = document.getElementById("gamebox");
var context = canvas.getContext("2d");
var socket = io();

var opts = {
  distance : 100,
  lineWidth : 1,
  gridColor  : "#000000",
  caption : false
};
new Grid(opts).draw(context);

canvas.addEventListener("click",clickHandler);

function clickHandler (e) {
	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
  	y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
  	x = Math.ceil(x/100);
  	y = Math.ceil(y/100);
  	socket.emit('pos', {xc: x, yc: y});
}

socket.on('pos', function(msg){
    console.log(msg.xc,msg.yc);
});