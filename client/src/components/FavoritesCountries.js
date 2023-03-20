const FavoritesCountries =  async () => {
const response = await fetch(`http://127.0.0.1:5000/api/countries`);
const favCountries = await response.json();
  return favCountries;
    
}

export default FavoritesCountries;