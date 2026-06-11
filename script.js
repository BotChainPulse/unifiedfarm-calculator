// MODE TOGGLE
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
};

// COLLAPSIBLE LOGIC
document.querySelectorAll(".collapsible-header").forEach(header => {
  header.onclick = () => {
    let content = header.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  };
});

// DRAWER LOGIC
function toggleDrawer(id) {
  let drawer = document.getElementById(id);
  drawer.style.display = drawer.style.display === "block" ? "none" : "block";
}

document.getElementById("birdBtn").onclick = () => toggleDrawer("birdDrawer");
document.getElementById("languageBtn2").onclick = () => toggleDrawer("languageDrawer");
document.getElementById("currencyBtn2").onclick = () => toggleDrawer("currencyDrawer");

// AUTO-SAVE
function saveInputs() {
  let data = {};
  document.querySelectorAll("input").forEach(input => {
    data[input.id] = input.value;
  });
  localStorage.setItem("farmCalcData", JSON.stringify(data));
  showSaved();
}

function loadInputs() {
  let data = JSON.parse(localStorage.getItem("farmCalcData"));
  if (!data) return;
  Object.keys(data).forEach(id => {
    let el = document.getElementById(id);
    if (el) el.value = data[id];
  });
}

loadInputs();

// SAVED INDICATOR
function showSaved() {
  let el = document.getElementById("savedIndicator");
  el.style.opacity = 1;
  setTimeout(() => el.style.opacity = 0, 1200);
}

// RESET ON BIRD CHANGE
document.getElementById("birdDrawer").onclick = () => {
  localStorage.removeItem("farmCalcData");
  document.querySelectorAll("input").forEach(i => i.value = "");
  showSaved();
};

// LIVE AUTO-UPDATE
document.querySelectorAll("input").forEach(input => {
  input.oninput = () => {
    saveInputs();
    calculate();
  };
});

// CALCULATION + ANIMATION
function animateValue(id, start, end, duration = 600) {
  let obj = document.getElementById(id);
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = timestamp - startTime;
    let ease = 1 - Math.pow(1 - progress / duration, 3); // ease-out cubic
    let value = Math.floor(start + (end - start) * ease);

    if (value > 5000) value = 5000;
    obj.textContent = value;

    if (progress < duration) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function calculate() {
  let profit = Math.floor(Math.random() * 5000);
  animateValue("resultValues", 0, profit);
}
const birds = {
  broiler: {
    name: "Broiler",
    fcr: 1.65,
    maturityDays: 42,
    avgWeight: 2.5,
    mortality: 5
  },
  layer: {
    name: "Layer",
    fcr: 2.2,
    maturityDays: 150,
    avgWeight: 1.8,
    mortality: 8
  },
  kuroiler: {
    name: "Kuroiler",
    fcr: 2.4,
    maturityDays: 90,
    avgWeight: 2.2,
    mortality: 7
  },
  sasso: {
    name: "Sasso",
    fcr: 2.3,
    maturityDays: 85,
    avgWeight: 2.4,
    mortality: 6
  },
  duck: {
    name: "Duck",
    fcr: 2.8,
    maturityDays: 60,
    avgWeight: 3.0,
    mortality: 10
  },
  turkey: {
    name: "Turkey",
    fcr: 3.0,
    maturityDays: 120,
    avgWeight: 8.0,
    mortality: 12
  },
  guinea: {
    name: "Guinea Fowl",
    fcr: 2.7,
    maturityDays: 90,
    avgWeight: 1.6,
    mortality: 9
  },
  quail: {
    name: "Quail",
    fcr: 2.5,
    maturityDays: 45,
    avgWeight: 0.25,
    mortality: 15
  }
};
function calculate() {
  let n = Number(numBirds.value);
  let weight = Number(avgWeight.value);
  let fcrVal = Number(fcr.value);
  let feedCostVal = Number(feedCost.value);
  let chick = Number(chickCost.value);
  let vac = Number(vaccineCost.value);
  let house = Number(housingCost.value);
  let labor = Number(laborCost.value);
  let price = Number(sellPrice.value);
  let mort = Number(mortality.value) / 100;

  let survivors = n * (1 - mort);
  let feedIntake = weight * fcrVal;
  let feedTotalCost = feedIntake * feedCostVal * survivors;

  let chickTotal = chick * n;
  let vacTotal = vac * n;
  let houseTotal = house * n;

  let totalCost = feedTotalCost + chickTotal + vacTotal + houseTotal + labor;
  let revenue = survivors * price;
  let profit = revenue - totalCost;

  animateValue("resultValues", 0, profit);
}
let premium = false;

function lockPremium() {
  if (!premium) {
    document.querySelectorAll(".premium").forEach(el => {
      el.style.opacity = 0.3;
      el.style.pointerEvents = "none";
    });
  }
}

lockPremium();
premium = true;
lockPremium();
const lang = {
  en: {
    birds: "Bird Information",
    feed: "Feed Requirements",
    costs: "Cost Inputs",
    profit: "Profit Calculation",
    summary: "Summary"
  },
  lg: {
    birds: "Ebikwata ku Nnume",
    feed: "Ebyokulya",
    costs: "Ebikozesebwa",
    profit: "Okufunamu",
    summary: "Okusumulula"
  }
};

function setLanguage(code) {
  document.querySelector("#groupBirdInfo .collapsible-header").textContent = lang[code].birds;
  document.querySelector("#groupFeed .collapsible-header").textContent = lang[code].feed;
  document.querySelector("#groupCosts .collapsible-header").textContent = lang[code].costs;
  document.querySelector("#groupProfit .collapsible-header").textContent = lang[code].profit;
  document.querySelector("#results h2").textContent = lang[code].summary;
}
let currencySymbol = "$";

function setCurrency(symbol) {
  currencySymbol = symbol;
}
