import { elements, renderLoader } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};
export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
  elements.searchResPages.innerHTML="";
};
const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = [];
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};
const renderRecipe = (recipe) => {
  const markup = `
    <li>
      <a class="likes__link" href="#${recipe.recipe_id}">
        <figure class="likes__fig">
        <img src=${recipe.image_url} alt="${recipe.title}">
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">
          ${limitRecipeTitle(recipe.title)}</h4>
          <p class="likes__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
    `;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) =>
  `
<button class="btn-inline results__btn--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
  }>
  <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
    <svg class="search__icon">      
        <use href="img/icons.svg#icon-triangle-${
          type === "prev" ? "left" : "right"
        }"></use>
    </svg>
    
</button>
  `;

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  console.log("page: " + page);
  console.log("pages: " + pages);
  let button;
  if (page === 1) {
    //botón para avanzar
    button = createButton(page, "next");
  } else if (page < pages) {
    //ambos botones
    button = `${createButton(page, "next")}
      ${createButton(page, "prev")}`;
  } else if (page == pages) {
    //botón para retroceder
    button = createButton(page, "prev");
  }
  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  //generando la lista de 10 resultados por página
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  //agragando botones de paginación
  renderButtons(page, recipes.length, resPerPage);
};
