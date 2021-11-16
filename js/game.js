;
"use strict";
//classes.js

const sqrt = Math.sqrt;
const pow = Math.pow;



const gravity = 40;
const drag = 0.9;


class Vector {
    constructor(x=0,y=0)
    {
        this.matrix = [x,y];
    }
    add(_vector)
    //x,y for vector to add
    {
        return new Vector(this.matrix[0]+_vector.x,this.matrix[1]+_vector.y);
    }
    subtract(_vector)
    {
        return new Vector(this.matrix[0]-_vector.x,this.matrix[1]-_vector.y);
    }
    set x(_x)
    {
        this.matrix = [_x,this.y];
    }
    set y(_y)
    {
        this.matrix = [this.x,_y];
    }
    get x(){
        return this.matrix[0];
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
map_width = 30;
console.log(`hoehe:${map_height},breite:${map_width}`)

var canvas = document.getElementById('canvas');

//32 as the basis for a tile
canvas.height = `${window_height*(32)-(margin_height*tile_size)}`;
canvas.width = `${window_width*(32)-(margin_width*tile_size)}`;


var ctx = canvas.getContext("2d");
//32*3 as the bottom is 32*2

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
    stroke_assets(dt)
    {
        this.assets.forEach(asset => asset.draw(dt));
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
        this.add_asset(new Rectangle('2',9,12,1,1));
        this.add_asset(new Rectangle('3',13,11,1,1));

        this.assets[2].set_color('green')
        
        this.player = this.assets[1];

        this.player.set_color('red');
        this.player.velocity = new Vector(6,0);

        this.player.alive = true;
    }
    play(dt)
    {
        
       if(this.player.alive)
       {
            this.player.move(dt);
            let collision_any_asset = false;

            this.assets.forEach(asset => {
                if(this.player != asset)
                {
                    if(in_proximity(this.player,asset))
                    {   
                    
                        let collision_with_asset = collision(this.player,asset);

                        if(collision_with_asset)
                        {

                            this.player.set_color("blue")
                            collision_any_asset = true;

                        }
                    }
                }

            })

            if(!collision_any_asset)
            {
                this.player.set_color("red")
                this.player.on_ground = false;
            }
       }
        
        


        

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //console.log(dt);
        map.stroke_assets(dt);
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
        
        if(this.on_ground == false && this.alive)
        {
            this.degree += (dt) ? dt*180/.9833333333 : 0;
        }else
        {
            this.degree = Math.round(this.degree/90)*90;
        }

        ctx.rotate(this.degree*degree);
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
        this.velocity = this.velocity.add(new Vector(0,(gravity*dt)));
        //console.log(this.velocity);
        //console.log(this.velocity);

            
        this.position = this.position.add(
            new Vector(this.velocity.x * dt,
            this.velocity.y *dt)
        );
    }
    jump()
    {
        if(this.on_ground == true)
        {
            this.jump_velocity = 11;
            this.velocity.y = -this.jump_velocity;

        }
       
    }
}

const map = new Map(map_width,map_height,32);
map.preload();




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
        
        p2x = asset2.x+asset2.width/2;
        p2y = asset2.y+asset2.height/2;
        //console.log(p2x*32,p2y*32);
        r2 = sqrt(pow(asset2.height,2)+pow(asset2.width,2))/2;
        
        
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
function collision(player,asset)
{
    //check if collision exits
    //check for flickering
    
    //min max x-achse
    
   

    let player_x_min = player.position.x;
    let player_x_max = player.position.x+player.width;

    let player_y_min = player.position.y;
    let player_y_max = player.position.y+player.height;

    let asset_x_min = asset.position.x;
    let asset_x_max = asset.position.x+asset.width;

    //y min
    let asset_y_min = asset.position.y;
    let asset_y_max = asset.position.y+asset.height;


    

    let col_top, col_right,col_bottom;
    col_top  = col_right = col_bottom = false;



    //check for collision
    if(
        !(player_x_min<asset_x_max
        &&
        player_x_max>asset_x_min
        && player_y_min<asset_y_max
        &&
        player_y_max>asset_y_min)
    )
    {
        return false;
    }


    //handle collision

    let d_right = player_x_max-asset_x_min;

    let d_bottom = (player_y_max-asset_y_min)*.8;

    let  d_left = asset_x_max-player_x_min;

    let  d_top = asset_y_max-player_y_min*.8;


    let directions = [d_right,d_left,d_top,d_bottom];
    let lowest_value = Math.min(d_right,d_top,d_left,d_bottom);
    

    switch(directions.indexOf(lowest_value))
    {
        //fallthrough

        case 0:
            col_right = true;
        ; 
        
        case 2:
            col_top = true;    
        ;
        
        case 3:
            col_bottom = true;


    }



    //console.log(col_right)
    if(col_right || col_top)
    {
        console.log("beaifn q")
        player.alive = false;
        return true;
        
    }
    if(col_bottom)
    {
        
        player.on_ground = true;
        player.position.y = asset.position.y-player.height;
        player.velocity.y = 0;
        
        return true;
    }
   
    return false;   
}

function drawTo(ctx,vec1,vec2)
{
    let temp_style = ctx.strokeStyle;
    let line_width = ctx.lineWidth
    ctx.lineWidth  = 5;
    ctx.strokeStyle = "green";
    ctx.beginPath();
    //console.log(vec1.x,vec2.x)
    ctx.moveTo(vec1.x*tile_size,vec1.y*tile_size);
    ctx.lineTo(vec2.x*tile_size,vec2.y*tile_size);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = temp_style;
    ctx.lineWidth  = line_width;

}