//constants

//math constants
const sqrt = Math.sqrt;
const pow = Math.pow;

//player movement constants
const gravity = 50;
const player_jump_height = 14.5;
const player_speed = 6.25;
const drag = 1;

var last_time;

//particle functions
const particle_life_time = 40;

var scale_by = 2;

//player settings

const particles_allowed = true;
const audio_volume = parseInt(localStorage.getItem('volume'))/100;

const map_id = Object.fromEntries(new URLSearchParams(window.location.search).entries()).map_id;

const tile_maps = JSON.parse(localStorage['customMaps']);
var tile_map = (tile_maps[map_id])?tile_maps[map_id]:'';



document.getElementById('player_image').src = (localStorage.getItem('texturePack') != 'undefined' && localStorage.getItem('texturePack'))?'data:image/png;base64,' +localStorage.getItem('texturePack'):"./img/player.png";
const player_texture = document.getElementById('player_image');

var user_song;
if(map_id<5){
    user_song = "aud/"+ map_id +".mp3";
}

//canvas settings
var margin_width = 2;
var margin_height = 16;


//scale functions
if(window.screen.availWidth>window.screen.availHeight)
{
    scale_by = 4;
    margin_height = 4;
}
if(window.screen.availWidth<400)
{
    scale_by = 1.5;
}

const tile_size = 16*scale_by;





const window_height = Math.floor(window.screen.availHeight/tile_size);
const window_width = Math.floor(window.screen.availWidth/tile_size);
var screen_height = window_height-margin_height;
var screen_width = window_width-margin_width;

//audio constants
const gameover_sound = "aud/game_over.wav";
const win_sound = "aud/win.wav";




const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

//32 as the basis for a tile
canvas.height = `${screen_height*tile_size}`;
canvas.width = `${screen_width*tile_size}`;

const primary_color = (localStorage.getItem('primary-color')) ? localStorage.getItem('primary-color'): '#00a2ff';
const secondary_color = (localStorage.getItem('secondary-color')) ? localStorage.getItem('secondary-color'): '#00ff9d';

const background_color = (localStorage.getItem('background-color'))? localStorage.getItem('background-color'):'#171717';

//block_types 
const block_types = [
    {
        name:'air',
        id:0
    },
    {
        name:'normal_block',
        id:1,
        degree:180,
    },
    {
        name:'half_block',
        id:2,
        height:0.25,
    },
    {
        name:'normal_obstacle_bottom',
        id:3,
        width:0.25,
        xShift:0.375,
        height:0.9,
        yShift:0.1,
    },
    {
        name:'normal_obstacle_top',
        id:4,
        width : 0.25,
        xShift : 0.375,
        height:0.9,
        degree:180,
    },
]
const output_text = {
    0:
    {
        'title':'Start',
        'text':`Zum Starten laden sie bitte ihren Song für die Karte:<br> ${tile_map.songname} <br><button class="blink" id="game-start-button">hier hoch</button>`
    },
    1:
    {
        'title':'Start',
        'text':'Zum Starten bitte <button class="blink" id="game-start-button">hier</button> drücken'
    },
    2:
    {
        'title':'Gewonnen',
        'text':'Zum Neustarten bitte <button class="blink" id="game-start-button">hier</button> drücken'
    }
    
}
