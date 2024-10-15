const likedJokes = document.querySelector('.liked-jokes');
const jokeHtml = document.querySelector('.joke');
const btnLike = document.querySelector('.like');
const btnNext = document.querySelector('.next');
let savedJokes = JSON.parse(localStorage.getItem('savedJokes')) || [];

function fetchJoke(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            jokeHtml.innerHTML = '';
            if (data.setup) {
                jokeHtml.textContent = data.setup + ' ' + data.delivery;
            } else {
                jokeHtml.textContent = data.joke;
            }
        });
}

fetchJoke('https://v2.jokeapi.dev/joke/Any');

btnNext.addEventListener('click', () => {
    fetchJoke('https://v2.jokeapi.dev/joke/Any');
});

btnLike.addEventListener('click', () => {
    savedJokes.push(jokeHtml.textContent);
    localStorage.setItem('savedJokes', JSON.stringify(savedJokes));
    updateSavedJokes();
});

function updateSavedJokes() {
    likedJokes.innerHTML = '';
    savedJokes.forEach((savedJoke, index) => {
        likedJokes.innerHTML += `
        <div class="joke-container">
            <p>${savedJoke}</p>
            <button class="btn-delete" data-index="${index}">X</button>
        </div>
        `;
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (event) => {
            const jokeIndex = event.target.getAttribute('data-index');
            savedJokes.splice(jokeIndex, 1);
            localStorage.setItem('savedJokes', JSON.stringify(savedJokes));
            updateSavedJokes();
        });
    });
}

updateSavedJokes();
