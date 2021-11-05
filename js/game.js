;
"use strict";
//classes.js
let sin = Math.sin;
let cos = Math.cos;
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
//https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
class RotationMatrix
{
    constructor(degree)
    {
        let deg = -degree*Math.PI/180;
        //https://en.wikipedia.org/wiki/Rotation_matrix#Non-standard_orientation_of_the_coordinate_system
        this.matrix = [
            [parseFloat(cos(deg).toFixed(6)),parseFloat(-sin(deg).toFixed(6))],
            [parseFloat(sin(deg).toFixed(6)),parseFloat(cos(deg).toFixed(6))]
        ];
    }
    multvector([x,y])
    {
        return new Vector(
            x*this.matrix[0][0]+y*this.matrix[1][0],
            x*this.matrix[0][1]+y*this.matrix[1][1]
            );
    }
    change_rotation_vector(degree)
    {
        let deg = -degree*Math.PI/180;
        this.matrix = [
            [cos(deg).toFixed(6),-sin(deg).toFixed(6)],
            [sin(deg).toFixed(6),cos(deg).toFixed(6)]
        ];
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
        player.velocity.add([0,0]);
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
    draw(dt)
    {
        ctx.fillStyle = this.color;
        if(this.on_ground == false)
        {
            this.degree+= (dt) ? dt*1000*0.09833*2 : 0;
            draw_rectangle(ctx,this.position.x*tile_size,this.position.y*tile_size,this.width*tile_size,this.height*tile_size,this.degree);
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
            this.position.vector()[1] = 13;
            this.degree = 0;
            //console.log("collision")
        }else
        {
            this.on_ground = false;
        }
        this.draw(dt);
        //console.log(this.velocity);
    }
    jump()
    {
        if(this.on_ground == true)
        {
            this.jump_height = 8;
            this.velocity.vector()[1] = -this.jump_height;
            this.velocity.vector()[1] = Math.round(this.velocity.y);
            console.log(this.velocity);
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

function draw_rectangle(ctx,x,y,w,h,rotation)
{
    //https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions
    /*if(rotation>=180)
    {
        rotation = rotation % 180;
    }*/
    
    let sv = new Vector(x,y);
    let av = new Vector(w,0);
    let ah = new Vector(0,h);

    let path = new Path2D();
    let rotationmatrix = new RotationMatrix(rotation);





    //move to top left corner
    
    //adds vertical vector to move to top right corner
    sv.add(rotationmatrix.multvector(av.vector()).vector());
    //draws line to right corner
    path.lineTo(sv.x,sv.y);
   


    //move to top right corner
   
    //adds horizontal vector to move to bottom right
    sv.add(rotationmatrix.multvector(ah.vector()).vector());
    //draws line to bottom corner
    path.lineTo(sv.x,sv.y);


    //rotate rotation matrix by 180 degrees
    rotationmatrix.change_rotation_vector(rotation+180);
    
    
   
    sv.add(rotationmatrix.multvector(av.vector()).vector());
    path.lineTo(sv.x,sv.y);
 
    //path.moveTo(sv.x,sv.y);
    sv.add(rotationmatrix.multvector(ah.vector()).vector());
    path.lineTo(sv.x,sv.y);
   

    

    path.closePath();
    ctx.fill(path);
    ctx.stroke(path);  
}