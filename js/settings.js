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

