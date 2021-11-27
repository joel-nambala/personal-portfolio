'use strict';

// Select DOM elements
const randomQuoteDiv = document.querySelector('.random-quote');
const quoteTitle = document.querySelector('.quote-title');
const quoteDescription = document.querySelector('.quote-description');

// Generate random quote
randomQuoteDiv.style.opacity = 0;

const getQuote = async function () {
  try {
    // 1. Fetch quotes from an API
    const response = await fetch('https://type.fit/api/quotes');
    const quotes = await response.json();

    // 2. Slice the array to a desired number
    const range = quotes.slice(0, 500);

    // 3. Generate a random quote
    const randomQuote = Math.floor(Math.random() * range.length);

    // 4. Display to the user interface
    if (quotes[randomQuote].author === null) {
      const html = `
      <h4 class="quote-title">Aurthor is null</h4>
      <p class="quote-description">
          <span class="unicode">&#34;</span>${quotes[randomQuote].text}
      </p>
      `;
      randomQuoteDiv.style.opacity = 1;
      randomQuoteDiv.insertAdjacentHTML('afterbegin', html);
    } else {
      const html = `
      <h4 class="quote-title">${quotes[randomQuote].author}</h4>
      <p class="quote-description">
          <span class="unicode">&#34;</span>${quotes[randomQuote].text}
      </p>
      `;
      randomQuoteDiv.style.opacity = 1;
      randomQuoteDiv.insertAdjacentHTML('afterbegin', html);
    }
  } catch (err) {
    console.error(`${err.message}`);
    randomQuoteDiv.style.opacity = 1;
    randomQuoteDiv.classList.add('text-danger');
    randomQuoteDiv.textContent = `${err.message}, Check your internet connection`;
  }
};

getQuote();
