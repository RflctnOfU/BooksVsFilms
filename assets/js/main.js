document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});
// http://openlibrary.org/search.json?
// https://covers.openlibrary.org/b/id/



let main = $('main')

let box = document.createElement('section');
box.setAttribute('class', 'box is-flex is-justify-content-space-between');
box.setAttribute('style', 'background-color: black');

// let coverImg = $('#cover')
let imgUrl;
let posterUrl;
let bookTitle;
let bookPub;
let movieTitle;
let movieRelease;
let posterImg = $('#poster')

let searchQuery = $('#search-bar-input')

let searchBtn = $('#search-button')

let searchToApi = function (e) {
    e.preventDefault();
    let searchTerm = searchQuery.val();
    if (searchTerm) {
        getBookMovie(searchTerm)

    }

}

let getBookMovie = function (search) {
    let booksUrl = 'http://openlibrary.org/search.json?q=' + search + '&limit=2&language:eng'
    let movieUrl = 'https://api.themoviedb.org/3/search/movie?api_key=6e44bae1ae373999e2237689e35e2f46&language=en-US&query=' + search + '&page=1&include_adult=false'
    fetch(booksUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayCover(data);
                })
            }
        })
    fetch(movieUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayPoster(data);
                })
            }
        })
}

let displayCover = function (image) {
    imgUrl = 'https://covers.openlibrary.org/b/id/' + image.docs[0].cover_i + '-M.jpg';
    createDisplay();
    bookTitle = image.docs[0].title;
    bookPub = image.docs[0].first_publish_year;
}

let displayPoster = function (poster) {
    posterUrl = "https://image.tmdb.org/t/p/w185" + poster.results[0].poster_path
    movieTitle = poster.results[0].title;
    movieRelease = poster.results[0].release_date;
}

let createDisplay = function () {
    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('id', 'book');
    card.setAttribute('style', 'background-color: black');
    let cardImage = document.createElement('div');
    cardImage.setAttribute('class', 'card-image');
    let figure = document.createElement('figure');
    figure.setAttribute('class', 'image');
    figure.setAttribute('id', 'cover');
    let bookCover = document.createElement('img');
    bookCover.setAttribute('src', imgUrl);
    figure.append(bookCover);
    cardImage.append(figure);
    card.append(cardImage);
    box.append(card);
    let card1 = document.createElement('div');
    card1.setAttribute('class', 'card');
    card1.setAttribute('id', 'movie');
    card1.setAttribute('style', 'background-color: black')
    let cardImage1 = document.createElement('div');
    cardImage1.setAttribute('class', 'card-image');
    let figure1 = document.createElement('figure');
    figure1.setAttribute('class', 'image');
    figure1.setAttribute('id', 'poster');
    let moviePoster = document.createElement('img')
    moviePoster.setAttribute('src', posterUrl);
    figure1.append(moviePoster);
    cardImage1.append(figure1);
    card1.append(cardImage1);
    box.append(card1);
    main.append(box);

}

searchBtn.click(searchToApi)
// getBooks();