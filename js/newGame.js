const maps = JSON.parse(localStorage["customMaps"]);
const prevButton = document.getElementById('prevMap');
const nextButton = document.getElementById('nextMap');
const showSongName= document.getElementById('mapName');
const showMapProgress = document.getElementById('mapProgress');
const showMapAttempts = document.getElementById('mapAttempts');
const showMapTime = document.getElementById('mapTime');
const showMapID = document.getElementById('mapID');
const new_game = document.getElementById('startGame');


let whichMap = 0;

prevButton.addEventListener('click', function(e){
    if(whichMap > 0){
        whichMap--;
    } else{
        whichMap = maps.length-1;
    }
    showMap();
});

nextButton.addEventListener('click', function(e){
    if(whichMap<maps.length-1){
        whichMap++;
    }else{
        whichMap = 0;
    }
    showMap();
});

new_game.addEventListener('click', (e) =>
{
    new_game.href = `./game.html?map_id=${whichMap}`;
})



function showMap() {
    var name = maps[whichMap].songname;
    if(maps[whichMap].songname.length > 24){
        name = maps[whichMap].songname.substring(0,24) +"...";
    }
    showSongName.innerHTML = name;
    showSongName.setAttribute('data-tooltip',maps[whichMap].songname);
    showMapID.innerHTML = "Map-Id: " + maps[whichMap].id;
    showMapProgress.innerHTML = "Progress: " + maps[whichMap].progress +"%";
    showMapAttempts.innerHTML = "Versuche: " + maps[whichMap].attempts;
    showMapTime.innerHTML = "Map-Länge: " + getTimeString(maps[whichMap].cols);
}


showMap()

function getTimeString(cols){
    let timeInSeconds = cols/6.25;
    if(timeInSeconds <= 60){
        return "Kurz";
    } else if(timeInSeconds >60 && timeInSeconds <= 120){
        return "Mittel";
    } else{
        return "Lang";
    }
}
