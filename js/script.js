const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDhiYzlkMzUyMzdkNjQyM2FjZWM1YTRiOGJlY2RjOCIsIm5iZiI6MTc0MzA2Mjg3Ni44OTIsInN1YiI6IjY3ZTUwNzVjNWYwYmZhMGI2NmJhMmQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gkl9UhvpS-aMJy9huhth-nFaqMTtnzrMmixbTwcVfCs",
  },
};

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
          src="./images/house-of-the-dragon-s2-ka-1920.avif"
          alt="House of the Dragon"
          class="house-of-dragon-img"
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

  const BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = "648bc9d35237d6423acec5a4b8becdc8";

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
      console.log(event.target);
      const movieItem = event.target.closest(".card");
      if (movieItem) {
        const movieId = movieItem.getAttribute("id");
        console.log(movieId);

        getPageContent("about");
        if (freeToWatchTv.classList.contains("active")) {
          console.log(freeToWatchTv.classList);
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
  // const searchTerm = () => {
  //   const query = searchInput.value.toLowerCase();
  //   const filteredMovies = popularMovies.filter((movie) =>
  //     movie.title.toLowerCase().includes(query)
  //   );
  //   displayMovies(filteredMovies);
  // };

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

/////////////////////////////////////////////////////////////////////////
// merged scripts
/////////////////////////////////////////////////////////////////////////

const pages = {
  home: `
        <ul class="ul-list">
        </ul>`,
  about: `<div class="main-container">
            <div class="details-nav-cont">
              <ul class="details-nav">
                <li class="nav-item">
                  Overview
                  <svg
                    viewbox="0 0 512 512"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 352 128 160h256z"></path>
                  </svg>
                </li>
                <li class="nav-item">
                  Media
                  <svg
                    viewbox="0 0 512 512"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 352 128 160h256z"></path>
                  </svg>
                </li>
                <li class="nav-item">
                  Fandom
                  <svg
                    viewbox="0 0 512 512"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 352 128 160h256z"></path>
                  </svg>
                </li>
                <li class="nav-item">
                  Share
                  <svg
                    viewbox="0 0 512 512"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 352 128 160h256z"></path>
                  </svg>
                </li>
              </ul>
            </div>
          <div class="movie-details">
                    <div class="inside" >
                <div class="double-inside">
                  <div class="movie-content">
                    <div class="movie-poster-wrapper">
                      <div class="movie-poster">
                        <div class="image-content">
                          <div class="blured">
                            <img
                            class='poster-image'
                              src="./assets/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="movie-info">
                      <section class="movie-info-inside">
                        <div class="movie-title-cont">
                          <h2 class="movies-10">
                            <span class="movie-title"></span>
                            <span class="release-date"></span>
                          </h2>
                          <div class="movies-facts">
                            <span class="certification">TV-MA</span>
                            <span class="genres">
                              <a href="#" class='genres-list'></a>
                            </span>
                          </div>
                        </div>
                        <div class="movie-icons">
                          <div class="movie-details-icons">
                            <div class="icons-stats">
                              <div class="user-score">
                                <div class="score-percent"></div>
                                <div class="user-score-title">User Score</div>
                              </div>
                              <div class="your-vibe">
                                What's your <span>Vibe</span>?
                              </div>
                            </div>
                            <div class="icons-actions">
                              <div class="tooltip"><img src='./assets/list.png'/></div>
                              <div class="tooltip heart"><img src='./assets/heart-svgrepo-com.svg'/></div>
                              <div class="tooltip"><img src='./assets/bookmark.png'/></div>
                              <div class="trailer-player">Play Trailer</div>
                            </div>
                          </div>
                        </div>
                        <div class="movie-header-info">
                          <h3 class="header-tagline"></h3>
                          <h3 class="header">Overview</h3>
                          <div class="overview">
                            <p class='overview-p'></p>
                          </div>
                          <ol class="people"></ol>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div
              class="column-content-wrapper"
              style="display: flex; justify-content: center"
            >
              <div class="content-wrapper">
                <div class="content-wrapper-col-1">
                  <h3 class="series-cast">Top Billed Cast</h3>
                  <div class="scroller-cast">
                    <ol class="scroller-cast-list"></ol>
                    <div class="full-cast-crew">Full Cast & Crew</div>
                  </div>
                  <div class="details-media">
                    <div class="media-list">
                      <h3>Media</h3>
                      <ul>
                        <li class="bck-drp active">
                          Backdrops <span class="media-list-backdrops-num"></span>
                        </li>
                        <li class="pst">
                          Posters <span class="list-posters-num"></span>
                        </li>
                        <li class="lgs">
                          Logos <span class="list-logos-num"></span>
                        </li>
                      </ul>
                    </div>
                    <div class="media-scroller-cont">
                      <div class="media-scroller-list"></div>
                    </div>
                  </div>
                </div>
                <div class="content-wrapper-col-2">
                  <div class="split-column">
                    <div style="width: 100%">
                      <div class="col-2-facts">
                        <button class="watch-now">Watch Now</button>
                        <div style="margin-right: 10px">Network</div>
                      </div>
                      <div
                        class="social-links"
                        style="height: 30px; margin-bottom: 30px"
                      >
                        <img
                          src="./assets/link.png"
                          alt="link"
                          style="height: 100%"
                        />
                      </div>
                      <h4
                        style="
                          font-size: 1.1em;
                          font-weight: 600;
                          margin-bottom: 10px;
                        "
                      >
                        Facts
                      </h4>
                      <p style="margin: 0 0 20px; font-size: 1em">
                        <strong style="display: block; margin-bottom: 3px"
                          >Status</strong
                        >
                        Movies
                      </p>
                      <p style="margin: 0 0 20px; font-size: 1em">
                        <strong style="display: block; margin-bottom: 3px"
                          >Type</strong
                        >
                        Scripted
                      </p>
                      <p style="margin: 0 0 20px; font-size: 1em">
                        <strong style="display: block; margin-bottom: 3px"
                          >Original Language</strong
                        >
                        English
                      </p>
                      <div class="col-2-keywords">
                        <h4>Keywords</h4>
                        <ul class="col-2-keywords-ul"></ul>
                      </div>
                    </div>
                    <div style="width: 100%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>`,
};

function display_error(err) {
  const main_container = document.querySelector(".main-container");

  if (document.querySelector(".error-message")) return;

  main_container.innerHTML = `
  <div class="error-message">
    <span class="error-emoji">⚠️</span>
    <h2>Oops! Something went wrong.</h2>
    <p>We couldn't load the movie. Please try again later.</p>
    <p class="error-details">🛑 Error: ${err.message}</p>
    <button class="retry-btn" onclick="window.location.reload()">🔄 Retry</button>
  </div>
`;
}

function display(type, movie_id) {
  const shimmerOverlay = document.querySelector(".shimmer-overlay");

  shimmerOverlay.classList.remove("hidden");

  async function fetchMovieDetails(id) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Movie Details");
      }

      const res = await response.json();

      const movie_title = document.querySelector(".movie-title");
      const release_date = document.querySelector(".release-date");
      const genres_list = document.querySelector(".genres-list");
      const score_percent = document.querySelector(".score-percent");
      const overview_p = document.querySelector(".overview-p");

      if (type === "tv") {
        movie_title.textContent =
          res.name || "The Name of the show in not available";
        release_date.textContent = `(${
          res.first_air_date?.split("-")[0]
            ? res.first_air_date.split("-")[0]
            : res.first_air_date || "First Air Date in not available"
        })`;
      } else {
        movie_title.textContent =
          res.original_title || "Title is not available";
        release_date.textContent = `(${
          res.release_date?.split("-")[0]
            ? res.release_date.split("-")[0]
            : res.release_date || "Release Date is not available"
        })`;
      }

      movie_title.textContent === "Title is not available" ||
      (movie_title.textContent === "The Name of the show in not available" &&
        type === "tv")
        ? (movie_title.style.color = "#ff8484")
        : null;

      release_date.textContent === "(Release Date is not available)" ||
      (type === "tv" &&
        release_date.textContent === "(First Air Date in not available)")
        ? (release_date.style.color = "#ff8484")
        : null;

      genres_list.textContent = res.genres[0].name || "Genres is not available";
      genres_list.textContent === "Genres is not available"
        ? (genres_list.style.color = "#ff8484")
        : null;

      score_percent.textContent =
        res.popularity?.toFixed(2) || "Pop Score is not available";
      score_percent.textContent === "Pop Score is not available"
        ? (score_percent.style.cssText =
            "color: #ff8484; font-size: 1rem; text-align: center;")
        : null;

      overview_p.textContent =
        !res.overview || res.overview === ""
          ? "Overview is not available"
          : res.overview;
      overview_p.textContent === "Overview is not available"
        ? (overview_p.style.cssText = "color: #ff8484; font-size: 2.5rem;")
        : null;
    } catch (err) {
      display_error(err);
    }
  }

  async function fetchMovieMedia(id) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/images`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images and other media.");
      }

      const resMedia = await response.json();

      const image = document.querySelector(".poster-image");
      image.setAttribute(
        "src",
        resMedia.posters[0].file_path
          ? `https://image.tmdb.org/t/p/w500${resMedia.posters[0].file_path}`
          : "./assets/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg"
      );

      const movie_details = document.querySelector(".movie-details");
      movie_details.style.backgroundImage = resMedia.posters[0].file_path
        ? `url(
      https://image.tmdb.org/t/p/w500${resMedia.posters[0].file_path}
    )`
        : null;

      const backdropsCount = document.querySelector(
        ".media-list-backdrops-num"
      );
      backdropsCount.textContent = resMedia.backdrops?.length;

      const logosCount = document.querySelector(".list-logos-num");
      logosCount.textContent = resMedia.logos?.length;

      const postersCount = document.querySelector(".list-posters-num");
      postersCount.textContent = resMedia.posters?.length;

      const bck = document.querySelector(".bck-drp");
      const lgs = document.querySelector(".lgs");
      const pst = document.querySelector(".pst");
      const media_scroller_list = document.querySelector(
        ".media-scroller-list"
      );

      async function media_list() {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${movie_id}/images`,
          options
        );
        const res = await response.json();

        if (bck.classList.contains("active")) {
          if (res.backdrops && res.backdrops.length !== 0) {
            res.backdrops.forEach((cur) => {
              const backdrop = document.createElement("div");
              backdrop.setAttribute("class", "backdrop");

              const backdrop_img = document.createElement("img");
              if (cur.profile_path === null) return;

              backdrop_img.setAttribute(
                "src",
                "https://image.tmdb.org/t/p/w500" + `${cur.file_path}`
              );
              backdrop.append(backdrop_img);
              media_scroller_list.append(backdrop);
            });
          } else {
            media_scroller_list.textContent = "Backdrops Data Not Available";
          }
        }

        if (lgs.classList.contains("active")) {
          if (res.logos && res.logos.length !== 0) {
            res.logos.forEach((cur) => {
              const logo = document.createElement("div");
              logo.setAttribute("class", "logo");

              const logo_img = document.createElement("img");
              if (cur.profile_path === null) return;

              logo_img.setAttribute(
                "src",
                "https://image.tmdb.org/t/p/w500" + `${cur.file_path}`
              );
              logo.append(logo_img);

              media_scroller_list.append(logo);
            });
          } else {
            media_scroller_list.textContent = "Logos Data Not Available";
          }
        }

        if (pst.classList.contains("active")) {
          if (res.posters && res.posters.length !== 0) {
            res.posters.forEach((cur) => {
              const poster = document.createElement("div");
              poster.setAttribute("class", "poster");

              const poster_img = document.createElement("img");
              if (cur.profile_path === null) return;

              poster_img.setAttribute(
                "src",
                "https://image.tmdb.org/t/p/w500" + `${cur.file_path}`
              );
              poster.append(poster_img);

              media_scroller_list.append(poster);
            });
          } else {
            media_scroller_list.textContent = "Posters Data Not Available";
          }
        }

        media_scroller_list.textContent === `Backdrops Data Not Available` ||
        media_scroller_list.textContent === `Posters Data Not Available` ||
        media_scroller_list.textContent === `Logos Data Not Available`
          ? (media_scroller_list.style.cssText =
              "font-weight: 700; font-size: 2rem; padding: 20px 30px; color: rgb(255, 132, 132); overflow-x: hidden;")
          : null;
      }

      bck.addEventListener("click", function () {
        media_scroller_list.innerHTML = "";
        lgs.classList.remove("active");
        pst.classList.remove("active");

        bck.classList.add("active");
        media_list();
      });

      lgs.addEventListener("click", function () {
        media_scroller_list.innerHTML = "";

        lgs.classList.add("active");

        bck.classList.remove("active");
        pst.classList.remove("active");
        media_list();
      });

      pst.addEventListener("click", function () {
        media_scroller_list.innerHTML = "";

        lgs.classList.remove("active");
        bck.classList.remove("active");

        pst.classList.add("active");
        media_list();
      });

      media_list();
    } catch (err) {
      const media_scroller_list = document.querySelector(
        ".media-scroller-list"
      );
      media_scroller_list.textContent = "Media Data Is Not Available.";
      media_scroller_list.style.cssText =
        "overflow-x: hidden; font-size: 4rem; padding: 6rem 11rem; font-weight: 700; color: #ff8484";
      display_error(err);
    }
  }

  async function creditsFetch(id) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch credits data.");
      }

      const res = await response.json();

      const olCrew = document.querySelector(".people");

      if (!res.crew || res.crew.length === 0) {
        olCrew.textContent = "Crew Data Is Not Available.";
        olCrew.style.cssText =
          "font-weight: 700; font-size: 2rem; padding: 2rem 3rem; color:#ff8484";
      } else {
        res.crew.forEach((cur) => {
          if (cur.job === "Director" || cur.job === "Producer") {
            const li = document.createElement("li");
            li.setAttribute("class", "profile");

            const p_name = document.createElement("p");
            p_name.setAttribute("class", "character-name");
            p_name.textContent = cur.original_name;

            const p_job = document.createElement("p");
            p_job.setAttribute("class", "character-job");
            p_job.textContent = cur.job;

            olCrew.appendChild(li);
            li.append(p_name, p_job);
          }
        });
      }

      const olCast = document.querySelector(".scroller-cast-list");

      if (!res.cast || res.cast.length === 0) {
        olCast.textContent = "Cast Data Is Not Available.";
        olCast.style.fontWeight = "700";
        olCast.style.fontSize = "2rem";
        olCast.style.padding = "20px 30px";
        olCast.style.color = "#ff8484";
        olCast.style.overflowX = "hidden";
      } else {
        res.cast.forEach((cur) => {
          const li = document.createElement("li");
          li.setAttribute("class", "scroller-card");

          const scroller_card_img = document.createElement("img");
          if (cur.profile_path === null) {
          }

          scroller_card_img.setAttribute(
            "src",
            cur.profile_path === null
              ? "./assets/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
              : "https://image.tmdb.org/t/p/w500" + `${cur.profile_path}`
          );

          const p__actor_name = document.createElement("p");
          p__actor_name.setAttribute("class", "scroller-actor-name");
          p__actor_name.textContent = cur.name;

          const p_character_name = document.createElement("p");
          p_character_name.setAttribute("class", "scroller-character-name");
          p_character_name.textContent = cur.character;

          olCast.appendChild(li);
          li.append(scroller_card_img, p__actor_name, p_character_name);
        });
      }
    } catch (err) {
      console.log(err);
      display_error(err);
    }
  }

  async function keywordsFetch(id) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/keywords`,
        options
      );

      // if (!response.ok) {
      //   throw new Error("Failed to fetch Keywords data.");
      // }

      const res = await response.json();

      const keywords_ul = document.querySelector(".col-2-keywords-ul");

      if (
        (!res.keywords || res.keywords.length === 0) &&
        (!res.results || res.results.length === 0)
      ) {
        keywords_ul.textContent = "Keywords Data Is Not Available.";
        keywords_ul.style.cssText =
          "font-weight: 700; font-size: 2rem; color:#ff8484";
      } else {
        let newRes;
        if (type === "tv") {
          newRes = res.results.slice(0, 10);
        } else {
          newRes = res.keywords.slice(0, 10);
        }
        console.log(newRes);
        newRes.forEach((cur) => {
          const li = document.createElement("li");
          const p = document.createElement("p");

          p.textContent = cur.name;

          li.append(p);
          keywords_ul.append(li);
        });
      }
    } catch (err) {
      // display_error(err);
    }
  }

  fetchMovieDetails(movie_id)
    .then(() => {
      return Promise.all([
        fetchMovieMedia(movie_id),
        creditsFetch(movie_id),
        keywordsFetch(movie_id),
      ]);
    })
    .catch((err) => {
      console.log(err);
      display_error();
    })
    .finally(() => {
      shimmerOverlay.classList.add("hidden");
    });
}

function getPageContent(page) {
  let contentToReturn;
  switch (page) {
    case "home":
      contentToReturn = pages.home;
      break;
    case "about":
      contentToReturn = pages.about;
      break;
    default:
      contentToReturn = pages.home;
      break;
  }
  document.getElementById("main-container").innerHTML = contentToReturn;
}
