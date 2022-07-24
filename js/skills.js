'use strict';

// Select DOM elements
const skillsHeader = document.querySelectorAll('.skills__header');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const dotsContainer = document.querySelector('.dots');
const containerSkills = document.querySelectorAll('.skill-container');
const firstChild = document.querySelector('.first-container');

skillsHeader.forEach(function (el, i, arr) {
  firstChild.style.height = '184px';
  el.addEventListener('click', function (e) {
    const element = e.currentTarget.closest('.skills__header');

    // Select elements according to parent element
    const skillsContainer = element.parentElement;
    const container = skillsContainer.querySelector('.skill-container');
    const skillsBody = skillsContainer.querySelector('.skills__body');
    const skillsIcon = skillsContainer.querySelector('.skills__icon');

    // Calculate the heights
    const containerHeight = container.getBoundingClientRect().height;
    const skillsHeight = skillsBody.getBoundingClientRect().height;

    containerSkills.forEach(function (el) {
      el.style.height = 0;
    });

    if (containerHeight === 0) {
      container.style.height = `${skillsHeight}px`;
      skillsIcon.classList.add('fa-chevron-up');
      skillsIcon.classList.remove('fa-chevron-down');
    } else {
      container.style.height = 0;
      skillsIcon.classList.add('fa-chevron-down');
      skillsIcon.classList.remove('fa-chevron-up');
    }
  });
});

////////////////////////////////////
// Slider component
let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (s, i) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dot')
    .forEach(dot => dot.classList.remove('dot-active'));

  document
    .querySelector(`.dot[data-slide="${slide}"]`)
    .classList.add('dot-active');
};

const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);
activateDot(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;

  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
setInterval(nextSlide, 10000);

dotsContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dot')) return;

  const { slide } = e.target.dataset;
  goToSlide(slide);
  activateDot(slide);
});
