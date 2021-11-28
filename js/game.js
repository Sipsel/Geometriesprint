;
"use strict";
//inital load
var outputbox = new Output_box(document.getElementById('output'),true);
var control_box = new Output_box(document.getElementById('controls'),true)

outputbox.change_box_text(output_text[0]);

const game = new Game(new Map(ctx,tile_map));

game.map.preload();




function mainloop(time)
{
    game.running = undefined;
    if(last_time!= 0)
    {   
        var dt = (time - last_time)/1000;
        game.map.play(dt);
    }
    //check if game is won
    if(game.map.player.x > game.map.width && game.state !=3)
    {
        game.state = 3;
        outputbox.change_box_text(game.win_message);
        outputbox.display = true;
        game.map.game_won_sound.play();
    }
    //check if game is over
    if(game.map.gameover && game.map.particles.length == 0 && game.state !=4)
    {
        game.state = 4;

        outputbox.change_box_text(game.death_message);
       
        outputbox.display = true;
        control_box.display = true;
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









