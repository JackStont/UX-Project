// Written by Serge Strizhov, finalized on 1/25/2024 under the guidance of Dragutin Petkovic, at San Francisco State University for CSC 699 Credit.
// Note: This was not written for functionality, but rather, presentation of the user design oriented project. Code only does prewritten work rather than working mutably.


// Variables for various elements of the page that move around, show or hide, or have items added to them with flexbox.
const movieArea = document.getElementById("movieArea");
const homeButton = document.getElementById("home");
const listButton = document.getElementById("list");
const historyButton = document.getElementById("history");

const inputArea = document.getElementById("movieInput");

const tutorialArea = document.getElementById("tutorial");
const tutorialMovieArea = document.getElementById("tutorialMovies");

const loginOpenButton = document.getElementById("loginOpenButton");
const loginArea = document.getElementById("loginArea");
const loginButton = document.getElementById("loginButton");

const registerButton = document.getElementById("registerButton");
const registerArea = document.getElementById("registerArea");

const logoutArea = document.getElementById("logoutArea");
const logoutButton = document.getElementById("logoutButton");

const shortInfo = document.getElementById("infoSide");
const shortTitle = document.getElementById("sideTitle");
const shortImage = document.getElementById("sideImage");

var openMovie = NaN;
var loggedIn = false;


// Locally saved collections of specific movies that show whenever an event happens, such as searching, going home, etc.
// Listedmovies and seenmovies are both mutable.

var personalRecc = [
    "Based on your previous picks",
    19,
    6,
    3,
    5,
    10,
    1,
];

var listedMovies = [
    "Your list"
];

var seenMovies = [
    "Your history"
]

var searchMovies = [
    "Showing 12 results",
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

// All the movie information stored in two side by side arrays. One has the name, the other has the image location.
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

// Movie List Holder. Contains all the pre-designated movie sections that show at specific times.

var categories = [];

// Prefixed movie categories
categories[0] = popularMovies = [
    "Popular",
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

// Preset functions.

// Creates blank filler so that flexbox doesn't look weird, due to it using align: space evenly. Particularly, 1 movie vs 5 movies being shown on one row.
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

// A function that creates the buttons that show up when you hover over a movie, which allow you to list it, mark it as seen or block it. Only list and seen work.
function createButtons(movie, category, j) {
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
        if (shortInfo.style.visibility == "hidden" || openMovie != category[j]) {
            openMovie = category[j];
            shortTitle.innerText = movieNames[category[j]];
            shortImage.src = '../images/moviePosters/' + movieThumnails[category[j]];
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
        listedMovies.push(category[j]);
    });

    seenButton.addEventListener("click", e => {
        e.stopPropagation();
        seenMovies.push(category[j]);
    });

    buttonArea.appendChild(listButton);
    buttonArea.appendChild(seenButton);
    buttonArea.appendChild(blockButton);

    movie.appendChild(buttonArea);
};

// Makes a movie clickable to open it's bigger info. Could probably be merged with createButtons, but as its a user design project, I am not too worried about it.
function createClickable(movie, list, index) {
    movie.addEventListener("click", e => {
        e.stopPropagation();
        if (shortInfo.style.visibility == "hidden" || openMovie != list[index]) {
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

// Function that loads the home page and it's relevant movie items. Calls upon previous functions.
function homeLoad() {
    tutorialArea.style.visibility = "hidden";
    movieArea.innerHTML = "";

    if (loggedIn) {
        const category = document.createElement("div");
        category.className = "movieSection";
        category.innerHTML = '<p class="sectionName">' + personalRecc[0] + '</p>';
        for (let i = 1; i < personalRecc.length; i++) {
            const movie = document.createElement("div");
            movie.className = "movieResult";
            movie.innerHTML = '<img src="../images/moviePosters/' + movieThumnails[personalRecc[i]] + '" class="movieThumbnail">';
            createButtons(movie, personalRecc, i)
            category.appendChild(movie);
        };
    
        createFiller(category, personalRecc.length - 1);
        movieArea.appendChild(category);
    }

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
    
            createButtons(movie, categories[i], j);
    
            category.appendChild(movie);
        };
        createFiller(category, amount);
        movieArea.appendChild(category);
    };
}




// Landing popup script. Doesn't work properly.
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

        createButtons(movie, categories[i], j);

        category.appendChild(movie);
    };
    createFiller(category, amount);
    tutorialMovieArea.appendChild(category);
};

// Loads the home page upon immediately entering page. Removing it allows tutorial to be seen. Very odd.
homeLoad();

// Function that triggers upon pressing enter into the input movie search area. Shows a predermined set of horror movies.
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
            createButtons(movie, searchMovies, i)
            category.appendChild(movie);
        };
    
        createFiller(category, searchMovies.length - 1);
        movieArea.appendChild(category);
    }
});


// Shows all the listed personal movies.
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

// Shows all the marked as seen movies.
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

// Home script, sends back to home when home button is clicked.
homeButton.addEventListener("click", homeLoad);

// Login and register items. Doesn't actually register the user nor login, just acts with predetermined values.
loginOpenButton.addEventListener("click", e => {
    if (registerArea.style.visibility == "visible") {
        registerArea.style.visibility = "hidden";
    }
    else if (loginArea.style.visibility == "hidden") {
        if (!loggedIn) {
            loginArea.style.visibility = "visible";
        }
        else {
            logoutArea.style.visibility = "visible";
        }
    }
    else {
        loginArea.style.visibility = "hidden";
    }
});

logoutButton.addEventListener("click", e => {
    loggedIn = false;
    homeLoad();
    logoutArea.style.visibility = "hidden";
    loginOpenButton.innerText = "Login";
});

loginButton.addEventListener("click", e => {
    loggedIn = true;
    homeLoad();
    loginArea.style.visibility = "hidden";
    loginOpenButton.innerText = "Jack";
});

movieArea.addEventListener("click", e => {
    shortInfo.style.visibility = "hidden";
});

registerButton.addEventListener("click", e => {
    loginArea.style.visibility = "hidden";
    registerArea.style.visibility = "visible";
});
