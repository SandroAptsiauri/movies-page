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

    const navbar = document.querySelector(".navbar");
    const heightToSub = parseFloat(getComputedStyle(navbar).height);

    const interval = setInterval(() => {
      if (path === "/") return;
      const element = document.querySelector(
        path === "#tv" ? "#free" : path === "#week" ? "#trending" : path
      );

      if (element) {
        const k = element.getBoundingClientRect();

        window.scrollTo(
          k.left + window.pageXOffset,
          k.top + window.pageYOffset - heightToSub
        );
        clearInterval(interval);
      }
    }, 50);
  } else {
    const movieId = path.split("#").at(-1);

    getPageContent(`/about`);

    if (path.split("#").at(-2).split("/")[0] === "tv") {
      display("tv", movieId);
      window.scrollTo(0, 0);
    } else {
      display("movie", movieId);
      window.scrollTo(0, 0);
    }
  }
}
