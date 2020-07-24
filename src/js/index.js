import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { elements, renderLoader, clearLoader } from "./views/base";
/**Global state of the app
 * -Buscar objetos (Seach object)
 * -Receta actual (Current recipe object)
 * -Lista de objetos comprados(Shopping list object)
 * -Recetas que te gusten (Like recipes)
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  //1. obtener el query en view
  const query = searchView.getInput();

  console.log(query);
  if (query) {
    // 2.Nueva Search object que se agrega al state
    state.search = new Search(query);

    // 3.Prepara el UI para el resultado
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    try {
      //4. a la espera de la búsqueda por receta
      await state.search.getResults();

      //5. mostrar resultado en UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      console.log("error con search");
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});



elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
    console.log(goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    //Prepare UI for changes

    //Create a new recipe object
    
    state.recipe = new Recipe(id);

   
    try {
       //get recipe data
      await state.recipe.getRecipe();
      console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();

      //calculate serving and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      //render recipe
      console.log(state.recipe);
    } catch (err) {
      alert("error con recipe");
    }
  }
};
// window.addEventListener("hashchange",controlRecipe);
// window.addEventListener("load",controlRecipe);
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
