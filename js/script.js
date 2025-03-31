document.addEventListener("DOMContentLoaded", () => {
  const trendingMoviesContainer = document.getElementById("trending-movies");
  const popularMoviesContainer = document.getElementById("popular-movies");
  const freeMoviesContainer = document.getElementById("free-movies");
  const trendingDayBtn = document.getElementById("today");
  const trendingWeekBtn = document.getElementById("week");
  const searchInput = document.querySelector(".input-on-image");
  const searchButton = document.querySelector(".input-button");

  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = "648bc9d35237d6423acec5a4b8becdc8";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDhiYzlkMzUyMzdkNjQyM2FjZWM1YTRiOGJlY2RjOCIsIm5iZiI6MTc0MzA2Mjg3Ni44OTIsInN1YiI6IjY3ZTUwNzVjNWYwYmZhMGI2NmJhMmQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gkl9UhvpS-aMJy9huhth-nFaqMTtnzrMmixbTwcVfCs",
    },
  };

  // MOVIES FETCHING AND DISPLAYING THEM
  let movies = [];
  const fetchMovies = async (urlToFetch, moviesContainer) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3${urlToFetch}`,
        options
      );
      const data = await res.json();
      movies = data.results.map((movie) => ({
        ...movie,
        title: movie.name || movie.title,
        releaseDate: movie.release_date
          ? movie.release_date.split("-")
          : movie.first_air_date
          ? movie.first_air_date.split("-")
          : null,
      }));
      console.log(data.results);
      displayMovies(movies, moviesContainer);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  function displayMovies(movieList, moviesContainerToDisplay) {
    moviesContainerToDisplay.innerHTML = "";
    movieList.forEach((movie) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.innerHTML = `
       <div id=${movie.id}>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
        movie.title
      }" />
       </div>
        
        <h3>${movie.title}</h3>
        ${
          movie.releaseDate
            ? `
          <p>${movie.releaseDate[2]}-${movie.releaseDate[1]}, ${movie.releaseDate[0]}</p>
        `
            : `<p>Release date not available</p>`
        }
      `;
      moviesContainerToDisplay.appendChild(cardDiv);
    });
  }
  fetchMovies("/trending/all/day?language=en-US", trendingMoviesContainer);
  fetchMovies("/movie/popular?language=en-US&page=1", popularMoviesContainer);
  fetchMovies(
    `/discover/movie?api_key=${API_KEY}&watch_region=US&with_watch_monetization_types=free`,
    freeMoviesContainer
  );
  trendingWeekBtn.addEventListener("click", () => {
    fetchMovies("/trending/all/week?language=en-US", trendingMoviesContainer);
    trendingWeekBtn.classList.add("active");
    trendingDayBtn.classList.remove("active");
  });
  trendingDayBtn.addEventListener("click", () => {
    fetchMovies("/trending/all/day?language=en-US", trendingMoviesContainer);
    trendingDayBtn.classList.add("active");
    trendingWeekBtn.classList.remove("active");
  });
  // const searchTerm = () => {
  //   const query = searchInput.value.toLowerCase();
  //   const filteredMovies = popularMovies.filter((movie) =>
  //     movie.title.toLowerCase().includes(query)
  //   );
  //   displayMovies(filteredMovies);
  // };
});
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const searchContainer = document.getElementById("search-container");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDhiYzlkMzUyMzdkNjQyM2FjZWM1YTRiOGJlY2RjOCIsIm5iZiI6MTc0MzA2Mjg3Ni44OTIsInN1YiI6IjY3ZTUwNzVjNWYwYmZhMGI2NmJhMmQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gkl9UhvpS-aMJy9huhth-nFaqMTtnzrMmixbTwcVfCs",
  },
};

const loadMovies = async (searchTerm) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
    options
  );
  const data = await res.json();
  displayMovieList(data.results.slice(0, 10));
};

const searchMovies = () => {
  const query = movieSearchBox.value.trim("").toLowerCase();
  if (query.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(query);
  } else {
    searchList.classList.add("hide-search-list");
  }
};
const displayMovieList = (movies) => {
  searchList.innerHTML = "";
  movies.forEach((movie) => {
    const movieListItem = document.createElement("div");
    movieListItem.dataset.id = movie.id;
    movieListItem.classList.add("search-list-item");
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image";
    movieListItem.innerHTML = `
    <div class="search-list-item">
              <div class="search-list-thumbnail">
                <img
                  src="${posterUrl}"
                  alt="${movie.title} image"
                />
              </div>
              <div class="search-item-info">
                <h3>${movie.title}</h3>
              </div>
            </div>`;
    searchList.appendChild(movieListItem);
  });
};
document.addEventListener("click", (event) => {
  if (!searchContainer.contains(event.target)) {
    searchList.classList.add("hide-search-list");
    movieSearchBox.value = "";
  }
});
