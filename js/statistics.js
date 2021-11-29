const attempts = document.getElementById('attempts');
const jumps = document.getElementById('jumps');
const timeSpend = document.getElementById('timeSpend');
const distance_traveled = document.getElementById('distance_traveled');

let attemptsInt = 0;
JSON.parse(localStorage.customMaps).forEach(map =>  {attemptsInt+=map.attempts});

let jumpsInt = 0;
JSON.parse(localStorage.customMaps).forEach(map =>  {jumpsInt+=map.jumps});

let distance_traveledInt = 0;
JSON.parse(localStorage.customMaps).forEach(map =>  {distance_traveledInt+=map.distance_traveled});

let timeSpendMinutes = (distance_traveledInt/6.25)/60;
let timeSpendSeconds = (timeSpendMinutes - parseInt(timeSpendMinutes))*60;
attempts.innerHTML = "Versuche: " + attemptsInt;
jumps.innerHTML ="Sprünge: " + jumpsInt;
timeSpend.innerHTML ="Spielzeit: " + parseInt(timeSpendMinutes) + " Minuten und " + timeSpendSeconds.toFixed(2) + " Sekunden";
distance_traveled.innerHTML="Blöcke gelaufen: " + distance_traveledInt;

