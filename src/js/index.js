import str from './models/Search';
// import {add as f1,multiply as f2,ID} from './views/SearchView';
import * as SearchView from './views/SearchView';

console.log(`Usando imported functions: ${SearchView.add(SearchView.ID,2)} y ${SearchView.multiply(SearchView.ID,2)} del view.
Del model => ${str}`);

