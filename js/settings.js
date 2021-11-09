document.querySelector("#volume-slider").value = localStorage['volume'];

const container = document.querySelectorAll(".range-slider");

for (let i = 0; i<container.length; i++) {
    const slider = container[i].querySelector(".slider");
    const thumb = container[i].querySelector(".slider-thumb");
    const tooltip = container[i].querySelector(".tooltip");
    //const tooltipNumber = tooltip.querySelector(".tooltipNumber")
    const progress = container[i].querySelector(".progress");

    function customSlider() {
    const maxVal = slider.getAttribute("max");
    const val = (slider.value / maxVal) * 100 + "%";

    tooltip.innerHTML = slider.value;

    progress.style.width = val;
    thumb.style.left = val;
    
    
}



customSlider();

slider.addEventListener("input", () => {
    customSlider();
});
}

/*
*   Primäre Farbe kann variabel gewählt werden.
*/
var styles = getComputedStyle(document.documentElement);

  var primaryColorPicker;
  var defaultColor = localStorage['primary-color'];
  
  window.addEventListener("load", startup, false);
  
  function startup() {
      primaryColorPicker = document.querySelector("#primary-color-indicator");
      primaryColorPicker.value = defaultColor;
      primaryColorPicker.addEventListener("input", updateFirst, false);
      primaryColorPicker.addEventListener("change", updateAll, false);
      primaryColorPicker.select();
    }
  
    function updateFirst(event) {
        document.documentElement.style.setProperty('--primary-color', event.target.value);
    }
  
    function updateAll(event) {
        document.documentElement.style.setProperty('--primary-color', event.target.value);
    }

/*
*   Sekundäre Farbe kann variabel gewählt werden.
*/

var secondaryColorPicker;
var defaultColorSec = localStorage['secondary-color'];

  window.addEventListener("load", startupSec, false);
  
  function startupSec() {
        secondaryColorPicker = document.querySelector("#secondary-color-indicator");
        secondaryColorPicker.value = defaultColorSec;
        secondaryColorPicker.addEventListener("input", updateFirstSec, false);
        secondaryColorPicker.addEventListener("change", updateAllSec, false);
        secondaryColorPicker.select();
    }
  
    function updateFirstSec(event) {
        document.documentElement.style.setProperty('--secondary-color', event.target.value);
    }
  
    function updateAllSec(event) {
        document.documentElement.style.setProperty('--secondary-color', event.target.value);
    }

/*
*   Hintergrund Farbe kann variabel gewählt werden.
*/

var backgroundColorPicker;
var defaultColorBack = localStorage['background-color'];

  window.addEventListener("load", startupBack, false);
  
  function startupBack() {
        backgroundColorPicker = document.querySelector("#background-color-indicator");
        backgroundColorPicker.value = defaultColorBack;
        backgroundColorPicker.addEventListener("input", updateFirstBack, false);
        backgroundColorPicker.addEventListener("change", updateAllBack, false);
        backgroundColorPicker.select();
    }
  
    function updateFirstBack(event) {
        document.documentElement.style.setProperty('--background-color', event.target.value);
        document.documentElement.style.setProperty('--invertedbackground', invertColor(event.target.value));
    }
  
    function updateAllBack(event) {
        document.documentElement.style.setProperty('--background-color', event.target.value);
        document.documentElement.style.setProperty('--invertedbackground', invertColor(event.target.value));
    }


const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", () => {
    localStorage['primary-color'] = styles.getPropertyValue('--primary-color');
    localStorage['secondary-color'] = styles.getPropertyValue('--secondary-color');
    localStorage['background-color'] = styles.getPropertyValue('--background-color');
    localStorage['invertedbackground'] = styles.getPropertyValue('--invertedbackground');
    localStorage['volume'] = document.querySelector("#volume-slider").value;
});