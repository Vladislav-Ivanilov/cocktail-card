import axios from 'axios';

const BASE_URL = 'https://thecocktaildb.com/api/json/v1/1';

export default class CocktailsApi {
  async fetchCocktailsByName(searchCocktaile) {
    const { data } = await axios.get(
      `${BASE_URL}/search.php?s=${searchCocktaile}`
    );
    return data;
  }

  async fetchIngredientsByName(searchIngredient) {
    const { data } = await axios.get(
      `${BASE_URL}/search.php?i=${searchIngredient}`
    );
    return data;
  }

  async fetchIngredientsDetaileById(ingredientId) {
    const { data } = await axios.get(
      `${BASE_URL}/lookup.php?iid=${ingredientId}`
    );
    return data;
  }

  async fetchCocktaileDetaileById(cocktailId) {
    const { data } = await axios.get(`${BASE_URL}/lookup.php?i=${cocktailId}`);
    return data;
  }

  async fetchRandomCocktails() {
    const { data } = await axios.get(`${BASE_URL}/random.php?`);
    return data;
  }

  async fetchCocktailsByFirstLetter(letter) {
    const { data } = await axios.get(`${BASE_URL}//search.php?f=${letter}`);
    return data;
  }
}
