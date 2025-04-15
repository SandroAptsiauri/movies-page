import { display } from "./display.js";
import { generateMainContent } from "../generateMainContent.js";
import { getPageContent } from "../getPageContent.js";

export function handleRouting() {
  let path = window.location.hash;
  const mainContainer = document.getElementById("main-container");

  if (!path) path = "/";

  const hashArr = ["/", "#trending", "#popular", "#free", "#week", "#tv"];

  if (hashArr.includes(path)) {
    getPageContent(`/home`);

    if (path === "#week") {
      document.getElementById("week").classList.add("active");
      document.getElementById("today").classList.remove("active");
    } else if (path === "#tv") {
      document.getElementById("tv-free").classList.add("active");
      document.getElementById("free-movies-btn").classList.remove("active");
    }

    generateMainContent(mainContainer);
  } else {
    const movieId = path.split("#")[2];

    getPageContent(`/about`);

    if (path.split("#")[1].split("/")[0] === "tv") {
      display("tv", movieId);
      window.scrollTo(0, 0);
    } else {
      display("movie", movieId);
      window.scrollTo(0, 0);
    }
  }
}
