const form = document.getElementById('form');
const more = document.getElementById('more');
const dropdown = document.querySelector('.dropdown');
const content = document.querySelector('.dropdown-content')
const movieCard = document.getElementById('movie-card');
const searchText = document.getElementById('search');

const API_URL = 'https://www.omdbapi.com/?';
const apiKey = "4dfe7a8a";

const dropd = (e) => {
    e.preventDefault();
    dropdown.classList.toggle('is-active');
}

const searchFilms = async (value) => {
    const res = await fetch(`${API_URL}apikey=${apiKey}&s=${value}`);
    const data = await res.json();
    const info = data.Search || []
    showData(info);
    console.log(info)
};

const showData = (moviesArray) => {
    if (moviesArray.length === 0) {
        content.innerHTML = `<p>No results found<p>`
        return
    }
    content.innerHTML = `<ul>
    ${moviesArray
            .map(
                (movie) =>
                    `<li class="dropdown-item" data-movie="${movie.Title}">${movie.Title}</li>`
            )
            .join('')}    
    </ul>
    `;
};

const getMovieInfo = async (movieTitle) => {
    const res = await fetch(`${API_URL}apikey=${apiKey}&t=${movieTitle}`);
    const data = await res.json();
    dropdown.classList.remove('is-active');

    const genre = data.Genre
    const plot = data.Plot
    const awards = data.Awards
    const actors = data.Actors
    const metascore = data.Metascore
    const rating = data.imdbRating
    const votes = data.imdbVotes
    const poster = data.Poster

    const card = document.createElement('card');
    card.className = 'dynamic-card';
    card.innerHTML = `
    <img class="card__imagen" src=${poster} />
                <div class="card__detalles">
                    <h2>${movieTitle}</h2>
                    <h3>${genre}</h3>
                    <p>
                        ${plot}
                    </p>
                  <ul>
    <li>Awards - ${awards}</li>
    <li>Actors - ${actors}</li>
    <li>Metascore - ${metascore}</li>
    <li>IMBD Rating - ${rating}</li>
    <li>IMBD Votes - ${votes}</li>
</ul>
                </div>`;

    movieCard.appendChild(card)
};



function init() {
    searchText.addEventListener('input', (e) => {
        e.preventDefault();
        const searchValue = e.target.value.trim();
        console.log(e.target)
        if (!searchValue) {
            return;
        }
        searchFilms(searchValue);
    });

    searchText.addEventListener('input', dropd)

    const displayCard = (e) => {
        const element = e.target;
        console.log(element)
        if (element.nodeName === 'LI') {
            const film = element.dataset.movie
            getMovieInfo(film);
        }

        const dynamicCard = movieCard.querySelector('.dynamic-card')
        if (dynamicCard) {
            movieCard.removeChild(dynamicCard)
        }
    }

    content.addEventListener('click', displayCard)
}


init();
