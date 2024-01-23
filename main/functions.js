// Const setup for specific elements
const movieArea = document.getElementById("movieArea");
const homeButton = document.getElementById("home");
const listButton = document.getElementById("list");
const historyButton = document.getElementById("history");

// User locale choice movies

var listedMovies = [
    "Your watchlist"
];

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
    "Hacksaw Ridge"
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
    "hacksawridge.webp"
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
    5
];

categories[1] = dramaMovies = [
    "Dramas",
    6,
    7,
    8,
    9,
    10
];

// Prefab Functions

function createFiller(category, movieAmount) {
    fillerAmount = (5 - (movieAmount % 5))
    console.log("filler amount: " + fillerAmount);
    console.log("amount of movies: " + movieAmount);

    if (fillerAmount != 5) {
        for (let j = 0; j < fillerAmount; j++) {
            const movie = document.createElement("div");
            movie.className = "movieFiller";
            
            const buttonArea = document.createElement("div");
            buttonArea.className = "movieOptions";
    
            category.appendChild(movie);
        };
    }
}

// First load script 

for (let i = 0; i < categories.length; i++) {
    const category = document.createElement("div");
    category.className = "movieSection";
    category.innerHTML = '<p class="sectionName">' + categories[i][0] + '</p>';
    var amount = 0;
    for (let j = 1; j < categories[i].length; j++) {
        if (amount == 5) {
            break;
        }
        amount += 1;
        const movie = document.createElement("div");
        movie.className = "movieResult";
        movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[categories[i][j]] + '" class="movieThumbnail">';
        
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

        movie.onmouseover = function() {
            buttonArea.style.visibility = "visible";
        };

        movie.onmouseout = function () {
            buttonArea.style.visibility = "hidden";
        };

        listButton.onclick = function() {
            listedMovies.push(categories[i][j]);
            console.log(listedMovies);
        };

        buttonArea.appendChild(listButton);
        buttonArea.appendChild(seenButton);
        buttonArea.appendChild(blockButton);

        movie.appendChild(buttonArea);
        category.appendChild(movie);
    };
    createFiller(category, amount);
    movieArea.appendChild(category);
};

// List script

listButton.onclick = function() {
    movieArea.innerHTML = "";

    const category = document.createElement("div");
    category.className = "movieSection";
    category.innerHTML = '<p class="sectionName">' + listedMovies[0] + '</p>';
    for (let i = 1; i < listedMovies.length; i++) {
        const movie = document.createElement("div");
        movie.className = "movieResult";
        movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[listedMovies[i]] + '" class="movieThumbnail">';
        category.appendChild(movie);
    };
    createFiller(category, listedMovies.length - 1);
    movieArea.appendChild(category);
};

// Home script
 homeButton.onclick = function() {
    movieArea.innerHTML = "";

    for (let i = 0; i < categories.length; i++) {
        const category = document.createElement("div");
        category.className = "movieSection";
        category.innerHTML = '<p class="sectionName">' + categories[i][0] + '</p>';
        var amount = 0;
        for (let j = 1; j < categories[i].length; j++) {
            if (amount == 5) {
                break;
            }
            amount += 1;
            const movie = document.createElement("div");
            movie.className = "movieResult";
            movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[categories[i][j]] + '" class="movieThumbnail">';
            
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
    
            movie.onmouseover = function() {
                buttonArea.style.visibility = "visible";
            };
    
            movie.onmouseout = function () {
                buttonArea.style.visibility = "hidden";
            };
    
            listButton.onclick = function() {
                listedMovies.push(categories[i][j]);
                console.log(listedMovies);
            };
    
            buttonArea.appendChild(listButton);
            buttonArea.appendChild(seenButton);
            buttonArea.appendChild(blockButton);
    
            movie.appendChild(buttonArea);
            category.appendChild(movie);
        };
        createFiller(category, amount);
        movieArea.appendChild(category);
    };
 }

