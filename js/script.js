'use strict';

//////////////////////////////////////////////////
// Random quote

const getQuote = async function () {
  try {
    // 1. Fetch the quotes from an API
    const response = await fetch(`https://type.fit/api/quotes`);

    // 2. Convert the result into a json string
    const data = await response.json();

    // 3. Slice the array
    const range = data.slice(0, 500);

    // 4. Generate a random number
    const random = Math.floor(Math.random() * range.length);

    // 5. Get a random quote
    const quote = range[random];

    // 6. Display to the UI
    if (quote.author === null) {
      const html = `
      <h3 class="quote-title">Author is null</h3>
      <p class="quote-paragraph">${quote.text}</p>`;

      document.querySelector('.hero__quote').textContent = '';
      document
        .querySelector('.hero__quote')
        .insertAdjacentHTML('afterbegin', html);
    } else {
      const html = `
      <h3 class="quote-title">${quote.author}</h3>
      <p class="quote-paragraph">${quote.text}</p>`;

      document.querySelector('.hero__quote').textContent = '';
      document
        .querySelector('.hero__quote')
        .insertAdjacentHTML('afterbegin', html);
    }
  } catch (err) {
    document.querySelector('.hero__quote').textContent = '';
    document.querySelector('.hero__quote').classList.add('.text-danger');
    document.querySelector(
      '.hero__quote'
    ).textContent = `${err}! Please check your internet connection`;
  }
};

getQuote();
