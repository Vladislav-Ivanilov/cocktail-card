import { fetchCocktail } from './heroAPI.js';

const refs = {
  formSelect: document.querySelector('.js-hero-mobile'),
  formItems: document.querySelector('.js-hero-desktop'),
};

const array = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];

let markup = [];

function renderLitery(array) {
  markup = array
    .map(element => {
      return `<option class="hero__name-search" value="${element}">${element}</option>`;
    })
    .join('');
}

renderLitery(array);

refs.formSelect.insertAdjacentHTML('beforeend', markup);

function renderItemsLitery(array) {
  markupItems = array
    .map(element => {
      return `<li class="hero__name-items list">${element}</li>`;
    })
    .join('');
}

renderItemsLitery(array);
refs.formItems.insertAdjacentHTML('beforeend', markupItems);

refs.formItems.addEventListener('click', onTargetCocktailClick);

function onTargetCocktailClick(event) {
  event.preventDefault();
  const nameCocktail = event.target.textContent;

  fetchCocktail(nameCocktail).then(data => {});
}

refs.formSelect.addEventListener('change', onTargetSearchCocktailChange);

function onTargetSearchCocktailChange(event) {
  event.preventDefault();
  const nameSearchCoctail = event.target.value;
  fetchCocktail(nameSearchCoctail).then(data => {});
}


const myForm = document.querySelector('.my-form');
const mySelect = document.querySelector('.my-select');
const myDivOptions = document.querySelector('.my-div-options');
const myDivArrow = document.querySelector('.my-div-arrow');

myForm.addEventListener('click', async event => {
  event.preventDefault();
  mySelect.classList.toggle('active-select');

  mySelect.addEventListener('click', async event => {
    event.preventDefault();
    refs.paginationContainer.innerHTML = '';
    refs.paginationListContainer.innerHTML = '';

    try {
      const nameSearchCoctail = event.target.textContent.trim();
      myDivOptions.textContent = nameSearchCoctail;

      myForm.style.backgroundColor = '#fd5103';
      myForm.style.borderRadius = '4px';
      myDivOptions.style.color = '#fff';

      myDivArrow.style.stroke = '#fff';

      const { data } = await fetchCocktail(nameSearchCoctail);
      if (data.drinks === null) {
        refs.cardsCaption.style.display = 'none';
        refs.cardsContainerEl.innerHTML = refs.errorEl.innerHTML;
        return;
      }
      refs.cardsCaption.style.display = 'block';
      const btnsRemove = document.querySelectorAll('.card-btn__remove');
      for (let btn of btnsRemove) {
        btn.style.display = 'none';
      }

      //   pagination test //
      const cocktailsData = data.drinks;
      let currentPage = 1;
      let rows;
      if (window.innerWidth < 768) {
        rows = 3;
      } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        rows = 6;
      } else if (window.innerWidth >= 1280) {
        rows = 9;
      }

      function displayList(cocktailsArr, rowPerPage, page) {
        const paginationContainer = document.querySelector(
          '.pagination-container'
        );
        paginationContainer.innerHTML = '';
        page--;
        const start = rowPerPage * page;
        const end = start + rowPerPage;
        const paginatedData = cocktailsArr.slice(start, end);
        //
        refs.cardsContainerEl.innerHTML = drinkCardTemplate(paginatedData);
        addSvgUseHearts();
        const favCockLS = JSON.parse(localStorage.getItem('favorites'));
        const articleCard = document.querySelectorAll('.card');

        if (favCockLS !== null && favCockLS.length) {
          for (let card of articleCard) {
            for (let cock of favCockLS) {
              if (card.children[1].textContent === cock.strDrink) {
                card.children[2].children[1].style.display = 'none';
                card.children[2].children[2].style.display = 'block';
                break;
              } else {
                card.children[2].children[1].style.display = 'block';
                card.children[2].children[2].style.display = 'none';
              }
            }
          }
        } else {
          for (let card of articleCard) {
            card.children[2].children[1].style.display = 'block';
            card.children[2].children[2].style.display = 'none';
          }
        }
        //   const btnsRemove = document.querySelectorAll('.card-btn__remove');
        //   for (let btn of btnsRemove) {
        //     btn.style.display = 'none';
        //   }
        //

        paginatedData.forEach(el => {
          const cocktailEl = document.createElement('div');
          cocktailEl.innerHTML = el.strDrink;
        });
      }
      function displayPagination(cocktailsArr, rowPerPage) {
        const paginationEl = document.querySelector('.pagination');
        const pagesCount = Math.ceil(cocktailsArr.length / rowPerPage);
        const ulEl = document.createElement('ul');
        ulEl.classList.add('pagination-list');

        for (let i = 0; i < pagesCount; i++) {
          const liEl = displayPaginationBtn(i + 1);
          ulEl.appendChild(liEl);
        }
        paginationEl.appendChild(ulEl);
      }
      function displayPaginationBtn(page) {
        const liEl = document.createElement('li');
        const spanEl = document.createElement('span');
        spanEl.classList.add('pagination-btn-page');
        liEl.classList.add('pagination-btn');
        liEl.appendChild(spanEl);
        spanEl.textContent = page;

        if (currentPage === page) liEl.classList.add('pagination-btn-active');

        liEl.addEventListener('click', () => {
          currentPage = page;
          displayList(cocktailsData, rows, currentPage);

          const currentLi = document.querySelector('li.pagination-btn-active');
          currentLi.classList.remove('pagination-btn-active');

          liEl.classList.add('pagination-btn-active');
        });
        return liEl;
      }

      displayList(cocktailsData, rows, currentPage);
      // displayPagination(cocktailsData, rows);
      if (cocktailsData.length > rows) {
        displayPagination(cocktailsData, rows);
      }
    } catch (error) {
      console.log(error);
    }
  });
});
