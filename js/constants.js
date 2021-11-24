//constants

//math constants
const sqrt = Math.sqrt;
const pow = Math.pow;

//player movement constants
const gravity = 50;
const player_jump_height = 14.5;
const player_speed = 6.25;
const drag = 1;

//particle functions
const particle_life_time = 700;

//scale functions
const scale_by = 4;
const tile_size = 16*scale_by;



const window_height = Math.floor(window.screen.availHeight/tile_size);
const window_width = Math.floor(window.screen.availWidth/tile_size);


const margin_width = 4;
const margin_height = 4;



var screen_height = window_height-margin_height;
var screen_width = window_width-margin_width;

map_height = 16;
map_width = 64;


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

//32 as the basis for a tile
canvas.height = `${screen_height*tile_size}`;
canvas.width = `${screen_width*tile_size}`;

const primary_color = 'black';
const secondary_color = "#00FF9D";
const background_color = "blue";



const block_types = [
    {
        name:'air',
        id:0
    },
    {
        name:'normal_block',
        id:1
    },
    {
        name:'half_block',
        id:7,
        height:0.25
    },
    {
        name:'normal_obstacle_bottom',
        id:2,
        width:0.25,
        xShift:0.375,
        height:0.9,
        yShift:0.1,
    },
    {
        name:'normal_obstacle_top',
        id:6,
        width : 0.25,
        xShift : 0.375,
        height:0.9,
        degree:180,
    },
]
