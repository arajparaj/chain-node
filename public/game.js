var socket = io();
var context,canvas;
var COLS=10;
var ROWS=5;
var box,x,y;

function clickHandler (e) {

//identifies the clicked box
  	x = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	y = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
  	x = Math.ceil(x/100);
  	y = Math.ceil(y/100);

//IMPORTANT should emit only Allowed positions
  	socket.emit('pos', {xc: x, yc: y});
}

//initializing the game state box
function initGameBox() {

    box=new Array(ROWS);
    for(var i=0;i<=ROWS;i++){
        box[i]=new Array(COLS);
    }

    for(i=1;i<=ROWS;i++){
        for(var j=1;j<=COLS;j++){
            box[i][j]={"color":"none","capacity":3,"atoms":0};
        }
    }

    for(i=2;i<COLS;i++){
        box[1][i].capacity=2;
        box[ROWS][i].capacity=2;
    }

    for(i=2;i<ROWS;i++){
        box[i][1].capacity=2;
        box[i][COLS].capacity=2;
    }


    box[1][1].capacity=1;
    box[1][COLS].capacity=1;
    box[ROWS][1].capacity=1;
    box[ROWS][COLS].capacity=1;
}

function updatecanvas(){
//update the canvas after each emit
//update all box in canvas with 0
    context.font = "bold 20px sans-serif";
    context.textBaseline = "top";
    for(var i=1;i<=ROWS;i++){
        for(var j=1;j<=COLS;j++){
            context.fillText(box[i][j].capacity, 50+(j-1)*100, 50+(i-1)*100);
//            console.log(i,j);
        }
    }
}

function createGrid(){

//grid options
    var opts = {
        distance : 100,
        lineWidth : 1,
        gridColor  : "#000000",
        caption : false
    };
//Adding the grid to canvas
    new Grid(opts).draw(context);

}
function updateBox(){
//update the box state

}

function init(){

//var declarations
    canvas = document.getElementById("gamebox");
    context = canvas.getContext("2d");

    createGrid();
//add an event listener to the canvas
    canvas.addEventListener("click",clickHandler);
    initGameBox();
    updatecanvas();
}


socket.on('pos', function(msg){
//    console.log("clicked pos",msg.xc,msg.yc);
//IMPORTANT user ID
    box[msg.xc][msg.yc].atoms++;
//resetting the canvas for update
    context.clearRect(0, 0, canvas.width, canvas.height);
    createGrid();
    updatecanvas();
});

init();
