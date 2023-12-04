let total = 0;
let count = 0;

function addToBookingCard(button) {
    const movieContainer = button.closest('.movie');
    const title = movieContainer.dataset.title;
    const genre = movieContainer.dataset.genre;
    const duration = movieContainer.dataset.duration;
    const price = parseFloat(movieContainer.dataset.price);

    total += price;
    count++;

    const shoppingIcon = document.querySelector('.shopping-icon');
    shoppingIcon.setAttribute('data-count', count);

    const bookingList = document.getElementById('bookingList');
    const listItem = document.createElement('li');
    listItem.textContent = `${title} - ${genre} (${duration}) - $${price}`;
    bookingList.appendChild(listItem);

    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Нийт үнэ: ${total.toFixed(0)}`;
}

function showBookingCard() {
    const bookingCard = document.getElementById('bookingCard');
    bookingCard.style.display = 'block';
}

function hideBookingCard() {
    const bookingCard = document.getElementById('bookingCard');
    bookingCard.style.display = 'none';
}