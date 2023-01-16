import * as basicLightbox from 'basiclightbox';
import modalCocktails from '../templates/modalCocktails.hbs';
import modalIngrediends from '../templates/modalIngrediends.hbs';
import CocktailsApi from './cocktails_api';

const api = new CocktailsApi();

const cModal = {
  instance:null,
  open: function(html) {
    this.instance = basicLightbox.create(html)
    this.instance.show()
  },
  close: function() {
    this.instance.close();
  }
}

const iModal = {
  instance:null,
  open: function(html) {
    this.instance = basicLightbox.create(html)
    this.instance.show()
  },
  close: function() {
    this.instance.close();
  }
}

function createIngredientsObj(object){
  let ingredients = {};
  for (let i=1; i<15 ; i++){
    if (object['strIngredient'+i]) {
      const id = object['strIngredient'+i].toLowerCase();
      if (object['strMeasure'+i]) {
        ingredients[id] = object['strMeasure'+i]+' '+object['strIngredient'+i];
      } else {
        ingredients[id] = object['strIngredient'+i];
      }

    //  ingredients.push(object['strMeasure'+i]+' '+object['strIngredient'+i])
    } else {
      return ingredients;
    }
  }
  return ingredients;
}

function ingredientsModal(elements){
  for (const ingredient of elements) {
    ingredient.addEventListener('click', async(e)=>{
      const ingredientId = e.target.dataset.id;
      const data = await api.fetchIngredientsByName(ingredientId);
      iModal.open(modalIngrediends(data.ingredients));

      const closeBtns = document.querySelectorAll('.ingredients__close-btn');
      for (const button of closeBtns){
        button.addEventListener('click',() => iModal.close());
      }
    })
  }
}

export default function setModal(){
  const cocktailsButtons = document.querySelectorAll('.card__btn-learn');
  const ingredientsButtons = document.querySelectorAll('.card-ingredients__btn-learn');

  for (const cocktail of cocktailsButtons) {
    cocktail.addEventListener('click', async (e)=>{
      const cocktailId = e.target.dataset.id;
      const data = await api.fetchCocktaileDetaileById(cocktailId);

      const ingredients = createIngredientsObj(data.drinks[0]);
      data.drinks[0].ingredients = ingredients;
      cModal.open(modalCocktails(data.drinks));
      const ingredientsList = document.querySelectorAll('.cocktaile-ingredients__item');
      ingredientsModal(ingredientsList);

      const closeBtns = document.querySelectorAll('.cocktaile-card__close-btn');
      for (const button of closeBtns){
        button.addEventListener('click',() => cModal.close());
      }
    })
  }

  ingredientsModal(ingredientsButtons);

}

