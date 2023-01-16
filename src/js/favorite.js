import CocktailsApi from './cocktails_api';
import cardCocktails from '../templates/cardCocktails.hbs';
import dontCocktails from '../templates/dontCocktails.hbs';

export default function setFavoriteEvents(){
  const refs = {
    addButtonEls: document.querySelectorAll('.card__btn-add'),
    addFavoriteIngredientEl: document.querySelector('.ingredients__btn'),
    favCocktailsEl: document.querySelector('.js-cocktails'),
    favIngredientsEl: document.querySelector('.js-ingredients'),
    titleEl: document.querySelector('#list-title'),
    heroEl: document.querySelector('.hero'),
    heartSvgEl: document.querySelector('.card__icon'),
    listEL: document.querySelector('.card__list')
  }

  function checkIsFavorite(){
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
      favorites = [];
    }
    for (const button of refs.addButtonEls){
      const id = button.dataset.id;
      if (favorites.includes(id)) {
        button.classList.add('active');
      }
    }
  }

  function addFavoriteCocktail(e){
    const el = e.currentTarget;
    const id = el.dataset.id;
    console.log(id)
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
      favorites = [];
    }

    if (el.classList.contains('active')) {
      const fIndex = favorites.indexOf(id);
      if (fIndex) {
        favorites.splice(fIndex, 1);
        el.classList.remove('active');
      }
    } else {
      favorites.push(id);
      el.classList.add('active');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  for (const button of refs.addButtonEls){
    button.addEventListener('click', addFavoriteCocktail);
  }

  checkIsFavorite();

  function openFavoriteCard(e){
    e.preventDefault()
  refs.heroEl.style.display = 'none';
  refs.listEL.innerHTML = '';
  refs.titleEl.textContent = 'Favorite cocktails';
  refs.addButtonEls.textContent = 'Remove';

  function renderCards(cocktails){

    // refs.listEL = ''

  for(const key in cocktails){
    refs.listEL.insertAdjacentHTML(
      'afterbegin', cardCocktails(cocktails[key].drinks)
    )
    console.log(cocktails[key].drinks)
  }
 }

Promise.all(promises).then(data => {
  renderCards(data)
}).then(() => {

  function deletCocktails({target}){
  
    const id = target.dataset.id
    const idsList = JSON.parse(localStorage.getItem('favorites') || [])
    const newArray = idsList.filter(el => el !== id )
    localStorage.setItem('favorites', JSON.stringify(newArray));
  
    renderCards(newArray)
  }

  const addButtonEls = document.querySelectorAll('.card__btn-add')
  
  for (const button of addButtonEls){
    button.textContent = 'Remove'
    button.addEventListener('click', deletCocktails);
  }
});
}

refs.favCocktailsEl.addEventListener('click', openFavoriteCard)

const idsList = JSON.parse(localStorage.getItem('favorites') || [])
const coctailsApi = new CocktailsApi()

const promises = idsList.map((id) => {
  return coctailsApi.fetchCocktaileDetaileById(id)
})
}


