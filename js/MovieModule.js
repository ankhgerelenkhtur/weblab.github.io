
async function fetchMovieData() {
    try {
      const response = await fetch('https://api.jsonbin.io/b/your-bin-id/latest');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return [];
    }
  }
  
 
  function filterMoviesByCategory(movies, category) {
    if (!category) {
      return movies;
    }
  
    return movies.filter(movie => movie.category.toLowerCase() === category.toLowerCase());
  }
  

  function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  
  async function handleMovieListingPage() {
    const categoryToFilter = getUrlParameter('category');
    const moviesData = await fetchMovieData();
    const filteredMovies = filterMoviesByCategory(moviesData, categoryToFilter);
    renderMovies(filteredMovies);
  }
  
  
  function renderMovies(movies) {
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = '';
  
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.innerHTML = `<h3>${movie.title}</h3><p>Category: ${movie.category}</p>`;
      moviesList.appendChild(movieElement);
    });
  }
  
 
  document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page name
    if (currentPage === 'ehlel.html' || currentPage === 'comingSoon.html') {
      handleMovieListingPage();
    }
  });
  