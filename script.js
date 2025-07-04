const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");
const themeSlider = document.getElementById("theme-slider");
const body = document.body;

let currentInput = "";
let resetNext = false;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === "del") {
      currentInput = currentInput.slice(0, -1) || "0";
    } else if (action === "reset") {
      currentInput = "0";
    } else if (action === "equals") {
      try {
        currentInput = eval(currentInput.replace(/x/g, "*"));
      } catch {
        currentInput = "Error";
      }
    } else {
      if (resetNext) {
        currentInput = "";
        resetNext = false;
      }
      currentInput += value;
    }
    screen.textContent = currentInput;
  });
});

themeSlider.addEventListener("input", (e) => {
  const theme = `theme-${e.target.value}`;
  body.className = theme;
});
