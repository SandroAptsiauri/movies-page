const pages = {
  home: `
        <ul class="jajajaj">
          <li id="257094">Holland</li>
          <li id="1197306">sss</li>
          <li id="1254786">fff</li>
          <li id="447273">ppp</li>
        </ul>`,
  about: `<div class="main-container">
          </div>`,
};

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDhiYzlkMzUyMzdkNjQyM2FjZWM1YTRiOGJlY2RjOCIsIm5iZiI6MTc0MzA2Mjg3Ni44OTIsInN1YiI6IjY3ZTUwNzVjNWYwYmZhMGI2NmJhMmQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gkl9UhvpS-aMJy9huhth-nFaqMTtnzrMmixbTwcVfCs"}`,
    accept: "application/json",
  },
};

const movie_ids = [257094, 1197306, 1254786, 447273, 696506];

const jajajaj = document.querySelector(".jajajaj");
Array.from(jajajaj.children).forEach((cur) => {
  cur.addEventListener("click", function () {
    getPageContent("about");
    display(cur.id);
  });
});

const header_link = document.querySelector(".header_link");

header_link.addEventListener("click", function () {
  document.getElementById("content").innerHTML = "";
  getPageContent("home");
  const jajajaj = document.querySelector(".jajajaj");
  Array.from(jajajaj.children).forEach((cur) => {
    cur.addEventListener("click", function () {
      getPageContent("about");
      display(cur.id);
    });
  });

  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => display_error());
});

const move = document.querySelector(".gilgamesh");

move.addEventListener("click", function () {
  const movie_id = 1197306;

  document.getElementById("content").innerHTML = "";

  getPageContent("about");

  display(movie_id);
});

function display_error() {
  const main_container = document.querySelector(".main-container");

  main_container.innerHTML = `<div>Couldn't Load The Movie. Please Try Again Later</div>`;
}

function display(movie_id) {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.style.display = "flex";

  async function fetchMovieDetails(id) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch credits data");
      }

      const res = await response.json();

      const main_container = document.querySelector(".main-container");

      main_container.innerHTML = `<div class="details-nav-cont">
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
                      <span class="movie-title">${res.original_title}</span>
                      <span class="release-date">(${
                        res.release_date.split("-")[0]
                          ? res.release_date.split("-")[0]
                          : res.release_date
                      })</span>
                    </h2>
                    <div class="movies-facts">
                      <span class="certification">TV-MA</span>
                      <span class="genres">
                        <a href="#" class='genres-list'>${
                          res.genres[0].name
                        }</a>
                      </span>
                    </div>
                  </div>
                  <div class="movie-icons">
                    <div class="movie-details-icons">
                      <div class="icons-stats">
                        <div class="user-score">
                          <div class="score-percent">${res.popularity.toFixed(
                            2
                          )}</div>
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
                      <p>${res.overview}</p>
                    </div>
                    <ol class="people">
                      <li class="profile">
                        <strong><p class="character-name"></p></strong>
                        <p class="character-pos"></p>
                      </li>
                      <li class="profile"></li>
                      <li class="profile"></li>
                    </ol>
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
        `;
    } catch (err) {
      display_error();
    }
  }

  async function fetchMovieMedia(id) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/images`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch credits data");
      }

      const resMedia = await response.json();

      const image = document.querySelector(".poster-image");

      image.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/w500" + `${resMedia.posters[0].file_path}`
      );

      const movie_details = document.querySelector(".movie-details");

      movie_details.style.backgroundImage = `url(
      https://image.tmdb.org/t/p/w500${resMedia.posters[0].file_path}
    )`;

      const backdropsCount = document.querySelector(
        ".media-list-backdrops-num"
      );
      backdropsCount.textContent = resMedia.backdrops.length;

      const logosCount = document.querySelector(".list-logos-num");
      logosCount.textContent = resMedia.logos.length;

      const postersCount = document.querySelector(".list-posters-num");
      postersCount.textContent = resMedia.posters.length;

      const bck = document.querySelector(".bck-drp");
      const lgs = document.querySelector(".lgs");
      const pst = document.querySelector(".pst");
      const media_scroller_list = document.querySelector(
        ".media-scroller-list"
      );

      async function media_list() {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/images`,
          options
        );
        const res = await response.json();

        if (bck.classList.contains("active")) {
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
        }

        if (lgs.classList.contains("active")) {
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
        }

        if (pst.classList.contains("active")) {
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
        }
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
      display_error();
    }
  }

  async function creditsFetch(id) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch credits data");
      }

      const res = await response.json();

      const olCrew = document.querySelector(".people");

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

      const olCast = document.querySelector(".scroller-cast-list");

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
    } catch (err) {
      display_error();
    }
  }

  async function keywordsFetch(id) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/keywords`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch keyframes data");
      }

      const res = await response.json();

      res.keywords.forEach((cur) => {
        const keywords_ul = document.querySelector(".col-2-keywords-ul");

        const li = document.createElement("li");
        const p = document.createElement("p");

        p.textContent = cur.name;

        li.append(p);
        keywords_ul.append(li);
      });
    } catch (err) {
      display_error();
    }
  }

  Promise.all([
    fetchMovieDetails(movie_id),
    fetchMovieMedia(movie_id),
    creditsFetch(movie_id),
    keywordsFetch(movie_id),
  ])
    .then(() => {
      loadingOverlay.style.display = "none";
    })
    .catch((err) => {
      console.log(err);
      loadingOverlay.style.display = "none";
    });
}

// {
/* <body onload="getPageContent('home');">
      <header class="header">
        <a href="./index.html" class="header_logo">Fletcher Flyer</a>
        <ul class="header_nav">
          <li class="header_list" style="line-height: 50px">
            <a href="#" class="header_link" onclick="getPageContent('home')"
              >Home</a
            >
            <a href="#" class="header_link" onclick="getPageContent('about')"
              >About</a
            >
          </li>
        </ul>
      </header>
      <div id="content"></div>
    </body> */
// }

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
  document.getElementById("content").innerHTML = contentToReturn;
}
