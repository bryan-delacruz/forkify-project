import str from './models/Search';
import {add,multiply,ID} from './views/SearchView';

console.log(`Usando imported functions: ${add(ID,2)} y ${multiply(ID,2)} del view.
Del model => ${str}`);