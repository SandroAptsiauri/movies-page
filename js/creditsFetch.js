import { options } from "./apiDependencies.js";
import { display_error } from "./utils/displayError.js";

export async function creditsFetch(type, id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch credits data.");
    }

    const res = await response.json();

    const olCrew = document.querySelector(".people");

    if (!res.crew || res.crew.length === 0) {
      olCrew.textContent = "Crew Data Is Not Available.";
      olCrew.style.cssText =
        "font-weight: 700; font-size: 2rem; padding: 2rem 3rem; color:#ff8484";
    } else {
      res.crew.forEach((cur) => {
        if (cur.job === "Director" || cur.job === "Producer") {
          const li = document.createElement("li");
          li.setAttribute("class", "profile");

          const p_name = document.createElement("p");
          p_name.setAttribute("class", "character-name");
          p_name.textContent = cur.original_name;

          const p_job = document.createElement("p");
          p_job.setAttribute("class", "character-job");
          p_job.textContent = cur.job;

          olCrew.appendChild(li);
          li.append(p_name, p_job);
        }
      });
    }

    const olCast = document.querySelector(".scroller-cast-list");

    if (!res.cast || res.cast.length === 0) {
      olCast.textContent = "Cast Data Is Not Available.";
      olCast.style.fontWeight = "700";
      olCast.style.fontSize = "2rem";
      olCast.style.padding = "20px 30px";
      olCast.style.color = "#ff8484";
      olCast.style.overflowX = "hidden";
    } else {
      res.cast.forEach((cur) => {
        const li = document.createElement("li");
        li.setAttribute("class", "scroller-card");

        const scroller_card_img = document.createElement("img");
        if (cur.profile_path === null) {
        }

        scroller_card_img.setAttribute(
          "src",
          cur.profile_path === null
            ? "./assets/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
            : "https://image.tmdb.org/t/p/w500" + `${cur.profile_path}`
        );

        const p__actor_name = document.createElement("p");
        p__actor_name.setAttribute("class", "scroller-actor-name");
        p__actor_name.textContent = cur.name;

        const p_character_name = document.createElement("p");
        p_character_name.setAttribute("class", "scroller-character-name");
        p_character_name.textContent = cur.character;

        olCast.appendChild(li);
        li.append(scroller_card_img, p__actor_name, p_character_name);
      });
    }
  } catch (err) {
    display_error(err);
  }
}
