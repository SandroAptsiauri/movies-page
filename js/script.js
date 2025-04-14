import { generateMainContent } from "./generateMainContent.js";
import { display } from "./utils/display.js";
import { getPageContent } from "./getPageContent.js";

document.addEventListener("DOMContentLoaded", () => {
  let path = window.location.hash;
  getPageContent("/home");

  const mainContainer = document.getElementById("main-container");

  const hashArr = ["", "#trending", "#popular", "#free", "#week", "#tv"];

  if (hashArr.includes(path)) {
    if (path === "#week") {
      document.getElementById("week").classList.add("active");
      document.getElementById("today").classList.remove("active");
    } else if (path === "#tv") {
      document.getElementById("free-movies-btn").classList.remove("active");
      document.getElementById("tv-free").classList.add("active");
    }
    generateMainContent(mainContainer);
  } else {
    const movieId = path.split("#")[2];

    if (path.split("#")[1].split("/")[0] === "tv") {
      getPageContent(`/about`);

      display("tv", movieId);
      window.scrollTo(0, 0);
    } else {
      getPageContent(`/about`);
      display("movie", movieId);
      window.scrollTo(0, 0);
    }
  }
});

window.addEventListener("hashchange", () => {
  if (trailerModal.style.display === "flex") {
    trailerModal.style.display = "none";
    document.querySelector(".iframe-cont").innerHTML = "";
  }
  let path = window.location.hash;

  if (!path) path = "/";

  if (
    path === "/" ||
    path === "#trending" ||
    path === "#popular" ||
    path === "#free"
  ) {
    getPageContent(`/home`);
    const mainContainer = document.getElementById("main-container");
    generateMainContent(mainContainer);
  } else if (path === "#week") {
    getPageContent(`/home`);
    const mainContainer = document.getElementById("main-container");
    document.getElementById("week").classList.add("active");
    document.getElementById("today").classList.remove("active");
    generateMainContent(mainContainer);
  } else if (path === "#tv") {
    getPageContent(`/home`);
    const mainContainer = document.getElementById("main-container");
    document.getElementById("tv-free").classList.add("active");
    document.getElementById("free-movies-btn").classList.remove("active");
    generateMainContent(mainContainer);
  } else {
    const movieId = window.location.hash.split("#")[2];

    getPageContent(`/about`);

    if (window.location.hash.split("#")[1].split("/")[0] === "tv") {
      display("tv", movieId);
      window.scrollTo(0, 0);
    } else {
      display("movie", movieId);
      window.scrollTo(0, 0);
    }
  }
});

const home_page = document.querySelector(".home-page");
home_page.style.cssText = "cursor: pointer;";

home_page.addEventListener("click", function () {
  window.history.pushState(null, null, "/");
  getPageContent("/home");

  const home_container = document.querySelector(".home-container");

  generateMainContent(home_container);
});
