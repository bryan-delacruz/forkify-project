import Search from "./models/Search";
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';
/**Global state of the app
 * -Buscar objetos (Seach object)
 * -Receta actual (Current recipe object)
 * -Lista de objetos comprados(Shopping list object)
 * -Recetas que te gusten (Like recipes)
 */
const state = {};

const controlSearch = async () => {
  //1. obtener el query en view
  const query = searchView.getInput();
  console.log(query);
  if(query){
      // 2.Nueva Search object que se agrega al state
      state.search=new Search(query);

      // 3.Prepara el UI para el resultado
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.searchRes);

      //4. a la espera de la búsqueda por receta
      await state.search.getResults();

      //5. mostrar resultado en UI
      clearLoader();
      searchView.renderResults(state.search.result);
      console.log(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click",e=>{
    const btn=e.target.closest('.btn-inline');
    if(btn){
        const goToPage=parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
        console.log(goToPage);
    }
});


