// Nav-Bar Responsiveness
const nav = document.querySelector('.nav')
let linkContainer = document.querySelector(".links");
let toggler = document.querySelector(".toggler");


let isOpen;

toggler.addEventListener("click", function () {
  isOpen = !isOpen;

  if (isOpen) {
    linkContainer.style.display = "block";
    toggler.classList.remove("fa-bars");
    toggler.classList.add("fa-xmark");
  } else {
    toggler.classList.remove("fa-xmark");
    toggler.classList.add("fa-bars");
    linkContainer.style.display = "none";
  }
});

// Function to be called when the target element intersects with the viewport
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav.classList.remove('colored-nav')
      console.log('Target element is in view!');
    } else {
      nav.classList.add('colored-nav')
      console.log('Target element is out of view!');
    }
  });
}

// Create an Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection);

// Get the target element
const target = document.querySelector('.hi-there');

// Start observing the target element
observer.observe(target);






// Tabbed Component
const tabs = document.querySelectorAll(".tab-btn");
const tabsContainer = document.querySelector(".tab-container");
const tabsContent = document.querySelectorAll(".tab-content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".tab-btn");
  console.log(clicked)

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("tab-btn--active"));
  tabsContent.forEach((c) => c.classList.remove("tab-content--active"));

  // Activate tabs
  clicked.classList.add("tab-btn--active");

  // Activate content area
  document
    .querySelector(`.tab-content--${clicked.dataset.tab}`)
    .classList.add(`tab-content--active`);
});


const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();