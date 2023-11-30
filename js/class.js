
class Movie {
    constructor(title, poster, garahhugatsaa, torol, urgeljlehhugatsaa) {
      this.title = title;
      this.poster = poster;
      this.garahhugatsaa = garahhugatsaa;
      this.torol = torol;
      this.urgeljlehhugatsaa = urgeljlehhugatsaa;
    }
  }
  

  const movies = [

  ]

  function kinoniHTML(movie) {
    return `
      <article>
          <a href="delgerengui.html">
              <img src="${movie.poster}" alt="${movie.title} movie poster">
              <h3>${movie.title}</h3>
          </a>
          <div class="group">
              <img class="cal" src="image/calendar.png" alt="calendar icon" width="15" height="15">
              <a class="more" href="/delgerengui.html" aria-label="Learn more about ${movie.title}"> Дэлгэрэнгүй</a>
              <h4>${movie.garahhugatsaa}</h4>
              <p>Төрөл: ${movie.torol} - Үргэжлэх хугацаа: ${movie.urgeljlehhugatsaa}</p>
          </div>
      </article>
    `;
  }
  
  function kinoniHTML(movie) {
    return `
      <article>
          <a href="delgerengui.html">
              <img src="${movie.poster}" alt="${movie.title} movie poster">
              <h3>${movie.title}</h3>
          </a>
          <div class="group">
              <img class="cal" src="image/calendar.png" alt="calendar icon" width="15" height="15">
              <a class="more" href="/delgerengui.html" aria-label="Learn more about ${movie.title}"> Дэлгэрэнгүй</a>
              <h4>${movie.garahhugatsaa}</h4>
              <p>Төрөл: ${movie.torol} - Үргэжлэх хугацаа: ${movie.urgeljlehhugatsaa}</p>
          </div>
      </article>
    `;
  }
  
  function insertMovies() {
    const movieContainer = document.querySelector('.manaidelgetsnee');

    fetch('/js/movie.json')
      .then(response => response.json())
      .then(jsonData => {
        jsonData.forEach(movie => {
          const movieHTML = kinoniHTML(movie);
          movieContainer.insertAdjacentHTML('beforeend', movieHTML);
        });
      })
      .catch(error => console.error('Error JSON:', error));
  } 
  document.addEventListener('DOMContentLoaded', insertMovies);
  