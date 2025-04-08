export function display_error(err) {
  const main_container = document.querySelector(".main-container");

  if (document.querySelector(".error-message")) return;

  main_container.innerHTML = `
  <div class="error-message">
    <span class="error-emoji">⚠️</span>
    <h2>Oops! Something went wrong.</h2>
    <p>We couldn't load the movie. Please try again later.</p>
    <p class="error-details">🛑 Error: ${err.message}</p>
    <button class="retry-btn" onclick="window.location.reload()">🔄 Retry</button>
  </div>
`;
}
