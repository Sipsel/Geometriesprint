//player input
//on keydown
document.body.onkeydown = (e) => {
    //space, or arrowup
    if(e.keyCode == 32 || e.keyCode == 38){

            map.player.jump_pressed = true;
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
//key up
document.body.onkeyup = (e) => {
    //console.log(e);
    if(e.keyCode == 32 || e.keyCode == 38){

            map.player.jump_pressed = false;
    }
};
//mouse or screen press
document.body.onmousedown = (e) =>
{
    map.player.jump_pressed = true;
}
document.body.onmouseup = (e) =>
{
    map.player.jump_pressed = false;
}