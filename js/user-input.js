//player input
//on keydown
const back_button = document.getElementById('back-button');

document.body.onkeydown = (e) => {
    //space, or arrowup
    if(e.keyCode == 32 || e.keyCode == 38 && game.state == 1){

            game.map.player.jump_pressed = true;
    }
    if(e.keyCode == 84)
    {
        debug();
    }
    if(e.keyCode == 82 || e.keyCode == 32 && game.state == 4)
    {
        
        outputbox.display = false;
        control_box.display = false;
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
    console.log("pressed")
    game.map.player.jump_pressed = true;
}
document.getElementById('jump-button').onmouseup = (e) =>
{
    game.map.player.jump_pressed = true;
}



//main input function

function start_game(_game)
{

    back_button.style.display = 'none';
        game.map.tile_map.attempts++;
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
    if(user_song != undefined)
    {
        outputbox.display = false;
        control_box.display = false;
        
        if(window.screen.availWidth < 768)
        {
            document.getElementById('input-button-container').style.display = 'grid';
        }
        
        start_game(game);
    }
    else
    {
        document.getElementById('ownSong').click();
    }
    
}

document.getElementById('ownSong').addEventListener('change', (e)=> {
    const fileList= e.target.files;
    customSong = fileList[0];
    const objectURL = URL.createObjectURL(customSong);
    user_song = objectURL;
    outputbox.change_box_text(output_text[1]);
  });

  back_button.addEventListener('click', (e) =>{
      window.location.href ="./index.html";
  })