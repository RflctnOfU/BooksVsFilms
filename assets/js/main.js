// http://openlibrary.org/search.json?
// https://covers.openlibrary.org/b/id/

let booksUrl = 'http://openlibrary.org/search.json?q=the+wizard+of+oz&limit=5'

let body = $('body')

let getBooks = function () {
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


getBooks();