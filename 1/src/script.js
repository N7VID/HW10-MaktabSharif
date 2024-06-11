const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".option-container");

const options = document.querySelectorAll(".option");
const switchBtn = document.getElementById("Switch");
const switchCir = document.getElementById("circle");
selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

options.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = option.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

switchBtn.addEventListener("click", () => {
  switchCir.classList.toggle("translate-x-11");
});
