const recorder = document.getElementById('recorder');
const player = document.getElementById('player');
const button = document.getElementById("audioAnalysis");
let file;





//Hier werden die Dateien eingelesen. Der User kann nur Audio Dateien einlesen.

recorder.addEventListener('change', (event) => {
  const fileList= event.target.files;
  const objectURL = URL.createObjectURL(fileList[0]);
  localStorage['customSong'] = objectURL;
})

// Die Datei wird in den temporären speicher geladen. 
  button.addEventListener('click', function(e) {
    var audio = new Audio(localStorage['customSong']);
    audio.volume = localStorage['volume']/1000;
    audio.play();
    audioAnalyser();
  });

  function audioAnalyser(){
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = new Audio(localStorage['customSong']);

    const source = audioCtx.createMediaElementSource(audioElement);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    const dataArray = new Uint8Array(bufferLength);
    console.log(dataArray);
    analyser.getByteFrequencyData(dataArray);
    console.log(dataArray);
  }