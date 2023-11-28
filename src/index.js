import axios from 'axios';
import Notiflix from 'notiflix';

// import { fetchBreeds } from "./cat-api";

axios.defaults.headers.common['x-api-key'] =
  'live_OrI2CQkYifKys4YRbxKEQWDTTHiRPLxMF2MrCIzjzxwK18XloitcucZdJi4JglLj';

const selectBreeds = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader')
const errorEl = document.querySelector('.error')




function fetchBreeds() {
  errorEl.style.visibility = "hidden"
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      loaderEl.style.visibility = "hidden"
      const breeds = response.data;

      selectBreeds.innerHTML = createMarkup(breeds);
    })
    .catch(error => {
      loaderEl.style.visibility = "hidden"
      errorEl.style.visibility = "visible"
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', error);
      
    });
}

function createMarkup(breeds) {
  return breeds
    .map(
      ({ id, name }) =>
        `<option value ="${id}">${name}
  
  </option>`
    )
    .join('');
}

fetchBreeds();

selectBreeds.addEventListener('change', onOptionClick);

function onOptionClick(event) {
  catInfoEl.innerHTML = ""
  loaderEl.style.visibility = "visible"

  let breedId = event.target.value;
  fetchCatByBreed(breedId);
}

function fetchCatByBreed(breedId) {
  const URL = 'https://api.thecatapi.com/v1/images/search';

  return axios
    .get(`${URL}?breed_ids=${breedId}`)
    .then(response => {
      loaderEl.style.visibility = "hidden"
      const catInfo = response.data[0];
      console.log(catInfo.url)
      createCatInfoMarkup(catInfo)

     
    })
    .catch(error => {
      loaderEl.style.visibility = "hidden"
      errorEl.style.visibility = "visible"
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', error);
      
    });
}

function createCatInfoMarkup (catInfo) {

  const { url, breeds: { 0: { description, name, temperament } } } = catInfo

  const htmlString = `<h2>${name}</h2>
  <img src ="${url}" alt="cat">
  <p>${description}</p>
  <p>Temperament: ${temperament}</p>`

  return catInfoEl.insertAdjacentHTML("beforeend", htmlString)
    
}