import './js/filterCocktails';
import hbs from 'hbs';
import themeSelector from './js/theme-selector';
import { Select } from './js/select';
import favorite from './js/favorite';

themeSelector();

const select = new Select('#selector');

select.setup();
