const pages = {
  "/home": `
        <div class="home-container">
        </div>`,
  "/about": `<div class="main-container">
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
                              src='../assets/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg'
                              alt="default movie icon"
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
                              <div class="tooltip"><img src='../assets/list.png'/></div>
                              <div class="tooltip heart"><img src='../assets/heart-svgrepo-com.svg'/></div>
                              <div class="tooltip"><img src='../assets/bookmark.png'/></div>
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
                    <div class="media-list" style='padding-top: 30px'>
                      <h3>Videos</h3>
                      <ul>
                        <li class="trailers active">
                          Trailers & Teasers <span class="media-list-trailers-num"></span>
                        </li>
                        
                      </ul>
                    </div>
                    <div class="media-scroller-cont-trailers">
                      <div class="media-scroller-list-trailers"></div>
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
                          src="../assets/link.png"
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

export function getPageContent(page) {
  let contentToReturn;
  switch (page) {
    case "/home":
      contentToReturn = pages["/home"];
      break;
    case "/about":
      contentToReturn = pages["/about"];
      break;
    default:
      contentToReturn = pages["/home"];
      break;
  }
  document.getElementById("main-container").innerHTML = contentToReturn;
}
