import axios from 'axios';
export { fetchBreeds, fetchCatByBreed };



function fetchBreeds() {

  return axios.get('https://api.thecatapi.com/v1/breeds')
  
}

function fetchCatByBreed(breedId) {
  const URL = 'https://api.thecatapi.com/v1/images/search';

  return axios
    .get(`${URL}?breed_ids=${breedId}`)
    
}


