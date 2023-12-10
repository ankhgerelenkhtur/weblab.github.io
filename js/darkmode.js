// dark-mode-toggle.js
class DarkModeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.darkMode = false;
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', () => this.toggleDarkMode());
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.documentElement.style.setProperty('--background-color', this.darkMode ? '#333' : '#fff');
    document.documentElement.style.setProperty('--text-color', this.darkMode ? '#fff' : '#333');

    const bookingCard = document.getElementById('bookingCard');
    const bookingList = document.getElementById('bookingList');
    const totalPriceElement = document.getElementById('totalPrice');

    if (this.darkMode) {
      bookingCard.style.backgroundColor = '#000'; 
      bookingCard.style.color = '#fff';
      bookingList.style.color = '#fff';
      totalPriceElement.style.color = '#fff';
    } else {
      bookingCard.style.backgroundColor = '#fff';
      bookingCard.style.color = '#333';
      bookingList.style.color = '#333';
      totalPriceElement.style.color = '#333';
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          cursor: pointer;
          /* Additional styles for your toggle button */
        }
      </style>
      <div>
        Dark Mode: ${this.darkMode ? 'On' : 'Off'}
      </div>
    `;
  }
}

customElements.define('dark-mode-toggle', DarkModeToggle);
