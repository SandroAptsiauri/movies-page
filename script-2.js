const html = {
  cc: `<div class="movie-details">
        <div class="inside">
          <div class="double-inside">
            <div class="movie-content">
              <div class="movie-poster-wrapper">
                <div class="movie-poster">
                  <div class="image-content">
                    <div class="blured">
                      <img
                        src="https://media.themoviedb.org/t/p/w600_and_h900_bestv2/byC5kuHuqHU2FGFI8grcnrm8JOG.jpg"
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
                        <a href="#"></a>
                      </span>
                    </div>
                  </div>
                  <div class="movie-icons">
                    <div class="movie-details-icons">
                      <div class="icons-stats">
                        <div class="user-score">
                          <div class="score-percent">61</div>
                          <div class="user-score-title">User Score</div>
                        </div>
                        <div class="your-vibe">
                          What's your <span>Vibe</span>?
                        </div>
                      </div>
                      <div class="icons-actions">
                        <div class="tooltip"></div>
                        <div class="tooltip"></div>
                        <div class="tooltip"></div>
                        <div class="trailer-player">Play Trailer</div>
                      </div>
                    </div>
                  </div>
                  <div class="movie-header-info">
                    <h3 class="header-tagline"></h3>
                    <h3 class="header"></h3>
                    <div class="overview">
                      <p></p>
                    </div>
                    <ol class="people">
                      <li class="profile">
                        <p><a href=""></a></p>
                        <p class="character"></p>
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
      </div>`,
};

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDhiYzlkMzUyMzdkNjQyM2FjZWM1YTRiOGJlY2RjOCIsIm5iZiI6MTc0MzA2Mjg3Ni44OTIsInN1YiI6IjY3ZTUwNzVjNWYwYmZhMGI2NmJhMmQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gkl9UhvpS-aMJy9huhth-nFaqMTtnzrMmixbTwcVfCs"}`,
    accept: "application/json",
  },
};

fetch("https://api.themoviedb.org/3/movie/247767?language=en-US", options)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
