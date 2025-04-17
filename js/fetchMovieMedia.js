import { options } from "./utils/apiDependencies.js";
import { display_error } from "./utils/displayError.js";
import { viewMore } from "./utils/viewMore.js";

export async function fetchMovieMedia(type, id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/images`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images and other media.");
    }

    const resMedia = await response.json();

    // trailer *************************************
    let resTrailersData = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
      options
    );

    if (!resTrailersData.ok) {
      throw new Error("Failed to fetch Trailers and Teasers.");
    }

    const resTrailers = await resTrailersData.json();

    const trailer_cont = document.querySelector(
      ".media-scroller-list-trailers"
    );

    const media_list_trailers_num = document.querySelector(
      ".media-list-trailers-num"
    );

    media_list_trailers_num.textContent = resTrailers.results.length;

    if (resTrailers.results && resTrailers.results.length !== 0) {
      resTrailers.results.slice(0, 10).forEach((cur) => {
        const trailer = document.createElement("div");
        trailer.setAttribute("class", "trailer");
        trailer.style.cssText = `background-image: url('https://i.ytimg.com/vi/${cur.key}/hqdefault.jpg'); min-width: 533px; width: 533px; min-height: 300px; height: 300px; box-sizing: border-box; background-position: center; background-repeat: no-repeat; overflow: hidden; background-size: 100%;`;

        const trailer_a = document.createElement("a");
        trailer_a.style.cssText =
          "width: 100%; height: 100%;display: flex; align-items: center;justify-content: center;";
        trailer_a.setAttribute("id", `${cur.key}`);

        const play_icon_cont = document.createElement("div");
        play_icon_cont.setAttribute("class", "play-icon-cont");
        play_icon_cont.style.cssText =
          "width: 67px; height: 67px; display: flex;align-items: center; justify-content: center; border-radius: 50%; background: rgba(0, 0, 0, .7);";

        const play_icon_svg = document.createElement("span");
        play_icon_svg.setAttribute("class", "play-icon-cont");
        play_icon_svg.style.cssText =
          "width: 50%; height: 50%; left: 1px; filter: invert(100%) brightness(120%) contrast(100%); transition: opacity 200ms linear; background-image: url('/sweeft-project-movies-page/assets/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg');";

        play_icon_cont.append(play_icon_svg);
        trailer_a.append(play_icon_cont);
        trailer.append(trailer_a);
        trailer_cont.append(trailer);
      });

      if (resTrailers.results.length > 10) {
        viewMore("trailer", trailer_cont);
        trailer_cont.lastChild.style.minWidth = "max-content";
      }
      const closeModalBtn = document.createElement("button");
      const iframe_cont = document.querySelector(".iframe-cont");
      closeModalBtn.id = "closeModalBtn";
      closeModalBtn.innerHTML = `&times;`;

      trailer_cont.addEventListener("click", function (e) {
        if (iframe_cont.innerHTML !== "") return;
        e.preventDefault();
        const iframe = document.createElement("iframe");
        iframe.id = "trailerVideo";
        iframe.frameBorder = "0";
        iframe.src = `https://www.youtube.com/embed/${e.target.id}`;
        iframe.allowFullscreen = true;

        iframe_cont.append(closeModalBtn);
        iframe_cont.append(iframe);

        trailerModal.style.display = "flex";
      });

      closeModalBtn.addEventListener("click", () => {
        iframe_cont.innerHTML = "";
        trailerModal.style.display = "none";
      });
    } else {
      trailer_cont.textContent = "Trailers and Teasers are not available.";
      trailer_cont.classList.add("scroller-list-not-available");
    }

    // trailer *************************************

    const image = document.querySelector(".poster-image");
    image.setAttribute(
      "src",
      resMedia.posters[0]?.file_path
        ? `https://image.tmdb.org/t/p/w500${resMedia.posters[0]?.file_path}`
        : "/sweeft-project-movies-page/assets/glyphicons-basic-38-picture-4ee37443c461fff5bc221b43ae018a5dae317469c8e2479a87d562537dd45fdc.svg"
    );

    const movie_details = document.querySelector(".movie-details");
    movie_details.style.backgroundImage = resMedia.posters[0]?.file_path
      ? `url(
      https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${resMedia.posters[0]?.file_path}
    )`
      : null;

    const backdropsCount = document.querySelector(".media-list-backdrops-num");
    backdropsCount.textContent = resMedia.backdrops?.length;

    const logosCount = document.querySelector(".list-logos-num");
    logosCount.textContent = resMedia.logos?.length;

    const postersCount = document.querySelector(".list-posters-num");
    postersCount.textContent = resMedia.posters?.length;

    const bck = document.querySelector(".bck-drp");
    const lgs = document.querySelector(".lgs");
    const pst = document.querySelector(".pst");
    const media_scroller_list = document.querySelector(".media-scroller-list");

    async function media_list() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/images`,
        options
      );
      const res = await response.json();

      if (bck.classList.contains("active")) {
        if (res.backdrops && res.backdrops.length !== 0) {
          res.backdrops.slice(0, 7).forEach((cur) => {
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

          res.backdrops.length > 7 && viewMore("trailer", media_scroller_list);
        } else {
          media_scroller_list.textContent = "Backdrops Data Not Available";
        }
      }

      if (lgs.classList.contains("active")) {
        if (res.logos && res.logos.length !== 0) {
          res.logos.slice(0, 5).forEach((cur) => {
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

          res.logos.length > 5 && viewMore("logos", media_scroller_list);
        } else {
          media_scroller_list.textContent = "Logos Data Not Available";
        }
      }

      if (pst.classList.contains("active")) {
        if (res.posters && res.posters.length !== 0) {
          res.posters.slice(0, 12).forEach((cur) => {
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
          res.posters.length > 12 && viewMore("logos", media_scroller_list);
        } else {
          media_scroller_list.textContent = "Posters Data Not Available";
        }
      }

      media_scroller_list.textContent === `Backdrops Data Not Available` ||
      media_scroller_list.textContent === `Posters Data Not Available` ||
      media_scroller_list.textContent === `Logos Data Not Available`
        ? media_scroller_list.classList.add("scroller-list-not-available")
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
    display_error(err);
  }
}
