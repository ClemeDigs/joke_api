//Travail perso
/* import './fetch-joke.js' */


//Correction cours
const likedHtml = document.querySelector('[data-role="liked"]');
const currentJokeHtml = document.querySelector('[data-role="joke-content"]');
const btnLike = document.querySelector('.like');
const btnRefresh = document.querySelector('.next');
const inputLanguage = document.querySelector('.input-language');
let liked = JSON.parse(localStorage.getItem('likedJokes') ?? '[]');
let currentJoke = {};
const url = 'https://v2.jokeapi.dev/joke/Any';
let transformedUrl = url;

function updateJoke() {
    fetch(transformedUrl)
    .then(response => response.json())
    .then(data => {
        currentJoke = data;
        currentJokeHtml.innerHTML = '';
        if (data.joke) {
            currentJokeHtml.innerHTML = data.joke;
        }

        if (data.setup && data.delivery) {
            currentJokeHtml.innerHTML = data.setup + ' ' + data.delivery;
        }
    });
}

function updateLikedJokes() {
    likedHtml.innerHTML = '';
    let jokeContent = '';
    
    liked.forEach(joke => {
        if(joke.joke){
            jokeContent = joke.joke;
        } else if(joke.setup && joke.delivery) {
            jokeContent = joke.setup + ' ' + joke.delivery;
        }

        const div = document.createElement('div');
        div.className = ''
        div.innerHTML = jokeContent;

        const button = document.createElement('button');
        button.className = ''
        button.textContent = 'Unlike';
        button.onclick = () => {
            liked = liked.filter((likedJoke) => likedJoke.id !== joke.id);
            localStorage.setItem('likedsJokes', JSON.stringify(liked));
            updateLikedJokes();
        }

        div.appendChild(button);

        likedHtml.appendChild(div);
    })
}

updateJoke();
updateLikedJokes();

btnRefresh.onclick = () => {
    updateJoke();
}

btnLike.onclick = () => {
    liked.push(currentJoke);
    localStorage.setItem('likedJokes', JSON.stringify(liked));
    updateJoke();
    updateLikedJokes()
}

inputLanguage.onchange = () => {
    const value = inputLanguage.selectedOptions[0].value;
    transformedUrl = url + '?lang=' + value;
}