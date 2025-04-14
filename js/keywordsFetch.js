import { options } from "./apiDependencies.js";
import { display_error } from "./utils/displayError.js";

export async function keywordsFetch(type, id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/keywords`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Keywords data.");
    }

    const res = await response.json();

    const keywords_ul = document.querySelector(".col-2-keywords-ul");

    if (
      (!res.keywords || res.keywords.length === 0) &&
      (!res.results || res.results.length === 0)
    ) {
      keywords_ul.textContent = "Keywords Data Is Not Available.";
      keywords_ul.style.cssText =
        "font-weight: 700; font-size: 2rem; color:#ff8484";
    } else {
      let newRes;
      if (type === "tv") {
        newRes = res.results.slice(0, 10);
      } else {
        newRes = res.keywords.slice(0, 10);
      }
      newRes.forEach((cur) => {
        const li = document.createElement("li");
        const p = document.createElement("p");

        p.textContent = cur.name;

        li.append(p);
        keywords_ul.append(li);
      });
    }
  } catch (err) {
    display_error(err);
  }
}
