import str from './models/Search';
import {add as f1,multiply as f2,ID} from './views/SearchView';

console.log(`Usando imported functions: ${f1(ID,2)} y ${f2(ID,2)} del view.
Del model => ${str}`);