// http://openlibrary.org/search.json?
// https://covers.openlibrary.org/b/id/



let main = $('main')

let imgUrl;
let posterUrl;
let listContainer = $('.my-list-container');

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
    let bookTitle = image.docs[0].title;
    let bookPub = image.docs[0].first_publish_year;
    localStorage.setItem('bookTitle', bookTitle);
    localStorage.setItem('bookPub', bookPub)
    createDisplay();

}

let displayPoster = function (poster) {
    posterUrl = "https://image.tmdb.org/t/p/w185" + poster.results[0].poster_path
    movieTitle = poster.results[0].title;
    movieRelease = poster.results[0].release_date;
    localStorage.setItem('movieTitle', movieTitle);
    localStorage.setItem('movieRelease', movieRelease);
}

let createDisplay = function () {

    // parent to ammend to section
    let columns = document.createElement('div');
    columns.setAttribute('class', 'columns');

    //book div
    let book = document.createElement('div');
    book.setAttribute('class', 'column is-5 dynamic-col');

    //book cover div
    let cover = document.createElement('div');
    cover.setAttribute('class', 'coverImg is-flex is-justify-content-center');

    //book thumbs-up
    let bookUp = document.createElement('button');
    bookUp.setAttribute('class', 'thumbs-up is-align-self-center');

    //thumbs up icon
    let thumbsUpBook = document.createElement('i');
    // thumbsUpBook.setAttribute('class', 'fa fa-*');

    //book thumbs-down
    let bookDown = document.createElement('button');
    bookDown.setAttribute('class', 'thumbs-down is-align-self-center');

    //thumbs down icon
    let thumbsDownBook = document.createElement('i');
    // thumbsDownBook.setAttribute('class', 'fa fa-*');

    //book cover
    let bookCover = document.createElement('img');
    bookCover.setAttribute('src', imgUrl)
    bookCover.setAttribute('alt', 'Book Cover');

    bookUp.append(thumbsUpBook);
    bookDown.append(thumbsDownBook);
    cover.append(bookUp, bookCover, bookDown);

    //title div
    let bookTitleDiv = document.createElement('div');
    bookTitleDiv.setAttribute('class', 'bookTitle has-text-centered is-size-3 has-text-weight-semibold');
    bookTitleDiv.textContent = localStorage.getItem('bookTitle');

    let bookPubDiv = document.createElement('div');
    bookPubDiv.setAttribute('class', 'bookPub has-text-centered');
    bookPubDiv.textContent = 'Published: ' + localStorage.getItem('bookPub');

    book.append(cover, bookTitleDiv, bookPubDiv);

    //icon div
    let vsIcon = document.createElement('div');
    vsIcon.setAttribute('class', 'column is-2 dynamic-col is-flex is-justify-content-center mb-6');

    //vsIconImg background div
    let vsIconImg = document.createElement('div');
    vsIconImg.setAttribute('class', 'versus');

    //delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'is-danger is-align-self-flex-end');
    deleteBtn.textContent = 'Delete';

    vsIcon.append(vsIconImg, deleteBtn);


    //movie div
    let movie = document.createElement('div');
    movie.setAttribute('class', 'column is-5 dynamic-col');

    //movie cover div
    let poster = document.createElement('div');
    poster.setAttribute('class', 'posterImg is-flex is-justify-content-center');

    //movie thumbs-up
    let movieUp = document.createElement('button');
    movieUp.setAttribute('class', 'thumbs-up is-align-self-center');

    //thumbs up icon
    let thumbsUpMovie = document.createElement('i');
    // thumbsUpMovie.setAttribute('class', 'fa fa-*');
    //Movie thumbs-down
    let movieDown = document.createElement('button');
    movieDown.setAttribute('class', 'thumbs-down is-align-self-center');

    //                 //thumbs down icon
    let thumbsDownMovie = document.createElement('i');
    // thumbsDownMovie.setAttribute('class', 'fa fa-*');

    //book cover
    let moviePoster = document.createElement('img');
    moviePoster.setAttribute('src', posterUrl)
    moviePoster.setAttribute('alt', 'Movie Poster');

    movieUp.append(thumbsUpMovie);
    movieDown.append(thumbsDownMovie);
    poster.append(movieUp, moviePoster, movieDown);

    //title div
    let movieTitleDiv = document.createElement('div');
    movieTitleDiv.setAttribute('class', 'movieTitle has-text-centered is-size-3 has-text-weight-semibold');
    movieTitleDiv.textContent = localStorage.getItem('movieTitle');

    let movieReleaseDiv = document.createElement('div');
    movieReleaseDiv.setAttribute('class', 'movieRelease has-text-centered');
    movieReleaseDiv.textContent = 'Released: ' + movieRelease;

    movie.append(poster, movieTitleDiv, movieReleaseDiv);

    columns.append(book, vsIcon, movie);
    listContainer.append(columns);

}

searchBtn.click(searchToApi)
// getBooks();