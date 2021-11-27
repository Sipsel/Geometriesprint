;
"use strict";
//classes



//32*3 as the bottom is 32*2




const map = new Map(ctx,tile_map);
const game = new Game();
const camera = new Camera(map,screen_width,screen_height,scale_by);



//game start
var last_time = 0;
map.preload();

//start();



function mainloop(time)
{
    game.running = undefined;
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
    if (!game.running) {
       
        game.running = window.requestAnimationFrame(mainloop);
    }
}

function stop() {
    if (game.running) {
       window.cancelAnimationFrame(game.running);
       game.running = undefined;
    }
}









