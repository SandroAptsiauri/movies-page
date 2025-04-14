export function viewMore(className, container) {
  const more = document.createElement("div");
  more.classList.add(className);

  more.style.cssText =
    "display: flex; align-items: center; border: none; font-weight: 900; font-size: 3rem; margin-left: 2.5rem;";

  const more_p = document.createElement("p");
  more_p.textContent = "View More...";

  more.append(more_p);
  container.append(more);
}
