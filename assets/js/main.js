// http://openlibrary.org/search.json?
// https://covers.openlibrary.org/b/id/



let main = $('main')

// let box = document.createElement('section');
// box.setAttribute('class', 'box is-flex is-justify-content-space-between');
// box.setAttribute('style', 'background-color: black');

// let coverImg = $('#cover')
let imgUrl;
let posterUrl;
// let posterImg = $('#poster')

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
    // console.log(bookTitle);
    // let box = document.createElement('section');
    // box.setAttribute('class', 'box is-flex is-justify-content-space-between');
    // box.setAttribute('style', 'background-color: black');
    // let card = document.createElement('div');
    // card.setAttribute('class', 'card');
    // card.setAttribute('id', 'book');
    // card.setAttribute('style', 'background-color: black; box-shadow: 0 0 10px 10px; border: solid 1px #ba5e08; border-radius: 5px');
    // let cardImage = document.createElement('div');
    // cardImage.setAttribute('class', 'card-image');
    // let figure = document.createElement('figure');
    // figure.setAttribute('class', 'image');
    // figure.setAttribute('id', 'cover');
    // let bookCover = document.createElement('img');
    // bookCover.setAttribute('src', imgUrl);
    // figure.append(bookCover);
    // cardImage.append(figure);
    // let cardContent = document.createElement('div');
    // cardContent.setAttribute('class', 'card-content');
    // let content = document.createElement('div');
    // content.setAttribute('class', 'content');
    // content.setAttribute('style', 'color: white');
    // let titleH2A = document.createElement('h2');
    // titleH2A.setAttribute('class', 'is-size-5')
    // titleH2A.setAttribute('id', 'bookTitle');
    // titleH2A.textContent = "Title: " + localStorage.getItem('bookTitle');
    // console.log(localStorage.getItem('bookTitle'));
    // let titleH2B = document.createElement('h2');
    // titleH2B.setAttribute('class', 'is-size-6');
    // titleH2B.setAttribute('id', 'releaseDate');
    // titleH2B.textContent = "Published: " + localStorage.getItem('bookPub');
    // content.append(titleH2A, titleH2B);
    // cardContent.append(content);
    // card.append(cardImage, cardContent);
    // box.append(card);

    // let card1 = document.createElement('div');
    // card1.setAttribute('class', 'card');
    // card1.setAttribute('id', 'movie');
    // card1.setAttribute('style', 'background-color: black; box-shadow: 0 0 10px 10px; border: solid 1px #47e6fb; border-radius: 5px')
    // let cardImage1 = document.createElement('div');
    // cardImage1.setAttribute('class', 'card-image');
    // let figure1 = document.createElement('figure');
    // figure1.setAttribute('class', 'image');
    // figure1.setAttribute('id', 'poster');
    // let moviePoster = document.createElement('img')
    // moviePoster.setAttribute('src', posterUrl);
    // figure1.append(moviePoster);
    // cardImage1.append(figure1);
    // let cardContent1 = document.createElement('div');
    // cardContent1.setAttribute('class', 'card-content');
    // let content1 = document.createElement('div');
    // content1.setAttribute('class', 'content');
    // content1.setAttribute('style', 'color: white');
    // let titleH2A1 = document.createElement('h2');
    // titleH2A1.setAttribute('class', 'is-size-5')
    // titleH2A1.setAttribute('id', 'bookTitle');
    // titleH2A1.textContent = "Title: " + localStorage.getItem('movieTitle');
    // let titleH2B1 = document.createElement('h2');
    // titleH2B1.setAttribute('class', 'is-size-6');
    // titleH2B1.setAttribute('id', 'releaseDate');
    // titleH2B1.textContent = "Released on: " + localStorage.getItem('movieRelease');
    // content1.append(titleH2A1, titleH2B1);
    // cardContent1.append(content1);
    // card1.append(cardImage1, cardContent1);
    // box.append(card1);
    // main.append(box);

    // parent to ammend to section
    let columns = document.createElement('div');
    columns.setAttribute('class', 'columns');

    //book div
    let book = document.createElement('div');
    book.setAttribute('class', 'column is-5 dynamic-col');

    //book cover div
    let cover = document.createElement('div');
    cover.setAttribute('coverImg');

    //book thumbs-up
    let bookUp = document.createElement('button');
    bookUp.setAttribute('class', 'thumbs-up');

    //thumbs up icon
    let thumbsUp = document.createElement('i');

    //book thumbs-down
    let bookDown = document.createElement('button');
    bookDown.setAttribute('class', 'thumbs-down');

    //thumbs down icon
    let thumbsDown = document.createElement('i');

    //book cover
    let bookCover = document.createElement('img');
    bookCover.setAttribute('src', imgUrl)
    bookCover.setAttribute('alt', 'Book Cover');

    //title div
    let bookTitleDiv = document.createElement('div');
    bookTitleDiv.setAttribute('class', 'bookTitle');
    bookTitleDiv.textContent = bookTitle;

    let bookPubDiv = document.createElement('div');
    bookPubDiv.setAttribute('class', 'bookPub');
    bookPubDiv.textContent = bookPub;

    //icon div
    let vsIcon = document.createElement('div');
    vsIcon.setAttribute('class', 'column is-2 dynamic-col');

    //vsIconImg background div
    let vsIconImg = document.createElement('div');
    vsIconImg.setAttribute('class', 'versus');

    //delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'is-danger');
    deleteBtn.textContent = 'Delete';

    //movie div
    let movie = document.createElement('div');
    movie.setAttribute('class', 'column is-5 dynamic-col');

    //movie cover div
    let poster = document.createElement('div');
    poster.setAttribute('posterImg');

    //movie thumbs-up
    let movieUp = document.createElement('button');
    movieUp.setAttribute('class', 'thumbs-up');

    //thumbs up icon
    // let thumbsUp = document.createElement('i');

    //             //book thumbs-down
    // let bookDown = document.createElement('button');
    // bookDown.setAttribute('class', 'thumbs-down');

    //                 //thumbs down icon
    // let thumbsDown = document.createElement('i');

    //book cover
    let moviePoster = document.createElement('img');
    moviePoster.setAttribute('src', imgUrl)
    moviePoster.setAttribute('alt', 'Movie Poster');

    //title div
    let movieTitleDiv = document.createElement('div');
    movieTitleDiv.setAttribute('class', 'movieTitle');
    movieTitleDiv.textContent = movieTitle;

    let movieReleaseDiv = document.createElement('div');
    movieReleaseDiv.setAttribute('class', 'bookPub');
    movieReleaseDiv.textContent = movieRelease;
}

searchBtn.click(searchToApi)
// getBooks();