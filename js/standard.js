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
//localStorage["initialization"] = 'false';

function initialize() {
    if(localStorage["initialization"] != 'true'){
    localStorage['primary-color'] = '#0000FF';
    localStorage['secondary-color'] = '#FF0000';
    localStorage['background-color'] = '#000000';
    localStorage['invertedbackground'] = '#FFFFFF';
    localStorage['volume'] = '50';    
    localStorage['customSong'] = '';
    localStorage["MapId"] = 1;
    localStorage.setItem("customMaps", JSON.stringify([]));
    localStorage['initialization'] = 'true'; 
    }
document.documentElement.style.setProperty('--primary-color', localStorage['primary-color']);
document.documentElement.style.setProperty('--secondary-color', localStorage['secondary-color']);
document.documentElement.style.setProperty('--background-color', localStorage['background-color']);
document.documentElement.style.setProperty('--invertedbackground', localStorage['invertedbackground']);
}

//document.documentElement.style.setProperty('--primary-color', 'green');
//document.documentElement.style.setProperty('--secondary-color', invertColor(colorValue.toString()));