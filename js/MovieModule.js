
export async function fetchData() {
  try {
      const response = await fetch('https://api.jsonbin.io/b/your-bin-id'); // Replace 'your-bin-id' with your actual JSON bin ID
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
}

export function filterData(data, category) {
  if (!category) {
      return data;
  }

  return data.filter(movie => movie.category.toLowerCase() === category.toLowerCase());
}

export function renderMovieList(movies) {
  const movieListDiv = document.querySelector('.manaidelgetsnee'); // Adjust the selector based on your HTML structure
  movieListDiv.innerHTML = '';

  movies.forEach(movie => {
      const movieArticle = document.createElement('article');
      movieArticle.innerHTML = `
          <a href="${movie.link}">
              <img src="${movie.poster}" alt="${movie.title} movie poster">
              <h3>${movie.title}</h3>
          </a>
          <div>
              <img class="clock" src="/image/clock.png" alt="Clock icon">
              <p>${movie.duration} МИН</p>
              <img class="clock" src="/image/calendar.png" alt="Clock icon">
              <p>${movie.releaseDate}</p>
              <button class="secondary">Захиалах</button>
          </div>
      `;
      movieListDiv.appendChild(movieArticle);
  });
}
