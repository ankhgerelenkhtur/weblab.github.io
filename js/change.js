var currentBackgroundIndex = 0;
var backgrounds = ["image/background1.jpg", "image/napback.jpeg", "image/pacific.jpeg", "image/cod.jpeg"];
var intervalId;

function changeBackground(direction) {
    if (direction === 'prev') {
        currentBackgroundIndex = (currentBackgroundIndex - 1 + backgrounds.length) % backgrounds.length;
    } else if (direction === 'next') {
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    }

    document.getElementById('backgroundImage').style.opacity = 0; 
    setTimeout(function () {
        document.getElementById('backgroundImage').src = backgrounds[currentBackgroundIndex];
        document.getElementById('backgroundImage').style.opacity = 2; 
        updatePosterContent();
    }, 800); 
}

function updatePosterContent() {
    
    var movieDetails = [
        { title: 'OPPENHEIMER', date: '2023.10.15', genre: 'DRAMA/HISTORY', background: 'url(/image/poster.jpeg) center/cover no-repeat', boxShadow: '0 4px 32px 0 #F00' }, 
        { title: 'NAPOLEON', date: '2023.11.30', genre: 'DRAMA/HISTORY', background: 'url(/image/post2.jpg) center/cover no-repeat', boxShadow: '0 4px 32px 0 rgb(192, 57, 66)' },
        { title: 'PACIFIC RIM', date: '2023.10.15', genre: 'ACTION/FICTION', background: 'url(/image/rim.jpg) center/cover no-repeat', boxShadow: '0 4px 32px 0 rgb(0, 153, 255)' },
        { title: '13 HOURS', date: '2023.10.15', genre: 'ACTION/FICTION', background: 'url(/image/post4.jpeg) center/cover no-repeat', boxShadow: '0 4px 32px 0 rgb(0, 0, 0)' }
    
    ];

    var posterSection = document.querySelector('.poster1');

    var currentMovie = movieDetails[currentBackgroundIndex];
    var backgroundElement = document.getElementById('backgroundImage');
    backgroundElement.style.transition = 'opacity 0.5s ease-in';


    posterSection.setAttribute('style', `background: ${currentMovie.background}; box-shadow: ${currentMovie.boxShadow}`);

    posterSection.innerHTML = `
        <article>
            <a href="delgerengui.html">
                <h2 class="mname">${currentMovie.title}</h2>
            </a>
            <div class="maininfo">
                <img src="/image/calendar.png" alt="Calendar icon" width="15" height="15" />
                <p class="time">${currentMovie.date}</p>
                <p class="genre">ТӨРӨЛ: ${currentMovie.genre}</p>
            </div>
            <button class="secondary" aria-label="Book now">Захиалах</button>
            <a class="more" href="delgerengui.html">Дэлгэрэнгүй</a>
        </article>
    `;
}
