function slider(argument) {
  const viewport = document.querySelector(".slider__viewport");
  const slidesFrame = document.querySelector(".slider__slides");
  var slidesList = document.querySelectorAll(".slider__item");
  const slidesCount = slidesList.length;
  const dotsContainer = document.querySelector(".slider__dots");
  const buttonsContainer = document.querySelector(".slider__buttons");

  let firstPosition = 0;
  let currentPosition = firstPosition;
  let newPosition = firstPosition;

  function moveSlides() {
    let stepLength = viewport.offsetWidth;
    let path = (firstPosition - newPosition) * stepLength;
    slidesFrame.style.transform = `translateX(${path}px)`;

    console.log(stepLength);
    console.log(path);
  }

  function initControls(n) {
    for (let i = 0; i < n; i++) {
      let dotButton = document.createElement("button");
      dotButton.classList.add("slider__dot");

      if(i === firstPosition) {
        dotButton.classList.add("slider__dot--current");
        currentDot = dotButton;
      }

      dotButton.addEventListener("click", function() {
        newPosition = i;

        setCurrentDot();
        currentPosition = newPosition;

        moveSlides();
      });

      dotsContainer.appendChild(dotButton);
    }
  }

  function initButtons() {
    let buttonPrev = document.createElement("button");
    buttonPrev.classList.add("slider__button", "slider__prev");

    if (currentPosition <= 0) {
      // buttonPrev.setAttribute("disabled", "disabled");
    }

    buttonPrev.addEventListener("click", function() {
      newPosition--;
      setCurrentDot();
      currentPosition = newPosition;
      moveSlides();
    });



    let buttonNext = document.createElement("button");
    buttonNext.classList.add("slider__button", "slider__next");

    if(currentPosition >= slidesCount) {
      buttonNext.setAttribute("disabled", "disabled");
    }

    buttonNext.addEventListener("click", function() {
      newPosition++;
      setCurrentDot();
      currentPosition = newPosition;
      moveSlides();
    });

    buttonsContainer.appendChild(buttonPrev);
    buttonsContainer.appendChild(buttonNext);
  }

  function setCurrentDot() {
    let dotsList = document.querySelectorAll(".slider__dot");
    dotsList[currentPosition].classList.remove("slider__dot--current");
    dotsList[newPosition].classList.add("slider__dot--current");
  }


  initControls(slidesCount);
  initButtons();
}

let slidera = new slider();

