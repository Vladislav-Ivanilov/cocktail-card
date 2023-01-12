import CocktailsApi from './cocktails_api';

const api = new CocktailsApi();

class Pagination {
  constructor() {
    (this.curentPage = 1),
    (this.totalPages = 0),
    (this.limit = 9),
    (this.data = []);
  }

  createChunks() {
    const chunk = [...this.data].splice(
      api.limit * (api.curentPage - 1),
      api.limit
    );
    return chunk;
  }
}

const pagination = new Pagination();

api
  .fetchIngredientsByName('m') // зaмість м буде подія на алфавіт і тоді в зені треба зробити рендер фоток
  .then(response => {
    pagination.data = response.ingredients;
    console.log(pagination.data)
  });


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

api.fetchCoctailsByName('negroni') // шукає коктель за назвою
.then(response => console.log(response.drinks))

api.fetchCocktaileDetaileById('11007') // шукає коктель за ід
.then(response => console.log(response))

api.fetchIngredientsDetaileById('552') //шукає інгредієнт за ід
.then(response => console.log(response.ingredients))
