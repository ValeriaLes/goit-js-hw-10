import axios from 'axios';
// import { fetchBreeds } from "./cat-api";

axios.defaults.headers.common['x-api-key'] =
  'live_OrI2CQkYifKys4YRbxKEQWDTTHiRPLxMF2MrCIzjzxwK18XloitcucZdJi4JglLj';

const selectBreeds = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info')


function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(function (response) {
      const cats = response.data;
  
      selectBreeds.innerHTML = createMarkup(cats);
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchBreeds();

function createMarkup(cats) {
  return cats
    .map(
      ({ id, name }) =>
        `<option value ="${id}">${name}
  
  </option>`
    )
    .join('');
}

selectBreeds.addEventListener('change', onOptionClick);

function onOptionClick(event) {
  let catsId = event.target.value
  fetchCatByBreed(catsId);
  
}

`<img src ="${imageURL}" alt="cat"> />`


function fetchCatByBreed(breedId) {
  const URL = 'https://api.thecatapi.com/v1/images/search';

  return fetch(`${URL}?breed_ids=${breedId}`)
    .then(response => {
      const imageURL = response.url;
      console.log(imageURL)
      catInfo.insertAdjacentHTML("beforeend", `<img src ="${imageURL}" alt="cat">`)
      console.log(response)
    })
    .catch(error => {
      console.log(error);
    });
}


