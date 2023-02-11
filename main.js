"use strict";

// function load() {
//   for (let i = 0; i <= 100; i += 10) {
//     console.log(`Loading is at ${i}`);
//   }
// }

// console.log("-------------------------");

// async function load2() {
//   for (let i = 0; i <= 100; i += 10) {
//     console.log(`Loading is at ${i}`);
//   }
// }

// load()

// DOM
import {
  title,
  subtitle,
  allCont,
  mainPageCont,
  mainShopCont,
  mainSettingsCont,
  allThemes,
  startingGame,
  startingShop,
  startingSettings,
  btnHider,
  btnClick,
  btnRebirth,
  btnShop,
  btnSettings,
  btnPurhcase,
  btnMultiplerTwo,
  btnMultiplerFour,
  btnAuto,
  btnBackToGame,
  descPurchase,
  btnLightTheme,
  btnDarkTheme,
  clickCounter,
  rebirthCounter,
  rebirthReq,
  inputUsername,
  accCreate,
  gameCont,
  btnLogin,
  loadAcc,
} from "./selector.js";

const [cont] = gameCont;
cont.style.opacity = 0;

class Account {
  constructor() {
    this.username;
    this.password;

    accCreate.addEventListener("click", this._generateAccount.bind(this));
    btnLogin.addEventListener("click", this._loginToAcc.bind(this));
  }

  _generateAccount() {
    this._generateUsername();
    this._generatePassword();
    this._generate2FA();
    console.log(acc);
  }

  _generateUsername() {
    this.username = prompt("Username:");
    // accCreate.insertAdjacentHTML(
    //   "afterend",
    //   `<h2 class="display-info"> Hello, ${prompt("Username:")}! </h2>`
    // );
  }

  _generatePassword() {
    const passDisplay = prompt("Enter a password (must have 8 charecters");
    if (passDisplay.length < 8) alert("Must be 8 charecters!");
    else this.password = passDisplay;

    // usernameDisplay.insertAdjacentHTML("afterend"</h3>`);
  }

  _generate2FA() {
    return Math.trunc(Math.random() * 600_000);
  }

  _loginToAcc() {
    const signInUser = prompt("username:");
    const signInPass = prompt("Password:");

    if (signInUser === this.username && signInPass === this.password) {
      btnLogin.insertAdjacentHTML(
        "afterend",
        `<h2 class="display-info"> Hello, ${this.username}! </h2>`
      );
      loadAcc.classList.remove("hidden");
    }
  }
}

const acc = new Account();

class Game {
  hidden = false;

  constructor() {
    // Default values
    this.countClicks = 0;
    this.countRebirths = 0;
    this.rebirthStartAmount = 5;
    this.multiplerEffect = 1;
    this._updateView();

    // Event listeners
    btnClick.addEventListener("click", this._displayClickCounter.bind(this));
    btnRebirth.addEventListener(
      "click",
      this._displayRebirthCounter.bind(this)
    );

    btnShop.addEventListener("click", this._navigator.bind(startingShop));
    // prettier-ignore
    btnSettings.addEventListener("click", this._navigator.bind(startingSettings));
    btnBackToGame.forEach((btn) =>
      btn.addEventListener("click", this._navigator.bind(startingGame))
    );

    btnLightTheme.addEventListener("click", () =>
      this._themeSwitcher("rgb(26, 25, 25)", "rgb(230, 230, 230)", "light")
    );

    btnDarkTheme.addEventListener("click", () =>
      this._themeSwitcher("white", "rgb(26, 25, 25)", "dark")
    );

    btnMultiplerTwo.addEventListener("click", this._purchaseItem.bind(this));
    btnMultiplerFour.addEventListener("click", this._purchaseItem.bind(this));
    btnAuto.addEventListener("click", this._purchaseItem.bind(this));
    loadAcc.addEventListener("click", this._loadGame.bind(this));
  }

  // Methods

  _loadGame() {
    this.account = acc;
    cont.style.opacity = 100;
    console.log(this.account);
  }

  _updateView() {
    clickCounter.textContent = this.countClicks;
    rebirthCounter.textContent = this.countRebirths;
    rebirthReq.textContent = Math.round(this.rebirthStartAmount);
  }

  _navigator(e) {
    e.preventDefault();
    this.scrollIntoView({ behavior: "smooth" });
  }

  _deleteEl(e) {
    e.remove();
  }

  _themeSwitcher(txtColor, backgColor, theme) {
    allCont.forEach((cont) => {
      cont.style.color = txtColor;
      cont.style.backgroundColor = backgColor;
    });

    allThemes.forEach((el) => {
      if (el.classList.contains(theme)) el.classList.add("selected");
      else el.classList.remove("selected");
    });
  }

  _displayClickCounter() {
    clickCounter.textContent = this.countClicks +=
      this.countRebirths + 1 * this.multiplerEffect;
  }

  _displayRebirthCounter() {
    if (clickCounter.textContent >= this.rebirthStartAmount) {
      this.rebirthStartAmount *= 2.5;
      this.countClicks = 0;
      this.countRebirths++;
      this._updateView();
      clickCounter.scrollIntoView({ behavior: "smooth" });
    }
  }

  _purchaseItem(e) {
    let isAllowed = false;

    const requirements = (clickReq, rebirthReq) => {
      if (clickReq <= this.countClicks && rebirthReq <= this.countRebirths) {
        isAllowed = true;
        this.countClicks -= clickReq;
      } else return;
    };

    const reward = (mult, auto = false) => {
      if (e.target.classList.contains("mult"))
        return (this.multiplerEffect = mult);
      else if (auto === true)
        return setInterval(() => {
          this._displayClickCounter();
        }, 1000);
    };

    const containsCondition = (classX) => {
      descPurchase.forEach((btn) => {
        if (btn.classList.contains(classX) && isAllowed)
          if (btn.classList.contains("auto")) return;
          else btn.textContent = "Purchased";
      });
    };

    // Making it work so you can buy each shop item

    if (e.target.classList.contains("x2")) {
      requirements(2000, 20);
      containsCondition("x2");
      reward(2, false);
      this._updateView();
      console.log(clickingSimulator);
    }

    if (e.target.classList.contains("x4")) {
      requirements(5000, 30);
      containsCondition("x4");
      reward(4, false);
      this._updateView();
      console.log(clickingSimulator);
    }

    if (e.target.classList.contains("auto")) {
      requirements(1000, 0);
      containsCondition("auto");
      reward(1, true);
      this._updateView();
      console.log(clickingSimulator);
    }
  }
}

const clickingSimulator = new Game();
console.log(clickingSimulator);
