;
"use strict";
//classes.js

const sqrt = Math.sqrt;
const pow = Math.pow;


class Vector {
    constructor(x=0,y=0)
    {
        this.matrix = [x,y];
    }
    add([x,y])
    //x,y for vector to add
    {
        this.matrix[0]+=x;
        this.matrix[1]+=y;
    }
    subtract([x,y])
    {
        this.matrix[0]-=x;
        this.matrix[1]-=y;
    }
    vector()
    {
        //console.log(this.matrix)
        return this.matrix;
    }
    get x(){
        return this.matrix[0]
    }
    get y()
    {
        return this.matrix[1];
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
const gravity = 40;
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

        this.add_asset(new Rectangle('1',5,13,1,1));
        this.add_asset(new Rectangle('2',7,12,1,1));
        this.add_asset(new Rectangle('3',9,11,1,1));
        this.assets[2].set_color('green')
        
        this.player = this.assets[1];

        this.player.set_color('red');
        this.player.velocity.add([5,0]);
        this.player.alive = true;
    }
    play(dt)
    {
        //console.log(this.assets[0])
        if(this.player.alive)
        {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            map.stroke_assets();
            //console.log(dt,time,last_time);
            this.player.move(dt);
            this.assets.forEach(asset => {
                if(this.player != asset)
                {
                    if(in_proximity(this.player,asset))
                    {   
                        //console.log("in proxmity")
                        if(collision_bottom(this.player,asset))
                        {
                            //console.log("collision")
                            this.player.on_ground = true;
                            this.player.position.vector()[1] = asset.position.vector()[1]-this.player.height;
                            this.player.degree = 0;
                        }
                        else if(collision_right(this.player,asset))
                        {
                            //this.player.alive = false;
                        }
                        else
                        {
                            this.player.on_ground = false;
                        }
                    }
                }
                
            })
            this.player.draw(dt);
        }
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
        return this.position.x;
    }
    get y()
    {
        return this.position.y;
    }
}
class Rectangle extends Asset {
    draw(dt)
    {
        let degree = Math.PI/180;
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.position.x*tile_size,this.position.y*tile_size);

        ctx.translate(this.width*tile_size/2,this.height*tile_size/2);


        let time = dt //elapsed time since last frame
        if(this.on_ground == false)
        {
            //console.log("drehen")
            this.degree += (dt) ? time*0.09833333333*1000*2 : 0;
            ctx.rotate(this.degree*degree);
        }
        
        ctx.fillRect(-this.width*tile_size/2,-this.height*tile_size/2,this.width*tile_size,this.height*tile_size);
        ctx.stroke();
        ctx.restore();
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

        //colision detection bruda
        /* 
        if(this.position.y > 13)
        {
            this.on_ground = true;
            this.position.vector()[1] = 13;
            this.degree = 0;
            //console.log("collision")
        }else
        {
            this.on_ground = false;
        }
*/

        /*ablauf 

        move -> collision -> draw

        */
        //this.draw(dt);
        //console.log(this.velocity);
    }
    jump()
    {
        if(this.on_ground == true)
        {
            this.jump_height = 10;
            this.velocity.vector()[1] = -this.jump_height;
            this.velocity.vector()[1] = Math.round(this.velocity.y);
            console.log(this.velocity);
        }
       
    }
}

const map = new Map(map_width,map_height,32);
map.preload();
//map.stroke_lines();
//map.stroke_assets();



var last_time = 0;

start();

function mainloop(time)
{
    game = undefined;
    if(last_time!= 0)
    {   
        var dt = (time - last_time)/1000;
        map.play(dt);
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
function in_proximity(asset1,asset2)
    {
        //http://cgp.wikidot.com/circle-to-circle-collision-detection
        //check if assets are in proximity
        let a;
        let x;
        let y;

        p1x = asset1.x+asset1.width/2;
        p1y = asset1.y+asset1.height/2;
        r1 = sqrt(pow(asset1.height,2)+pow(asset1.width,2))/2;
        //console.log(asset2.width,asset2.height)
        ctx.moveTo(p1x*tile_size,p1y*tile_size);
        ctx.beginPath()
        ctx.arc(p1x*tile_size,p1y*tile_size,r1*tile_size,0,2*Math.PI);
        ctx.closePath();
        p2x = asset2.x+asset2.width/2;
        p2y = asset2.y+asset2.height/2;
        //console.log(p2x*32,p2y*32);
        r2 = sqrt(pow(asset2.height,2)+pow(asset2.width,2))/2;
        ctx.beginPath()
        ctx.moveTo(p2x*tile_size,p2y*tile_size);
        ctx.arc(p2x*tile_size,p2y*tile_size,r2*tile_size,0,2*Math.PI);
        ctx.closePath();

        a = r1+r2;

        x = p1x-p2x;
        y = p1y-p2y;

        //console.log(r1,r2,a)
        if (a > sqrt((x * x) + (y * y))) {
            return true;
          } else {
            return false;
          }
        

    }
function collision_bottom(asset1,asset2)
{
    
    let y1 = asset1.y;
    let y2 = asset1.y+asset1.height;
    let y3 = asset2.y;
   
    if(
        (y1<y3)
        &&
        (y2>y3)
    )
    {
        if(asset2.name == '1')
        {
            console.log("hit")
        }
        //console.log("hit")
        //asset1 hits left side of asset2
        return true;
    }else
    {
        return false;
    }
    //console.log(asset1.y,asset1.height,asset1.y+asset1.height,asset2.y)
  
}
function collision_right(asset1,asset2)
{
    let x1 = asset1.x;
    let x2 = asset1.x+asset1.width;
    let x3 = asset2.x;

    let y1 = asset1.y;
    let y2 = asset1.y+asset1.height;
    let y3 = asset2.y;

    if(
        (x1<x3)
        &&
        (x2>x3)
        &&
        (!collision_bottom(asset1,asset2))
    )
    {
        console.log("hit")
        //asset1 hits left side of asset2
        return true;
    }else
    {
        return false;
    }
}