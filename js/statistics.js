const attempts = document.getElementById('attempts');
const jumps = document.getElementById('jumps');
const timeSpend = document.getElementById('timeSpend');
const distance_traveled = document.getElementById('distance_traveled');

let attempts = 0;
attempts += JSON.parse(localStorage.customMaps).forEach(map =>  {return map.attempts});


let timeSpendMinutes = parseInt((parseInt(localStorage['overAllDistanceTraveled'])/6.25)/60);
attempts.innerHTML = "Versuche: " + attempts;
jumps.innerHTML ="Sprünge: " + localStorage['overAllJumps'];
timeSpend.innerHTML ="Spielzeit: " + timeSpendMinutes + " Minuten";
distance_traveled.innerHTML="Blöcke gelaufen: " + parseInt(localStorage['overAllDistanceTraveled']);

