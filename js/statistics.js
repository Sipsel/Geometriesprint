const attempts = document.getElementById('attempts');
const jumps = document.getElementById('jumps');
const timeSpend = document.getElementById('timeSpend');
const distance_traveled = document.getElementById('distance_traveled');
const distance_per_attempt = document.getElementById('distance_per_attempt');

let attemptsInt = 0;
JSON.parse(localStorage.customMaps).forEach(map =>  {attemptsInt+=map.attempts});

let jumpsInt = 0;
JSON.parse(localStorage.customMaps).forEach(map =>  {jumpsInt+=map.jumps});

let distance_traveledInt = 0;
JSON.parse(localStorage.customMaps).forEach(map =>  {distance_traveledInt+=map.distance_traveled});

let timeSpendMinutes = (distance_traveledInt/6.25)/60;
let timeSpendSeconds = (timeSpendMinutes - parseInt(timeSpendMinutes))*60;
attempts.innerHTML = "Attempts: " + attemptsInt;
jumps.innerHTML ="Jumps: " + jumpsInt;
timeSpend.innerHTML ="Gametime: " + parseInt(timeSpendMinutes) + " minutes and " + timeSpendSeconds.toFixed(2) + " seconds";
distance_traveled.innerHTML="Blocks traveled: " + distance_traveledInt;
distance_per_attempt.innerHTML = "Blocks per attempt: " + (distance_traveledInt/attemptsInt).toFixed(2);
