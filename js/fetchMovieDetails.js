import { options } from "./apiDependencies.js";
import { display_error } from "./displayError.js";

export async function fetchMovieDetails(type, id) {
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
          ? res.first_air_date?.split("-")[0]
          : res.first_air_date || "First Air Date in not available"
      })`;
    } else {
      movie_title.textContent = res.original_title || "Title is not available";
      release_date.textContent = `(${
        res.release_date?.split("-")[0]
          ? res.release_date?.split("-")[0]
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

    genres_list.textContent = res.genres[0]?.name || "Genres is not available";
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
