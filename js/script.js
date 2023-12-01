'use strict';

const quoteAuthor = document.querySelector('.quote__author');
const quoteText = document.querySelector('.quote__text');
const lazyImgs = document.querySelectorAll('.home__img');

//////////////////////////////////////////////////
// Random quote

const getQuote = async function () {
  try {
    // 1. Fetch the quotes from an API
    const response = await fetch(`https://type.fit/api/quotes`);

    // 2. Convert the result into a json string
    const data = await response.json();

    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);
    const randomNumber = randomInt(0, data.length - 1);
    console.log(randomNumber);

    const quote = data[randomNumber];
    console.log(quote);

    quoteAuthor.textContent = '';
    quoteText.textContent = '';

    if (quote.author === null) quoteAuthor.textContent = 'Joel Nambala';
    else quoteAuthor.textContent = quote.author.split(',').slice(0, 1).join('');
    quoteText.textContent = quote.text;
  } catch (error) {
    console.log(error);
  }
};

getQuote();

// Lazy image loading
const lazyImage = function (entries, oberver) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('lazy-img');

  // observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyImage, {
  root: null,
  threshold: 0,
});

lazyImgs.forEach(function (img, i, arr) {
  imgObserver.observe(img);
  img.classList.add('lazy-img');
});
