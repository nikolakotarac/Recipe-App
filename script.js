const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "d6a92c22";
const APP_key = "b26818eadec9194c50a7d03cbdb5c96c";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
}
fetchAPI();
function generateHTML(results) {
  let generatedHTML = "";

  results.map((result) => {
    generatedHTML += `
        <div class="item">
        <img src="${result.recipe.image}" alt="" />
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-button" href="${
            result.recipe.url
          }" target="">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${Math.floor(result.recipe.calories)}</p>
      </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
