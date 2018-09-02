function slider(selector) {
  this._slider = document.querySelector(selector);
  this._viewport = this._slider.querySelector(".slider__viewport");
  this._frame = this._slider.querySelector(".slider__frame");
  this._slidesList = this._slider.querySelectorAll(".slider__item");
  this._dotsContainer = this._slider.querySelector(".slider__dots");
  this._dotsList = [];
  this._buttonPrev = this._slider.querySelector(".slider__prev");
  this._buttonNext = this._slider.querySelector(".slider__next");

  this.currentPosition = 0;
  this.newPosition = this.currentPosition;
}

slider.prototype.setStartPosition = function(position) {
  this.currentPosition = position || 0;
  this.newPosition = this.currentPosition;
  let shift = - this._viewport.offsetWidth * this.currentPosition;
  this._frame.style.left = shift + "px";
}

slider.prototype._initMove = function() {
  let path = - this._frame.offsetLeft - this._slidesList[this.newPosition].offsetLeft;
  this._frame.style.transform = `translateX(${path}px)`;
}


slider.prototype._setCurrentDot = function() {
  this._dotsList[this.currentPosition].classList.remove("slider__dot--current");
  this._dotsList[this.newPosition].classList.add("slider__dot--current");
}

slider.prototype.makeDots = function makeDots(amount) {
  n = amount || this._slidesList.length;
  let a = this;

  for (let i = 0; i < n; i++) {
    let dotButton = document.createElement("button");
    dotButton.classList.add("slider__dot");

    this._dotsList.push(dotButton);

    if(i == this.currentPosition) {
      dotButton.classList.add("slider__dot--current");
      currentDot = dotButton;
    }

    dotButton.addEventListener("click", function() {
      a.newPosition = i;

      if (a._buttonPrev) {
        a._checkDisabled();
      }

      a._setCurrentDot();
      a.currentPosition = a.newPosition;
      a._initMove();
    });

    this._dotsContainer.appendChild(dotButton);
  }
}

slider.prototype._checkDisabled = function() {
    if (this.newPosition === 0) {
      this._buttonPrev.setAttribute("disabled", "disabled");
    } else if (this.currentPosition === 0 && this.newPosition !== 0) {
      this._buttonPrev.removeAttribute("disabled", "disabled");
    }

    if (this.newPosition === this._slidesList.length - 1) {
      this._buttonNext.setAttribute("disabled", "disabled");
    } else if (this.currentPosition === this._slidesList.length - 1
        && this.newPosition !== this._slidesList.length - 1) {
      this._buttonNext.removeAttribute("disabled", "disabled");
    }
}

slider.prototype.initButtons = function(btnPrev, btnNext) {
  if (arguments.length) {
    this._buttonPrev = btnPrev;
    this._buttonPrev = btnPrev;
  }

  this._checkDisabled();

  let a = this;

  this._buttonPrev.addEventListener("click", function() {
    a.newPosition--;

    if (a._dotsList[0]) {
      a._setCurrentDot();
    }

    a._checkDisabled();

    a.currentPosition = a.newPosition;
    a._initMove();
  });

  this._buttonNext.addEventListener("click", function() {
    a.newPosition++;

    if (a._dotsList[0]) {
      a._setCurrentDot();
    }

    a._checkDisabled();

    a.currentPosition = a.newPosition;
    a._initMove();
  });
}


let newSlider = new slider(".reviews__slider");
newSlider.makeDots();
newSlider.initButtons();


let newSlider2 = new slider(".slider--price");
newSlider2.setStartPosition(1);
newSlider2.makeDots();
