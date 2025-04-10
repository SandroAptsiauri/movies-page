import { env } from "./env.js";
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
        <div id="image-box">
      <img src="./images/house-of-the-dragon-s2-ka-1920.avif" alt="House of the Dragon" class="house-of-dragon-img" />
        </div>
          <div class="text-on-image">
              <h1>Welcome.</h1>
              <p>Millions of movies, TV shows, and people to discover. <br/>Explore now.</p>
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
  const hamburgenMenu = document.getElementById("ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");
  const offScreenMenuNavigate = document.querySelector(".off-screen-menu-tags");

  offScreenMenuNavigate.addEventListener("click", () => {
    offScreenMenu.classList.remove("active");
    hamburgenMenu.classList.remove("active");
  });

  hamburgenMenu.addEventListener("click", () => {
    hamburgenMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.API_KEY}`,
    },
  };

  // MOVIES FETCHING AND DISPLAYING THEM
  let movies = [];
  let loading = false;
  const fetchMovies = async (urlToFetch, moviesContainer) => {
    try {
      loading = true;
      moviesContainer.innerHTML = "<p>Loading . . . </p>";
      const res = await fetch(`${env.BASE_URL}${urlToFetch}`, options);
      const data = await res.json();
      movies = data.results
        .filter((movie) => movie.poster_path)
        .map((movie) => ({
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
      cardDiv.classList.add("card");
      cardDiv.setAttribute("id", `${movie.id}`);
      cardDiv.innerHTML = `
       
  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
        movie.title
      }" />  
  <h3>${movie.title}</h3>
  <p>${
    movie.releaseDate
      ? `${movie.releaseDate[2]}-${movie.releaseDate[1]}, ${movie.releaseDate[0]}`
      : "Release date not available"
  }</p>
      `;
      moviesContainerToDisplay.appendChild(cardDiv);
    });
    moviesContainerToDisplay.addEventListener("click", (event) => {
      const movieItem = event.target.closest(".card");
      if (movieItem) {
        const movieId = movieItem.getAttribute("id");
        console.log(movieId);
      }
    });
  }
  fetchMovies("/trending/all/day?language=en-US", trendingMoviesContainer);
  fetchMovies("/movie/popular?language=en-US&page=1", popularMoviesContainer);
  fetchMovies(
    `/discover/movie?&watch_region=US&with_watch_monetization_types=free`,
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
    const filtered = data.results.filter((movie) => movie.poster_path);
    displayMovieList(filtered.slice(0, 10));
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
      movieListItem.setAttribute("id", `${movie.id}`);
      const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Image";
      movieListItem.innerHTML = `
                <div class="search-list-thumbnail">
                  <img
                    src="${posterUrl}"
                    alt="${movie.title} image"
                  />
                </div>
                <div class="search-item-info">
                  <h3>${movie.title}</h3>
                </div>`;
      searchList.appendChild(movieListItem);
    });
    searchList.addEventListener("click", (event) => {
      if (event.target.classList.contains("search-list-item")) {
        const movieId = event.target.getAttribute("id");
        console.log(movieId);
      }
    });
  }
  movieSearchBox.addEventListener("keyup", searchMovies);
  document.addEventListener("click", (event) => {
    if (!searchContainer.contains(event.target)) {
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
    }
  });
}
const mainContainer = document.getElementById("main-container");
document.addEventListener("DOMContentLoaded", () => {
  generateMainContent(mainContainer);
});
const logoBtn = document.getElementById("logo-btn");
logoBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
  generateMainContent(mainContainer);
});
