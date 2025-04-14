import { fetchMovieMedia } from "../fetchMovieMedia.js";
import { keywordsFetch } from "../keywordsFetch.js";
import { creditsFetch } from "../creditsFetch.js";
import { fetchMovieDetails } from "../fetchMovieDetails.js";

export function display(type, movie_id) {
  const shimmerOverlay = document.querySelector(".shimmer-overlay");

  shimmerOverlay.classList.remove("hidden");

  Promise.all([
    fetchMovieDetails(type, movie_id),
    fetchMovieMedia(type, movie_id),
    creditsFetch(type, movie_id),
    keywordsFetch(type, movie_id),
  ])
    .catch((err) => {
      display_error(err);
    })
    .finally(() => {
      shimmerOverlay.classList.add("hidden");
    });
}
