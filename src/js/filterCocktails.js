import CocktailsApi from './cocktails_api';
import cardCocktails from '../templates/cardCocktails.hbs';
import cardIngredients from '../templates/cardIngredients.hbs';
import errorPage from '../templates/errorPage.hbs';

import { Select } from './select';
import setModal from './setModal';

const api = new CocktailsApi();
const select = new Select('#selector');

const refs = {
  inputMobEL: document.querySelector('#search-form'),
  inputEL: document.querySelector('#search-form-desktop'),
  filterHeroMob: document.querySelector('.hero-mob__select-list'),
  filterHero: document.querySelector('.hero-tablet__select'),
  blockCardEL: document.querySelector('.card__list'),
  titleEL: document.querySelector('#list-title'),
  inputFilterEl: document.querySelector('.hero-mob__select-input>span'),
  paginationEl: document.querySelector('.pagination__list'),
};

refs.inputMobEL.addEventListener('submit', handelInputSubmit);
refs.inputEL.addEventListener('submit', handelInputSubmit);
refs.filterHero.addEventListener('click', handelFilter);
refs.filterHeroMob.addEventListener('click', handelFilter);
refs.paginationEl.addEventListener('click', clickPagination);

class Pagination {
  constructor() {
    (this.currentPage = 1),
      (this.totalPages = 0),
      (this.limit = 9),
      (this.data = []);
  }

  createChunks() {
    const chunk = [...this.data].splice(
      this.limit * (this.currentPage - 1),
      this.limit
    );
    return chunk;
  }
}

const pagination = new Pagination();

setPageLimit();

function handelFilter(event) {
  const selectFilterId = event.target.id;

  if (event.target.nodeName === 'LI') {
    api.fetchCocktailsByFirstLetter(selectFilterId).then(response => {
      pagination.data = response.drinks;
      const items = pagination.createChunks();
      refs.blockCardEL.innerHTML = '';
      refs.titleEL.textContent = 'Searching results';
      refs.inputFilterEl.textContent = event.target.id;
      select.close();
      refs.blockCardEL.insertAdjacentHTML('afterbegin', cardCocktails(items));
      let counter = 1;
      let partOfData = [];

      response.drinks.forEach(element => {
        partOfData.push(element);

        if (partOfData.length === pagination.limit) {
          paginationObj[counter] = partOfData;
          partOfData = [];
          counter += 1;
        }
      });

      let teamPlay = ``;

      for (const key in paginationObj) {
        teamPlay += `<li class="pagination__item">${key}</li>`;
      }
      refs.paginationEl.innerHTML = '';
      refs.paginationEl.insertAdjacentHTML('afterbegin', teamPlay);
      setModal();
    });
  }
}

const paginationObj = {};

function handelInputSubmit(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value;

  api
    .fetchCocktailsByName(searchQuery)
    .then(response => {
      if (!response.drinks.length) {
        console.log('eror');
        throw new Error(error);
      }

      pagination.data = response.drinks;
      let counter = 1;
      let partOfData = [];

      response.drinks.forEach(element => {
        partOfData.push(element);

        if (partOfData.length === pagination.limit) {
          paginationObj[counter] = partOfData;
          partOfData = [];
          counter += 1;
        }
      });

      let teamPlay = ``;

      for (const key in paginationObj) {
        teamPlay += `<li class="pagination__item">${key}</li>`;
      }
      refs.paginationEl.innerHTML = '';
      refs.paginationEl.insertAdjacentHTML('afterbegin', teamPlay);

      setPageLimit();

      const items = pagination.createChunks();

      refs.blockCardEL.innerHTML = '';
      refs.titleEL.textContent = 'Searching results';
      refs.blockCardEL.insertAdjacentHTML('afterbegin', cardCocktails(items));
      setModal();
    })
    .catch(() => {
      refs.titleEL.textContent = '';
      refs.blockCardEL.innerHTML = '';
      refs.blockCardEL.insertAdjacentHTML('afterbegin', errorPage());
    });
}

function clickPagination(event) {
  if (event.target.tagName === 'LI') {
    refs.blockCardEL.innerHTML = '';
    refs.blockCardEL.insertAdjacentHTML(
      'afterbegin',
      cardCocktails(paginationObj[event.target.textContent])
    );
  }
}

function setPageLimit() {
  if (window.screen.width <= 768) {
    pagination.limit = 3;
  }

  if (window.screen.width > 768 && window.screen.width < 1200) {
    pagination.limit = 6;
  }

  if (window.screen.width >= 1200) {
    pagination.limit = 9;
  }
}

const getRandomCocktails = function () {
  const randomCocktails = [];
  const promises = [];

  for (let index = 0; index < pagination.limit; index++) {
    const promise = new Promise((resolve, reject) => {
      api.fetchRandomCocktails().then(response => resolve(response));
    });
    promises.push(promise);
  }

  Promise.all(promises).then(response => renderMainPage(response));
};

function renderMainPage(cocktails) {
  refs.blockCardEL.innerHTML = '';

  for (const key in cocktails) {
    refs.blockCardEL.insertAdjacentHTML(
      'afterbegin',
      cardCocktails(cocktails[key].drinks)
    );
  }
  setModal();
}

getRandomCocktails();

api
  .fetchCocktailsByName('negroni') // шукає коктель за назвою
  .then(response => response.drinks);

api
  .fetchCocktaileDetaileById('11007') // шукає коктель за ід
  .then(response => {
    return response;
  });
api
  .fetchIngredientsDetaileById('552') //шукає інгредієнт за ід
  .then(response => response.ingredients);
