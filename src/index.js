
import Notiflix from 'notiflix';
import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";


axios.defaults.headers.common['x-api-key'] =
  'live_OrI2CQkYifKys4YRbxKEQWDTTHiRPLxMF2MrCIzjzxwK18XloitcucZdJi4JglLj';

const selectBreeds = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');





function createMarkup(breeds) {
  return breeds
    .map(
      ({ id, name }) =>
        `<option value ="${id}">${name}
  
  </option>`
    )
    .join('');
}

fetchBreeds() 
.then(response => {
  loaderEl.style.visibility = 'hidden';
  const breeds = response.data;

  selectBreeds.innerHTML = createMarkup(breeds);
})
.catch(error => {
  loaderEl.style.visibility = 'hidden';
  errorEl.style.visibility = 'visible';
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    error
  );
});

selectBreeds.addEventListener('change', onOptionClick);

function onOptionClick(event) {
  catInfoEl.innerHTML = '';
  loaderEl.style.visibility = 'visible';

  let breedId = event.target.value;
  fetchCatByBreed(breedId)
  .then(response => {
    loaderEl.style.visibility = 'hidden';
    const catInfo = response.data[0];
    
    createCatInfoMarkup(catInfo);
  })
  .catch(error => {
    loaderEl.style.visibility = 'hidden';
    errorEl.style.visibility = 'visible';
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!',
      error
    );
  });
}



function createCatInfoMarkup(catInfo) {
  const {
    url,
    breeds: {
      0: { description, name, temperament },
    },
  } = catInfo;

  const htmlString = `<h2 class="cat-name">${name}</h2>
  <img src ="${url}" alt="cat" width = "300" height="200">
  <p>${description}</p>
  <p class="cat-description">Temperament: ${temperament}</p>`;

  return catInfoEl.insertAdjacentHTML('beforeend', htmlString);
}
