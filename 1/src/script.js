const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".option-container");

const options = document.querySelectorAll(".option");
selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

options.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = option.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});
