//player input
//on keydown
document.body.onkeydown = (e) => {
    //space, or arrowup
    console.log(e)
    if(e.keyCode == 32 || e.keyCode == 38 && game.state == 1){

            game.map.player.jump_pressed = true;
    }
    if(e.keyCode == 84)
    {
        debug();
    }
    if(e.keyCode == 82 && outputbox.display == false)
    {
        start_game(game);
    }
};
//key up
document.body.onkeyup = (e) => {
    //console.log(e);
    if(e.keyCode == 32 || e.keyCode == 38 && game.state == 1){

            game.map.player.jump_pressed = false;
    }
};
//mouse or screen press

document.getElementById('jump-button').onmousedown = (e) =>
{
    game.map.player.jump_pressed = true;
}
document.getElementById('jump-button').onmouseup = (e) =>
{
    game.map.player.jump_pressed = false;
}

//main input function

function start_game(_game)
{
    last_time = 0;
    
    game.map.gameover = false;
    game.state = 1;
    game.map.reset_player();
    game.map.reset_audio();
    start();
}
function player_jump(_game,_state)
{
    game.map.player.jump_pressed = _state
}

document.getElementById('output-text').onmousedown = (e) =>
{
    outputbox.display = false;
    control_box.display = false;
    start_game(game);
}