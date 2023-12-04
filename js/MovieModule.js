async function main() {
    const urlParams = new URLSearchParams(window.location.search);

    const url = 'https://api.jsonbin.io/v3/b/656d72bb0574da7622cfe94a';
    const options = {
        method: 'GET',
        headers: {
            'X-Master-Key': '$2a$10$T/MS.KH5mNM0PlItEPpBA.LMpTCt7XfP9JfFuIiaXEN2GAqDzhj5e'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const category = urlParams.get('category');
        const filteredMovies = result.record.filter(movie => movie["torol"].includes(category));
        const elem = document.getElementById("movies");
        elem.innerHTML = filteredMovies.map((movie) => {
            return `<article> 
                <a href="${movie.link}"><img src="${movie.poster}" alt="Oppenheimer movie poster"><h3>${movie.title}</h3></a>
                <div class="group"> <img class="cal" src="image/calendar.png" alt="calendar icon"> 
                <a class="more" href="${movie.link}" aria-label="Learn more about Oppenheimer"> Дэлгэрэнгүй</a>
                <h4>${movie.garahhugatsaa}</h4>
                <p>Төрөл: ${movie.torol} - Үргэжлэх хугацаа: ${movie.urgeljlehhugatsaa}</p></div>
            </article>`;
        }).join("");
        
    } catch (error) {
        console.error(error);
    }
}

window.onload = main;
