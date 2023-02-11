//// Script disabled; use for documentation

// Default Values
let countClicks = 0;
let countRebirths = 100;
let rebirthStartAmount = 5;
let multiplerEfffect = 1;

const updateView = function () {
  clickCounter.textContent = countClicks;
  rebirthCounter.textContent = countRebirths;
  rebirthReq.textContent = Math.round(rebirthStartAmount);
};
updateView();

// Functionality
const navigate = function (e) {
  e.preventDefault();
  this.scrollIntoView({ behavior: "smooth" });
};

const configurations = {
  allTxtSize: "Normal",
  borderOn: true,
  showInstruction: true,

  themeSwitcher(txtColor, backgColor, theme) {
    allCont.forEach((cont) => {
      cont.style.color = txtColor;
      cont.style.backgroundColor = backgColor;
    });

    allThemes.forEach((el) => {
      if (el.classList.contains(theme)) el.classList.add("selected");
      else el.classList.remove("selected");
    });
  },
};

const displayClickCounter = function (e) {
  const equation = (countClicks += countRebirths * multiplerEfffect);
  clickCounter.textContent = equation;
};

const displayRebirthCounter = function (e) {
  e.preventDefault();
  if (clickCounter.textContent >= rebirthStartAmount) {
    rebirthStartAmount *= 2.5;
    countClicks = 0;
    countRebirths++;
    updateView();
    clickCounter.scrollIntoView({ behavior: "smooth" });
  }
};

const purchaseItem = function (e) {
  const purchaseConditions = function (
    classHTML,
    clicksReq,
    rebirthReq,
    multiplier
  ) {
    // Adds the purchase message, depletes clicks, and updates the game
    const checkPurchase = function () {
      descPurchase.forEach((btn) => {
        if (btn.classList.contains(classHTML)) {
          if (e.target.classList.contains("mult")) {
            btn.textContent = "Purchased";
            countClicks = countClicks - clicksReq;
            updateView();
          } else {
            countClicks = countClicks - clicksReq;
            updateView();
          }
        }
      });
    };

    // Checks is purchase is valid. If so, will add the multiplier effect/auto clicker. Also will add the checkPurchase function to complete purchase
    if (countClicks >= clicksReq && countRebirths >= rebirthReq) {
      if (e.target.classList.contains("mult")) {
        multiplerEfffect = multiplier;
        checkPurchase(classHTML);
      }

      if (e.target.classList.contains("auto")) {
        let timer;
        timer = setInterval(() => {
          displayClickCounter();
        }, 1000);

        checkPurchase(classHTML);
      }
    }
  };

  // Puts everything onto the target
  if (e.target.classList.contains("x2")) purchaseConditions("x2", 2000, 20, 2);
  if (e.target.classList.contains("x4")) purchaseConditions("x4", 5000, 30, 4);

  if (e.target.classList.contains("auto")) {
    purchaseConditions("auto", 1000, 1, 1);
  }
};

// Outputs
btnClick.addEventListener("click", displayClickCounter);
btnRebirth.addEventListener("click", displayRebirthCounter);
btnShop.addEventListener("click", navigate.bind(startingShop));
btnMultiplerTwo.addEventListener("click", purchaseItem);
btnMultiplerFour.addEventListener("click", purchaseItem);
btnAuto.addEventListener("click", purchaseItem);
btnSettings.addEventListener("click", navigate.bind(startingSettings));

btnHider.addEventListener(
  "click",
  () => document.querySelector(".instruction").remove(),
  (configurations.showInstruction = false)
);

btnLightTheme.addEventListener("click", () =>
  configurations.themeSwitcher("rgb(26, 25, 25)", "rgb(230, 230, 230)", "light")
);

btnDarkTheme.addEventListener("click", () =>
  configurations.themeSwitcher("white", "rgb(26, 25, 25)", "dark")
);
