import { generateMainContent } from "./generateMainContent.js";
import { getPageContent } from "./getPageContent.js";
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
  window.history.pushState(null, null, "/");
  getPageContent("/home");

  const home_container = document.querySelector(".home-container");

  generateMainContent(home_container);
});
