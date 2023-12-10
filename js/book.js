let total = 0;
let count = 0;
let bookedMovies = [];

class BookingApp extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
          /* Add your styles here */
      </style>
      <div class="booking-card" id="bookingCard">
          <h2>Захиалсан кинонууд</h2>
          <ul class="shopping-list" id="bookingList"></ul>
          <button onclick="resetBooking()">Reset</button>
          <div class="total-price" id="totalPrice">Нийт үнэ: MNT: 0</div>
      </div>
      <div class="shopping-icon" data-count="0" onclick="toggleBookingCard()">🛒</div>
      <div class="dark">
          <div class='toggle-switch'>
              <label>
                  <input type='checkbox' onclick="darkMode()">
                  <span class='slider'></span>
              </label>
          </div>
      </div>
  `;
  }

  static get observedAttributes() {
    return ['total', 'count', 'bookedMovies'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'total':

          break;
        case 'count':

          break;
        case 'bookedMovies':
          break;
      }
    }
  }

  set total(value) {
    this.setAttribute('total', value);
  }

  get total() {
    return parseFloat(this.getAttribute('total')) || 0;
  }

  set count(value) {
    this.setAttribute('count', value);
  }

  get count() {
    return parseInt(this.getAttribute('count')) || 0;
  }

  set bookedMovies(value) {
    this.setAttribute('bookedMovies', JSON.stringify(value));
  }

  get bookedMovies() {
    const attrValue = this.getAttribute('bookedMovies');
    return attrValue ? JSON.parse(attrValue) : [];
  }
}

customElements.define('booking-app', BookingApp);

function addToBookingCard(button) {
  const movieContainer = button.closest('.movie');
  const title = movieContainer.querySelector('h3').textContent;
  const genre = movieContainer.querySelector('p:nth-child(2)').textContent.split(': ')[1];
  const duration = movieContainer.querySelector('p:nth-child(3)').textContent.split(': ')[1];
  const priceString = movieContainer.querySelector('p:nth-child(4)').textContent.split(': ')[1].replace(',', '');
  const price = parseFloat(priceString);

  total += price;
  count++;

  const shoppingIcon = document.querySelector('.shopping-icon');
  shoppingIcon.setAttribute('data-count', count);

  const bookingList = document.getElementById('bookingList');
  const listItem = document.createElement('li');
  listItem.textContent = `${title} - ${genre} (${duration}) - $${price}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'DECLINE';
  deleteButton.onclick = () => declineBooking(title);

  listItem.appendChild(deleteButton);

  bookingList.appendChild(listItem);

  bookedMovies.push({ title, genre, duration, price });

  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.textContent = `Нийт үнэ: MNT ${total.toFixed(0)}`;

  saveToLocalStorage();
}

function declineBooking(movieTitle) {

  const movieIndex = bookedMovies.findIndex((bookedMovie) => bookedMovie.title === movieTitle);

  if (movieIndex !== -1) {
    total -= bookedMovies[movieIndex].price;
    count--;

    const shoppingIcon = document.querySelector('.shopping-icon');
    shoppingIcon.setAttribute('data-count', count);

    const bookingList = document.getElementById('bookingList');
    bookingList.removeChild(bookingList.childNodes[movieIndex]);

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Нийт үнэ: MNT ${total.toFixed(0)}`;
    bookedMovies.splice(movieIndex, 1);
    saveToLocalStorage();
  }
}

function showBookingCard() {
  const bookingCard = document.getElementById('bookingCard');
  bookingCard.style.display = 'block';
}

function hideBookingCard() {
  const bookingCard = document.getElementById('bookingCard');
  bookingCard.style.display = 'none';
}

function toggleBookingCard() {
  const bookingCard = document.getElementById('bookingCard');
  if (bookingCard.style.display === 'block') {
    hideBookingCard();
  } else {
    showBookingCard();
  }
}

function resetBooking() {
  total = 0;
  count = 0;
  bookedMovies = [];

  const shoppingIcon = document.querySelector('.shopping-icon');
  shoppingIcon.setAttribute('data-count', count);

  const bookingList = document.getElementById('bookingList');
  bookingList.innerHTML = '';

  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.textContent = `Нийт үнэ: MNT ${total.toFixed(0)}`;

  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem('bookingData', JSON.stringify({ total, count, bookedMovies }));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem('bookingData');
  if (savedData) {
    const { total: savedTotal, count: savedCount, bookedMovies: savedBookedMovies } = JSON.parse(savedData);
    total = savedTotal;
    count = savedCount;
    bookedMovies = savedBookedMovies;

    const shoppingIcon = document.querySelector('.shopping-icon');
    shoppingIcon.setAttribute('data-count', count);

    const bookingList = document.getElementById('bookingList');
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Нийт үнэ: MNT ${total.toFixed(0)}`;

    bookedMovies.forEach((movie) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${movie.title} - ${movie.genre} (${movie.duration}) - $${movie.price}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'DECLINE';
      deleteButton.onclick = () => declineBooking(movie.title);

      listItem.appendChild(deleteButton);

      bookingList.appendChild(listItem);
    });
  }
}

window.onload = function () {
  loadFromLocalStorage();
};
