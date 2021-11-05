;
"use strict";
//classes.js
class Vector {
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    add([x,y])
    //x,y for vector to add
    {
        this.x+=x;
        this.y+=y;

        this.x = this.x;
        this.y = this.y; 
    }
    get_position()
    {
        return [this.x,this.y];
    }
}

// end of file


const tile_size = 32

var game;

let window_height = Math.floor(window.screen.availHeight/32);
let window_width = Math.floor(window.screen.availWidth/32);

//console.log(window_height,window_width,window_height-window_width);

let margin_width = 8;
let margin_height = 8;

var map_height = window_height-margin_height;
var map_width = window_width-margin_width;

map_height = 16;
map_width = 16;
console.log(`hoehe:${map_height},breite:${map_width}`)

var canvas = document.getElementById('canvas');

//32 as the basis for a tile
canvas.height = `${window_height*(32)-(margin_height*tile_size)}`;
canvas.width = `${window_width*(32)-(margin_width*tile_size)}`;


var ctx = canvas.getContext("2d");
//32*3 as the bottom is 32*2
const gravity = 20;
const drag = 0.9;
class Map
{
    constructor(width,height)
    {
        this.tiles = [range_array(width),range_array(height)];
        this.assets = [];
    }
    add_asset(asset)
    {
        this.assets.push(asset);
    }
    stroke_assets()
    {
        this.assets.forEach(asset => asset.draw());
    }
    stroke_lines()
    {

       // console.log(this.width,this.height);
        for(let x = 0;x < this.width;x++){
            //console.log(x);
            for(let y = 0; y <this.height;y++){
                //console.log(x,y,y*tile_size,tile_size,tile_size);
                this.tiles.push[x,y];
                ctx.rect(x*tile_size,y*tile_size,tile_size,tile_size);
                ctx.font = "10px bold arial";
                ctx.strokeText(`${x},${y-1}`,x*tile_size+8,y*tile_size-8);
                ctx.stroke();
            }
        }
    }
    get width()
    {
        return this.tiles[0].length;
    }
    get height()
    {
        return this.tiles[1].length;
    }
    preload()
    {
        //prepare bottom
        this.add_asset(new Rectangle('bottom',0,this.height-2,this.width,2));
        this.add_asset(new Player('player',0,this.height-3,1,1));
        
        
        let player = this.assets[1];

        player.set_color('red');
        player.velocity.add([10,0]);
    }
}

class Asset {
    constructor(name, x, y, width, height)
    {
        this.name   =   name;
        this.position = new Vector(x,y);
        this.velocity = new Vector(0,0);
        this.width  =   width;
        this.height =   height;
        this.on_map =   false;
        this.color  =   'black';
        this.gravity =  gravity;
        this.on_ground = true;
        this.degree = 0;
    }
    set_color(color)
    {
        this.color = color;
    }
    get x()
    {
        return this.position.get_position()[0];
    }
    get y()
    {
        return this.position.get_position()[1];
    }
}
class Rectangle extends Asset {
    draw()
    {
        ctx.fillStyle = this.color;
        
        if(this.on_ground == false)
        {
            
            this.degree += 10;

            let x1 = this.width/2 * Math.cos(this.degree);
            let y1 = this.width/2 * Math.sin(this.degree);

            let x2 = (this.width/2+tile_size)* Math.cos(this.degree);
            let y2 = (this.width/2) * Math.sin(this.degree);

            let x3 = (this.width/2+tile_size) * Math.cos(this.degree);
            let y3 = (this.width/2+tile_size) * Math.sin(this.degree);

            let x4 = (this.width/2) * Math.cos(this.degree);
            let y4 = (this.width/2+tile_size) * Math.sin(this.degree);
            let rect = new Path2D();
            rect.moveTo(this.position.x*tile_size +x1 ,this.position.y*tile_size + y1);
            rect.lineTo(this.position.x*tile_size +x2 ,this.position.y*tile_size + y2);
            rect.lineTo(this.position.x*tile_size +x3 ,this.position.y*tile_size + y3);
            rect.lineTo(this.position.x*tile_size +x4 ,this.position.y*tile_size + y4);

        
            rect.closePath();
            ctx.fill(rect)
            ctx.stroke();
           
        }else
        {
            ctx.fillRect(this.position.x*tile_size,this.position.y*tile_size,this.width*tile_size,this.height*tile_size);
        }
        
       
        
        ctx.stroke();
        this.on_map = true;
    }
}
class Player extends Rectangle
{
    move(dt)
    {

        //y addition velocity
        this.velocity.add([0,(gravity*dt)]);
        //console.log(this.velocity);

            
        this.position.add(
            [this.velocity.x * dt,
            this.velocity.y *dt]
        )
        if(this.position.y > 13)
        {
            this.on_ground = true;
            this.position.y = 13;
            this.degree = 0;
            //console.log("collision")
        }else
        {
            this.on_ground = false;
        }
        this.draw(dt);
    }
    jump()
    {
        if(this.on_ground == true)
        {
            this.jump_height = 6;
            this.velocity.y = -this.jump_height;
            this.velocity.y = Math.round(this.velocity.y);
            //console.log(this.velocity);
        }
       
    }
}

const map = new Map(map_width,map_height,32);
map.preload();
//map.stroke_lines();
map.stroke_assets();



var last_time = 0;

start();

function mainloop(time)
{
    game = undefined;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    map.stroke_assets();
    if(last_time!= 0)
    {   
        var dt = (time - last_time)/1000;
        let player = map.assets[1];
        //console.log(dt,time,last_time);
        player.move(dt);
    }



    //console.log(dt);
    last_time = time;

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
/*

function debug()
{
    const map = new Map(map_width,map_height,32);
    map.preload();
    console.log(map)

    map.stroke_lines();
    //player.dy = -20;
    
    map.stroke_assets();
    let player = map.assets[1];
    for(let i = 0;i<10;i++)
    {
        player.move();
    }
    //console.log(map.width,map.height)
}
*/

//player input
document.body.onkeydown = (e) => {
    //console.log(e);
    if(e.keyCode == 32){

            map.assets[1].jump();
    }
    if(e.keyCode == 27)
    {
        stop();
    }
    if(e.keyCode == 84)
    {
        debug();
    }
};


// helper functions
function range_array(max) {
    let result = []
    for(let i = 0; i<max;i++)
    {
        result.push(i);
    }
    return result;
}



