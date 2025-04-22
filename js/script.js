import { generateMainContent } from "./generateMainContent.js";
import { getPageContent } from "./getPageContent.js";
import { githubUrl } from "./utils/githubUrl.js";
import { handleRouting } from "./utils/handleRouting.js";

document.addEventListener("DOMContentLoaded", () => {
  handleRouting();
});

window.addEventListener("hashchange", () => {
  if (trailerModal.style.display === "flex") {
    trailerModal.style.display = "none";
    document.querySelector(".iframe-cont").innerHTML = "";
  }

  handleRouting();
});

const home_page = document.querySelector(".home-page");
home_page.style.cssText = "cursor: pointer;";

home_page.addEventListener("click", function () {
  window.history.pushState(null, null, githubUrl ? githubUrl : "/");
  getPageContent("/home");

  const home_container = document.querySelector(".home-container");

  generateMainContent(home_container);
  window.scrollTo(0, 0);
});

const hamburgenMenu = document.getElementById("ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const offScreenMenuNavigate = document.querySelector(".off-screen-menu-tags");

window.addEventListener("resize", () => {
  if (innerWidth > 580) {
    offScreenMenu.classList.remove("active");
    hamburgenMenu.classList.remove("active");
  }
});

offScreenMenuNavigate.addEventListener("click", () => {
  offScreenMenu.classList.remove("active");
  hamburgenMenu.classList.remove("active");
});

hamburgenMenu.addEventListener("click", () => {
  hamburgenMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (
    !hamburgenMenu.contains(event.target) &&
    !offScreenMenu.contains(event.target)
  ) {
    hamburgenMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
  }
});
