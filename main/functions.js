// Const setup for specific elements
const movieArea = document.getElementById("movieArea");
const homeButton = document.getElementById("home");
const listButton = document.getElementById("list");
const historyButton = document.getElementById("history");

const inputArea = document.getElementById("movieInput");

const tutorialArea = document.getElementById("tutorial");
const tutorialMovieArea = document.getElementById("tutorialMovies");

const shortInfo = document.getElementById("infoSide");
const shortTitle = document.getElementById("sideTitle");
const shortImage = document.getElementById("sideImage");

var openMovie = NaN;
var isOpen = false;


// User locale choice movies

var listedMovies = [
    "Your watchlist"
];

var seenMovies = [
    "Your history"
]

var searchMovies = [
    "Based on your search",
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23
]

// Array setup for movie information
const movieNames = [
    "Oppenheimer",
    "Django Unleashed",
    "Barbie",
    "John Wick: Chapter 4",
    "Avengers: Infinity War",
    "The Batman",

    "Joker",
    "Apollo 13",
    "Gran Turismo",
    "The Hill",
    "Hacksaw Ridge",
    "Fahrenheit 451",

    "Saw X",
    "Halloween",
    "Ghostface",
    "The Ring",
    "American Psycho",
    "Friday the 13th",
    "Happy Death Day",
    "Ash vs The Evil Dead",
    "Talk to Me",
    "Thanksgiving",
    "The Cube",
    "Hellraiser"
];

const movieThumnails = [
    "oppenheimer.jpg",
    "django.jpg",
    "barbie.jpg",
    "wick4.jpg",
    "infwar.jpg",
    "thebatman.jpg",

    "joker.jpg",
    "apollo13.jpg",
    "granturismo.webp",
    "thehill.jpg",
    "hacksawridge.webp",
    "fahrenheit.jpg",

    "saw.webp",
    "halloween.jpg",
    "ghostface.jpg",
    "thering.webp",
    "americanpsycho.jpg",
    "fridaythe13th.jpg",
    "deathday.jpg",
    "evildead.jpg",
    "talktome.jpg",
    "thanksgiving.webp",
    "cube.webp",
    "hellraiser.jpg"
];

// Movie List Holder

var categories = [];

// Prefixed movie categories
categories[0] = popularMovies = [
    "Popular Picks",
    0,
    1,
    2,
    3,
    4,
    5,

];

categories[1] = dramaMovies = [
    "Dramas",
    6,
    7,
    8,
    9,
    10,
    11
];

// Prefab Functions

function createFiller(category, movieAmount) {
    fillerAmount = (6 - (movieAmount % 6))
    console.log("filler amount: " + fillerAmount);
    console.log("amount of movies: " + movieAmount);

    if (fillerAmount != 6) {
        for (let j = 0; j < fillerAmount; j++) {
            const movie = document.createElement("div");
            movie.className = "movieFiller";
            
            const buttonArea = document.createElement("div");
            buttonArea.className = "movieOptions";
    
            category.appendChild(movie);
        };
    }
};

function createButtons(movie, categories, i, j) {
    const buttonArea = document.createElement("div");
    buttonArea.className = "movieOptions";
    const listButton = document.createElement("button");
    const seenButton = document.createElement("button");
    const blockButton = document.createElement("button");
    listButton.className = "movieOptionButtons";
    seenButton.className = "movieOptionButtons";
    blockButton.className = "movieOptionButtons";
    listButton.innerHTML = "Add to list"
    seenButton.innerHTML = "Seen it"
    blockButton.innerHTML = "Block it"

    movie.addEventListener("click", e => {
        e.stopPropagation();
        if (isOpen == false || openMovie != categories[i][j]) {
            isOpen = true;
            openMovie = categories[i][j];
            shortTitle.innerText = movieNames[categories[i][j]];
            shortImage.src = '../images/moviePosters/' + movieThumnails[categories[i][j]];
            shortInfo.style.visibility = "visible";
        }
        else {
            isOpen = false;
            openMovie = NaN;
            shortInfo.style.visibility = "hidden";
        }
    });

    movie.onmouseover = function() {
        buttonArea.style.visibility = "visible";
    };

    movie.onmouseout = function() {
        buttonArea.style.visibility = "hidden";
    };

    listButton.addEventListener("click", e => {
        e.stopPropagation();
        listedMovies.push(categories[i][j]);
    });

    seenButton.addEventListener("click", e => {
        e.stopPropagation();
        console.log("clicked");
        seenMovies.push(categories[i][j]);
    });

    buttonArea.appendChild(listButton);
    buttonArea.appendChild(seenButton);
    buttonArea.appendChild(blockButton);

    movie.appendChild(buttonArea);
};

