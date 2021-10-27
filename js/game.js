;
"use strict";

var game;

let window_height = Math.floor(window.screen.availHeight/32);
let window_width = Math.floor(window.screen.availWidth/32);

console.log(window_height,window_width,window_height-window_width);

var canvas = document.getElementById('canvas');

//32 as the basis for a tile
canvas.height = `${window_height*(32-8)}`;
canvas.width = `${window_width*(32-3)}`;

var ctx = canvas.getContext("2d");
//32*3 as the bottom is 32*2
const gravity = 1;
class Map
{
    constructor(width,height)
    {
        this.width=width;
        this.height=height;
        this.assets = [];
    }
    add_asset(asset)
    {
        this.assets.push(asset);
    }
    stroke_assets()
    {
        this.assets.forEach((asset) => asset.draw());
    }
}

class Asset {
    constructor(name, x, y, width, height)
    {
        this.name   =   name;
        this.x      =   x;
        this.y      =   y;
        this.width  =   width;
        this.height =   height;
        this.on_map =   false;
        this.color  =   'black';
        this.gravity =  5;
        this.dx     =   0;
        this.dy     =   0;
        this.on_ground = false;
    }
    set_color(color)
    {
        this.color = color;
    }
}
class Rectangle extends Asset {
    draw()
    {
        if(this.on_map){
            return;
        }else
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.stroke;
            this.on_map = true;
        }
        
    }
    clear()
    {
        ctx.clearRect(this.x,this.y,this.width,this.height);
        this.on_map = false;
    }
}
class Player extends Rectangle
{
    move()
    {
        this.clear();
        console.log(this.x,this.y,this.dy);
        this.collision(bottom);
        this.dy+=(this.gravity/10);
        console.log(this.dy)
        this.x+=this.dx;
        this.y+=this.dy;
        this.y=Math.round(this.y);
        console.log(this.x,this.y,this.dy)
        this.draw();
    }
    jump()
    {
        this.on_ground = false;
        
    }
    collision(other_asset)
    {
        var bottom = canvas.height-other_asset.height - this.height;
        if((this.y >= bottom) || (this.on_ground==false))
        {
            //console.log(bottom,this.y)
            this.on_ground = true;
            this.gravity = 0;
            this.dy = 0;
            return true;
            
        }else
        {
            this.on_ground = false;
            return false;
        }
        
    }
}

var player = new Player('player',0,canvas.height-(32*3),32,32);
player.set_color('red');
player.draw();

player.dx = 5;
player.dy = 0; // - equals up

var bottom = new Rectangle('bottom',0,canvas.height-64,canvas.width,32*2);
bottom.draw();

function draw()
{
    player.move();   
}




function jump()
{
    //console.log(player.collision(bottom));
    if(player.on_ground){
        player.gravity(0.5)
    }
}

//mainloop();
function mainloop()
{
    game = undefined;
    draw();
    start();
}
function start() {
    if (!game) {
       game = window.requestAnimationFrame(mainloop);
    }
}

function stop() {
    if (game) {
       window.cancelAnimationFrame(game);
       game = undefined;
    }
}
//debug function
function debug()
{
    //player.dy = -20;
    for(i=0;i<20;i++)
    {
        player.move();
    }
}

//player input
document.body.onkeydown = (e) => {
    console.log(e);
    if(e.keyCode == 32){
        //jump();
    }
    if(e.keyCode == 27)
    {
        stop();
    }
};