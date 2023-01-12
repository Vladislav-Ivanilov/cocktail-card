import CocktailsApi from './cocktails_api';

const api = new CocktailsApi();

const refs = {
  inputMobEL: document.querySelector('#search-form'),
  inputEL: document.querySelector('#search-form-desktop'),
  filterHeroMob: document.querySelector('.hero-mob__select-list'),
  filterHero: document.querySelector('.hero-tablet__select'),
};

//refs.inputMobEL.addEventListener('submit');
//refs.inputEL.addEventListener('submit');
refs.filterHero.addEventListener('click', handelFilter);
refs.filterHeroMob.addEventListener('click', handelFilter);

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

function handelFilter(event) {
  const selectFilterId = event.target.id;

  if (event.target.nodeName === 'LI') {
    api.fetchCocktailsByFirstLetter(selectFilterId).then(response => {
      pagination.data = response.drinks;
      const items = pagination.createChunks();
    });
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

// setPageLimit();

// const getRandomCocktails = function () {
//   const randomCocktails = [];
//   const promises = [];

//   for (let index = 0; index < pagination.limit; index++) {
//     const promise = new Promise((resolve, reject) => {
//         api.fetchRandomCocktails().then(response => resolve(response));
//     });
//     promises.push(promise)
// }
//     console.log(promises)
//     Promise.all(promises).then(
//         response => response.map(r => randomCocktails.push(r.drinks[0]))
//     )
//     console.log(randomCocktails)
//     return randomCocktails
// };

// const renderMainPage = function() {
//     const randomCocktails = getRandomCocktails();
//     // console.log(randomCocktails);
//     randomCocktails.map(element => {
//         console.log(element)
//     });
// }

// renderMainPage();
// getRandomCocktails();

api
  .fetchCocktailsByName('negroni') // шукає коктель за назвою
  .then(response => console.log(response.drinks));

api
  .fetchCocktaileDetaileById('11007') // шукає коктель за ід
  .then(response => console.log(response));

api
  .fetchIngredientsDetaileById('552') //шукає інгредієнт за ід
  .then(response => console.log(response.ingredients));
