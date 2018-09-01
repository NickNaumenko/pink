function slider(argument) {
  const slider = document.querySelector(".slider");
  const viewport = slider.querySelector(".slider__viewport");
  const slidesFrame = slider.querySelector(".slider__slides");
  var slidesList = slider.querySelectorAll(".slider__item");
  const slidesCount = slidesList.length;
  const dotsContainer = slider.querySelector(".slider__dots");
  const buttonPrev = slider.querySelector(".slider__prev");
  const buttonNext = slider.querySelector(".slider__next");

  let firstPosition = argument.firstPosition || 0;

  let currentPosition = firstPosition;
  let newPosition = currentPosition;

  // (function() {
  //   let stepLength = viewport.offsetWidth;
  //   let path = (0 - newPosition) * stepLength;
  //   slidesFrame.style.transform = `translateX(${path}px)`;
  // })();


  function moveSlides() {
    let stepLength = viewport.offsetWidth;
    let path = (firstPosition - newPosition) * stepLength;
    slidesFrame.style.transform = `translateX(${path}px)`;
  }

  function autoMoving() {
    let timerId = setTimeout(function() {
      newPosition = currentPosition >= slidesCount - 1 ? 0 : newPosition + 1;
      initButton();

      timerId = setTimeout(autoMoving, 2000);
    }, 2000);
  }

  function makeDots(n) {
    for (let i = 0; i < n; i++) {
      let dotButton = document.createElement("button");
      dotButton.classList.add("slider__dot");

      if(i === firstPosition) {
        dotButton.classList.add("slider__dot--current");
        currentDot = dotButton;
      }

      dotButton.addEventListener("click", function() {
        newPosition = i;
        initButton();
      });

      dotsContainer.appendChild(dotButton);
    }
  }


  function setCurrentDot() {
    if (argument.sliderDots == false) {
      return;
    }

    let dotsList = slider.querySelectorAll(".slider__dot");
    dotsList[currentPosition].classList.remove("slider__dot--current");
    dotsList[newPosition].classList.add("slider__dot--current");
  }

  function checkDisabled() {
    if (newPosition === 0) {
      buttonPrev.setAttribute("disabled", "disabled");
    } else if (currentPosition === 0 && newPosition !== 0) {
      buttonPrev.removeAttribute("disabled", "disabled");
    }

    if (newPosition === slidesCount - 1) {
      buttonNext.setAttribute("disabled", "disabled");
    } else if (currentPosition === slidesCount - 1 && newPosition !== slidesCount - 1) {
      buttonNext.removeAttribute("disabled", "disabled");
    }
  }

  function initButton(button) {
    setCurrentDot();
    checkDisabled();
    currentPosition = newPosition;
    moveSlides();
  }



  if (argument.sliderButtons) {
    buttonPrev.addEventListener("click", function() {
      newPosition--;
      initButton();
    });

    buttonNext.addEventListener("click", function() {
      newPosition++;
      initButton();
    });
  }

  if (argument.sliderDots) {
    makeDots(slidesCount);
  }
  // autoMoving();
  checkDisabled();
}

let sliderConfig = {
  slider: ".slider",
  firstPosition: 0,
  sliderDots: true,
  sliderButtons: true
}

let slidera = new slider(sliderConfig);
