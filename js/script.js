// https://github.com/amine-lotfi

const APIKey = "300a0375";

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const resultWrapper = document.getElementById("result-wrapper");
const customModal = new bootstrap.Modal(document.getElementById("customModal"));

// event listener for user input
searchInput.addEventListener("input", (event) => {

    const movieName = event.target.value.trim();
    
    if (movieName) {

        fetchAndDisplayMovieData(movieName);

    } else {

        // to clear the result wrapper if input is empty
        resultWrapper.innerHTML = ""; 

    }

});

// to fetch and display movie data
async function fetchAndDisplayMovieData(movieName) {

    try {

        const APIUrl = `https://www.omdbapi.com/?apikey=${APIKey}&s=${movieName}`;

        const response = await fetch(APIUrl);
        const data = await response.json();

        if (data.Response === "True") {

            displayMovieCards(data.Search);

        } else {

            console.error("No movies found.");

        }
    } catch (error) {

        console.error("Error fetching data:", error);

    }

}

// to display movie cards
function displayMovieCards(movies) {

    if (!movies || movies.length === 0) {

        console.error("No movies found.");
        return;

    }

    const cardHTML = movies.map(movie => `
        <div class="col-md-4">
            <div class="card">
                <img src="${movie.Poster}" class="card-img-top" alt="Movie Poster">
                <div class="card-body text-center">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">Year: ${movie.Year}</p>
                    <button class="btn" id="search-btn" onclick="showMovieDetails('${movie.imdbID}')">Show Details</button>
                </div>
            </div>
        </div>
    `).join("");

    resultWrapper.innerHTML = cardHTML;
}

// to fetch and display movie details
async function fetchAndDisplayMovieDetails(movieID) {

    try {

        const APIUrl = `https://www.omdbapi.com/?apikey=${APIKey}&i=${movieID}`;

        const response = await fetch(APIUrl);
        const data = await response.json();

        if (data.Response === "True") {

            displayMovieDetails(data);

        } else {

            console.error("No movie details found.");

        }
    } catch (error) {

        console.error("Error fetching movie details:", error);
        
    }

}

// to display movie details in custom modal
function displayMovieDetails(movieData) {

    const customModalBody = document.getElementById("customModalBody");
    
    customModalBody.innerHTML = `
        <img src="${movieData.Poster}" class="img-fluid mb-3" alt="Movie Poster">
        <p>Plot: ${movieData.Plot}</p>
        <p>Director: ${movieData.Director}</p>
        <p>Actors: ${movieData.Actors}</p>
        <p>IMDB Rating: ${movieData.imdbRating}</p>
    `;

    customModal.show(); // to show the custom modal

}

// to show movie details when "Show Details" button is clicked
function showMovieDetails(movieID) {

    fetchAndDisplayMovieDetails(movieID);

}