function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(2); 
    color = parseInt(color, 16); 
    color = 0xFFFFFF ^ color; 
    color = color.toString(16); 
    color = ("000000" + color).slice(-6); 
    color = "#" + color; 
    return color;
}

window.addEventListener("load", initialize, false);

function flushLocalstorage(){
localStorage.clear();
initialize()
}




function initialize() {
    if(localStorage["initialization"] != 'true'){
    localStorage['primary-color'] = '#001EFF';
    localStorage['secondary-color'] = '#FFDD00';
    localStorage['background-color'] = '#171717';
    localStorage['invertedbackground'] = '#FFFFFF';
    localStorage['volume'] = '50';    
    localStorage['customSong'] = '';
    localStorage["MapId"] = 6;
    var normalMaps = new Array(1);
    normalMaps[0] = map0;
    normalMaps[1] = map1;
    normalMaps[2] = map2;
    normalMaps[3] = map3;
    normalMaps[4] = map4;
    localStorage.setItem("customMaps", "");
    localStorage.setItem("customMaps", JSON.stringify(normalMaps));
    localStorage['initialization'] = 'true'; 
    localStorage['texturePack'] = "";
    localStorage.setItem('particleState', 2);
    }
document.documentElement.style.setProperty('--primary-color', localStorage['primary-color']);
document.documentElement.style.setProperty('--secondary-color', localStorage['secondary-color']);
document.documentElement.style.setProperty('--background-color', localStorage['background-color']);
document.documentElement.style.setProperty('--invertedbackground', localStorage['invertedbackground']);
}
