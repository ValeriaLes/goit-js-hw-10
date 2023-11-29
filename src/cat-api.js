



function fetchBreeds() {
    
    errorEl.style.visibility = 'hidden';
    return axios
      .get('https://api.thecatapi.com/v1/breeds')
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
  }

  export { fetchBreeds };




