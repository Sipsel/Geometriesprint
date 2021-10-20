;
"use strict";

let window_height = Math.floor(window.screen.availHeight/32);
let window_width = Math.floor(window.screen.availWidth/32);

console.log(window_height,window_width,window_height-window_width);

var canvas = document.getElementById('canvas');

//32 as the basis for a tile
canvas.height = `${window_height*(32-8)}`;
canvas.width = `${window_width*(32-3)}`;

var ctx = canvas.getContext("2d");

x=0;
y=canvas.height-32;
dx=4;
dy=-4;
ctx.fillStyle = 'red';
ctx.fillRect(x,y,32,32);
ctx.stroke();

function draw()
{
    ctx.clearRect(x,y,32,32);
    if(x>window_width*29){
        x=0;
    }
    x+=dx;
    ctx.fillRect(x,y,32,32);
}

document.body.onkeydown = (e) => {
    console.log(e);
    if(e.keyCode == 32){
        jump();
    }
};

function jump()
{
    ctx.clearRect(x,y,32,32);
    if(y<0){
        y=canvas.height-32;
    }
    y+=dy;
    ctx.fillRect(x,y,32,32);
}

setInterval(draw,5);