function createClickable(movie, list, index) {
    movie.addEventListener("click", e => {
        e.stopPropagation();
        if (isOpen == false || openMovie != list[index]) {
            isOpen = true;
            openMovie = list[index];
            shortTitle.innerText = movieNames[list[index]];
            shortImage.src = '../images/moviePosters/' + movieThumnails[list[index]];
            shortInfo.style.visibility = "visible";
        }
        else {
            isOpen = false;
            openMovie = NaN;
            shortInfo.style.visibility = "hidden";
        }
    });
};

// First load script 

for (let i = 0; i < 1; i++) {
    const category = document.createElement("div");
    category.className = "movieSection";
    category.innerHTML = '<p class="sectionName">' + categories[i][0] + '</p>';
    var amount = 0;
    for (let j = 1; j < categories[i].length; j++) {
        if (amount == 7) {
            break;
        }
        amount += 1;
        const movie = document.createElement("div");
        movie.className = "movieResult";
        movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[categories[i][j]] + '" class="movieThumbnail">';

        createButtons(movie, categories, i, j);

        category.appendChild(movie);
    };
    createFiller(category, amount);
    tutorialMovieArea.appendChild(category);
};

for (let i = 0; i < categories.length; i++) {
    const category = document.createElement("div");
    category.className = "movieSection";
    category.innerHTML = '<p class="sectionName">' + categories[i][0] + '</p>';
    var amount = 0;
    for (let j = 1; j < categories[i].length; j++) {
        if (amount == 7) {
            break;
        }
        amount += 1;
        const movie = document.createElement("div");
        movie.className = "movieResult";
        movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[categories[i][j]] + '" class="movieThumbnail">';

        createButtons(movie, categories, i, j);

        category.appendChild(movie);
    };
    createFiller(category, amount);
    movieArea.appendChild(category);
};

inputArea.addEventListener("keyup", e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
        tutorialArea.style.visibility = "hidden";
        movieArea.innerHTML = "";

        const category = document.createElement("div");
        category.className = "movieSection";
        category.innerHTML = '<p class="sectionName">' + searchMovies[0] + ": " + inputArea.value + '</p>';
        for (let i = 1; i < searchMovies.length; i++) {
            const movie = document.createElement("div");
            movie.className = "movieResult";
            movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[searchMovies[i]] + '" class="movieThumbnail">';
            createClickable(movie, searchMovies, i)
            category.appendChild(movie);
        };
    
        createFiller(category, searchMovies.length - 1);
        movieArea.appendChild(category);
    }
});


// List script

listButton.onclick = function() {
    tutorialArea.style.visibility = "hidden";
    movieArea.innerHTML = "";

    const category = document.createElement("div");
    category.className = "movieSection";
    category.innerHTML = '<p class="sectionName">' + listedMovies[0] + '</p>';
    for (let i = 1; i < listedMovies.length; i++) {
        const movie = document.createElement("div");
        movie.className = "movieResult";
        movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[listedMovies[i]] + '" class="movieThumbnail">';
        createClickable(movie, listedMovies, i)
        category.appendChild(movie);
    };

    createFiller(category, listedMovies.length - 1);
    movieArea.appendChild(category);
};

// History script

historyButton.onclick = function() {
    tutorialArea.style.visibility = "hidden";
    movieArea.innerHTML = "";

    const category = document.createElement("div");
    category.className = "movieSection";
    category.innerHTML = '<p class="sectionName">' + seenMovies[0] + '</p>';
    for (let i = 1; i < seenMovies.length; i++) {
        const movie = document.createElement("div");
        movie.className = "movieResult";
        movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[seenMovies[i]] + '" class="movieThumbnail">';
        createClickable(movie, seenMovies, i)
        category.appendChild(movie);
    };
    createFiller(category, seenMovies.length - 1);
    movieArea.appendChild(category);
};

// Home script
 homeButton.onclick = function() {
    tutorialArea.style.visibility = "hidden";
    movieArea.innerHTML = "";

    for (let i = 0; i < categories.length; i++) {
        const category = document.createElement("div");
        category.className = "movieSection";
        category.innerHTML = '<p class="sectionName">' + categories[i][0] + '</p>';
        var amount = 0;
        for (let j = 1; j < categories[i].length; j++) {
            if (amount == 7) {
                break;
            }
            amount += 1;
            const movie = document.createElement("div");
            movie.className = "movieResult";
            movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[categories[i][j]] + '" class="movieThumbnail">';
    
            createButtons(movie, categories, i, j);
    
            category.appendChild(movie);
        };
        createFiller(category, amount);
        movieArea.appendChild(category);
    };
 }

