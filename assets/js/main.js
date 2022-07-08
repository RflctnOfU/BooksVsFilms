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



let body = $('body')



let searchQuery = $('#search-bar-input')

let searchBtn = $('#search-button')

let searchToApi = function (e) {
    e.preventDefault();
    console.log("hello")
    let searchTerm = searchQuery.val();
    if (searchTerm) {
        getBooks(searchTerm)
    }

}

let getBooks = function (search) {
    let booksUrl = 'http://openlibrary.org/search.json?q=' + search + '&limit=1'
    fetch(booksUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayImg(data);
                })
            }
        })
}

let displayImg = function (image) {
    let imgUrl = 'https://covers.openlibrary.org/b/id/' + image.docs[0].cover_i + '-M.jpg';

    fetch(imgUrl)
        .then(function (response) {
            console.log(response)
            let image = document.createElement('img');
            image.setAttribute('src', response.url)
            body.prepend(image);
            // response.json()
            // .then(function (data) {
            //     console.log(data);
            // })
        })
}

searchBtn.click(searchToApi)
// getBooks();