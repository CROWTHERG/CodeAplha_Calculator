const screen = document.getElementById("screen");
const preview = document.getElementById("result-preview");
const buttons = document.querySelectorAll(".btn");
const themeSlider = document.getElementById("theme-slider");
const body = document.body;

let currentInput = "0";

// ✅ Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("calculatorTheme");
  if (savedTheme) {
    body.className = savedTheme;
    themeSlider.value = savedTheme.split("-")[1];
  }
  updateScreen();
});

// ✅ Handle button clicks
buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleInput(btn.dataset.value, btn.dataset.action));
});

function handleInput(value, action) {
  if (action === "del") {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
  } else if (action === "reset") {
    currentInput = "0";
  } else if (action === "equals") {
    calculate();
    return;
  } else if (value) {
    if (currentInput === "0" || currentInput === "Error") currentInput = "";
    currentInput += value;
  }
  updateScreen();
}

function updateScreen() {
  // Show “×” instead of “*” for display
  screen.textContent = currentInput.replace(/\*/g, "×");
  showPreview();
}

// ✅ Real-time preview
function showPreview() {
  try {
    const sanitized = currentInput.replace(/x/g, "*").replace(/×/g, "*");
    if (/[\d)][+\-*/.]+[\d(]/.test(sanitized)) {
      const result = eval(sanitized);
      preview.textContent = !isNaN(result) ? `= ${result}` : "";
    } else {
      preview.textContent = "";
    }
  } catch {
    preview.textContent = "";
  }
}

// ✅ Calculate safely
function calculate() {
  try {
    const result = eval(currentInput.replace(/x/g, "*").replace(/×/g, "*"));
    currentInput = result.toString();
  } catch {
    currentInput = "Error";
  }
  updateScreen();
}

// ✅ Keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || "+-*/.".includes(e.key)) handleInput(e.key);
  else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    handleInput(null, "equals");
  } else if (e.key === "Backspace") handleInput(null, "del");
  else if (e.key.toLowerCase() === "c" || e.key === "Escape") handleInput(null, "reset");
});

// ✅ Save theme
themeSlider.addEventListener("input", (e) => {
  const theme = `theme-${e.target.value}`;
  body.className = theme;
  localStorage.setItem("calculatorTheme", theme);
});

// ✅ Button animation
buttons.forEach((btn) => {
  btn.addEventListener("mousedown", () => btn.classList.add("pressed"));
  btn.addEventListener("mouseup", () => btn.classList.remove("pressed"));
  btn.addEventListener("mouseleave", () => btn.classList.remove("pressed"));
});
