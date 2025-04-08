import { fetchMovieMedia } from "./fetchMovieMedia.js";
import { keywordsFetch } from "./keywordsFetch.js";
import { creditsFetch } from "./creditsFetch.js";
import { fetchMovieDetails } from "./fetchMovieDetails.js";

import { options } from "./apiDependencies.js";
import { display_error } from "./displayError.js";
import { getPageContent } from "./getPageContent.js";

function generateMainContent(container) {
  container.innerHTML = `
  <section>
      <div class="search-container" id="search-container">
          <input type="text" class="moving-input" autocomplete="off" placeholder="Search for a movie, tv show, person..." id="movie-search-box" />
          <div class="search-list" id="search-list"></div>
      </div>
  </section>

  <section>
      <div class="search-box">
        <img
          src="./assets/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg"
          alt="main-page-backdrop"
          class="main-page-backdrop"
        />
        <div class="text-on-image">
          <h1>Welcome.</h1>
          <p>
            Millions of movies, TV shows, and people to discover. Explore now.
          </p>
        </div>
      </div>
    </section>

  <section class="movie-main-container">
      <section class="movie-section" id="trending">
          <div class="movie-header" >
              <h3>Trending</h3>
              <div class="movie-date">
                  <button class="btn active" id="today">Today</button>
                  <button class="btn" id="week">This week</button>
              </div>
          </div>
          <div class="movies-container" id="trending-movies"></div>
      </section>
      
      <section class="movie-section" id="popular">
          <div class="movie-header">
              <h3>What's Popular</h3>
              <div class="movie-date">
                  <button class="btn active" id="streaming">Streaming</button>
              </div>
          </div>
          <div class="movies-container" id="popular-movies"></div>
      </section>

      <section class="movie-section" id="free">
          <div class="movie-header">
              <h3>Free To Watch</h3>
              <div class="movie-date">
                  <button class="btn active" id="free-movies-btn">Movies</button>
                  <button class="btn" id="tv-free">TV</button>
              </div>
          </div>
          <div class="movies-container" id="free-movies"></div>
      </section>
  </section>`;
  const trendingMoviesContainer = document.getElementById("trending-movies");
  const popularMoviesContainer = document.getElementById("popular-movies");
  const freeMoviesContainer = document.getElementById("free-movies");
  const trendingDayBtn = document.getElementById("today");
  const trendingWeekBtn = document.getElementById("week");
  const freeToWatchMovies = document.getElementById("free-movies-btn");
  const freeToWatchTv = document.getElementById("tv-free");
  const movieSearchBox = document.getElementById("movie-search-box");
  const searchList = document.getElementById("search-list");
  const searchContainer = document.getElementById("search-container");

  const main_page_backdrop = document.querySelector(".main-page-backdrop");

  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((res) => res.json())
    .then((res) => {
      main_page_backdrop.setAttribute(
        "src",
        `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${
          res.results[Math.floor(Math.random() * 20)].backdrop_path
        }`
      );
      main_page_backdrop.style.backgroundColor = "rgba(0,0,0,.2)";
    })
    .catch((err) => console.error(err));

  const BASE_URL = "https://api.themoviedb.org/3";

  let movies = [];
  let loading = false;
  const fetchMovies = async (urlToFetch, moviesContainer) => {
    try {
      loading = true;
      moviesContainer.innerHTML = "<p>Loading . . . </p>";
      const res = await fetch(`${BASE_URL}${urlToFetch}`, options);
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
      displayMovies(movies, moviesContainer);
      loading = false;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  function displayMovies(movieList, moviesContainerToDisplay) {
    moviesContainerToDisplay.innerHTML = "";
    movieList.forEach((movie) => {
      const cardDiv = document.createElement("div");
      cardDiv.setAttribute("id", `${movie.id}`);
      cardDiv.classList.add("card");
      cardDiv.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path
                }" alt="${movie.title}" />  
                <h3>${movie.title}</h3>
                <p>${
                  movie.releaseDate
                    ? `${movie.releaseDate[2]}-${movie.releaseDate[1]}, ${movie.releaseDate[0]}`
                    : "Release date not available"
                }</p>`;
      moviesContainerToDisplay.appendChild(cardDiv);
    });

    moviesContainerToDisplay.addEventListener("click", (event) => {
      const movieItem = event.target.closest(".card");
      if (movieItem) {
        const movieId = movieItem.getAttribute("id");

        getPageContent("about");
        if (freeToWatchTv.classList.contains("active")) {
          display("tv", movieId);
          window.scrollTo(0, 0);
        } else {
          display("movie", movieId);
          window.scrollTo(0, 0);
        }
      }
    });
  }
  fetchMovies("/trending/movie/day?language=en-US", trendingMoviesContainer);
  fetchMovies("/movie/popular?language=en-US&page=1", popularMoviesContainer);
  fetchMovies(
    `/discover/movie?&watch_region=US&with_watch_monetization_types=free`,
    freeMoviesContainer
  );

  trendingWeekBtn.addEventListener("click", () => {
    fetchMovies("/trending/movie/week?language=en-US", trendingMoviesContainer);
    trendingWeekBtn.classList.add("active");
    trendingDayBtn.classList.remove("active");
  });

  trendingDayBtn.addEventListener("click", () => {
    fetchMovies("/trending/all/day?language=en-US", trendingMoviesContainer);
    trendingDayBtn.classList.add("active");
    trendingWeekBtn.classList.remove("active");
  });

  freeToWatchTv.addEventListener("click", () => {
    fetchMovies(
      "/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
      freeMoviesContainer
    );

    freeToWatchTv.classList.add("active");
    freeToWatchMovies.classList.remove("active");
  });

  freeToWatchMovies.addEventListener("click", () => {
    fetchMovies(
      `/discover/movie?&watch_region=US&with_watch_monetization_types=free`,
      freeMoviesContainer
    );
    freeToWatchMovies.classList.add("active");
    freeToWatchTv.classList.remove("active");
  });

  async function loadMovies(searchTerm) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
      options
    );
    const data = await res.json();
    displayMovieList(data.results.slice(0, 10));
  }

  function searchMovies() {
    const query = movieSearchBox.value.trim("").toLowerCase();
    if (query.length > 0) {
      searchList.classList.remove("hide-search-list");
      loadMovies(query);
    } else {
      searchList.classList.add("hide-search-list");
    }
  }

  function displayMovieList(movies) {
    searchList.innerHTML = "";
    movies.forEach((movie) => {
      const movieListItem = document.createElement("div");
      movieListItem.classList.add("search-list-item");
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : "./assets/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg";
      movieListItem.innerHTML = `
      <div class="search-list-item" id="${movie.id}">
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
  }

  searchList.addEventListener("click", (event) => {
    if (event.target.classList.contains("search-list-item")) {
      const movieId = event.target.getAttribute("id");
      getPageContent("about");
      display("movie", movieId);
      window.scrollTo(0, 0);
    }
  });

  movieSearchBox.addEventListener("keyup", searchMovies);
  document.addEventListener("click", (event) => {
    if (!searchContainer.contains(event.target)) {
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.getElementById("main-container");
  generateMainContent(mainContainer);
});

const home_page = document.querySelector(".home-page");
home_page.style.cssText = "cursor: pointer;";

home_page.addEventListener("click", function () {
  getPageContent("home");

  const home_container = document.querySelector(".home-container");

  generateMainContent(home_container);
});

/////////////////////////////////////////////////////////////////////////
// merged scripts
/////////////////////////////////////////////////////////////////////////

function display(type, movie_id) {
  const shimmerOverlay = document.querySelector(".shimmer-overlay");

  shimmerOverlay.classList.remove("hidden");

  Promise.all([
    fetchMovieDetails(type, movie_id),
    fetchMovieMedia(type, movie_id),
    creditsFetch(type, movie_id),
    keywordsFetch(type, movie_id),
  ])
    .catch((err) => {
      //new error should be thrown
      console.log(err);
      display_error(err);
    })
    .finally(() => {
      shimmerOverlay.classList.add("hidden");
    });
}
