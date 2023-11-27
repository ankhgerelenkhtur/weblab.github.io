
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
    new Movie("EXORCIST BELIEVER", "image/exorcist.jpg", "2023.09.23", "DRAMA/HISTORY", "1 цаг 30мин"),
    new Movie("SAW X", "image/saw.jpeg", "2023.09.23", "DRAMA/ACTION", "2 цаг"),
    new Movie("THE PURGE", "image/thepurge.jpeg", "2023.11.30", "HORROR/ACTION", "2 цаг 15мин"),
 
  ];
  

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
    movies.forEach(movie => {
      const movieHTML = kinoniHTML(movie);
      movieContainer.insertAdjacentHTML('beforeend', movieHTML);
    });
  }
  
  
  document.addEventListener('DOMContentLoaded', insertMovies);
  