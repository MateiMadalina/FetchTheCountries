import "./App.css";
import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import CountryData from "./components/CountryData";
import FavoritesCountries from "./components/FavoritesCountries";

function App() {
  const [data, setData] = useState(null);
  let [copyData, setCopyData] = useState(null);
  const [favCond, setFavCond] = useState(true);
  const [countryInfo, setCountryInfo] = useState(true);
  const [currentCountry, setCurrentCountry] = useState({
    capital: "",
    flag: "",
    continents: "",
    region: "",
    subregion: "",
    population: "",
    borders: "",
    time: "",
    independent: "",
    startOfWeek: "",
  });

  let readAPI = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setData(data);
    setCopyData(data);
  };

  useEffect(() => {
    readAPI();
  }, []);

  const testPost = async (country) => {
    const response = await fetch(`http://127.0.0.1:5000/api/countries`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(country),
    });
    const btn = document.getElementById(country.name.common);
    btn.textContent = "-";
  };
  

  const handleCountryInfo = (inf) => {
    setCountryInfo(inf);
  };

  const handleCurrentCountry = (data) => {
    currentCountry.capital = data.capital;
    currentCountry.flag = data.flags.png;
    currentCountry.continents = data.continents;
    currentCountry.region = data.region;
    currentCountry.subregion = data.subregion;
    currentCountry.population = data.population;
    currentCountry.borders = data.borders;
    currentCountry.time = data.timezonez;
    currentCountry.independent = data.independent;
    currentCountry.startOfWeek = data.startOfWeek;
  };

  const sortCountriesAscending = () => {
    const sortedData = [...data].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    setData(sortedData);
  };

  const sortCountriesDescending = () => {
    const sortedData = [...data].sort((a, b) =>
      b.name.common.localeCompare(a.name.common)
    );
    setData(sortedData);
  };

  const onSearchChange = (value) => {
    const lowerCaseValue = value.toLowerCase();
    if (lowerCaseValue === "") {
      setData(copyData);
    } else {
      let copy = copyData;
      const newData = copy.filter((country) =>
        country.name.common.toLowerCase().includes(lowerCaseValue)
      );
      setData(newData);
    }
  };


  const readFavCountries = async () => {
    setFavCond(false);
    setData(await FavoritesCountries());
    setCopyData(await FavoritesCountries());
  }

  const backButtonReload = () => {
    readAPI();
    setFavCond(true);
  }

  return (
    <div className="App">
      {countryInfo ? (
        <div>
          <button onClick={sortCountriesAscending}>Sort Ascending</button>
          <button onClick={sortCountriesDescending}>Sort Descending </button>
          {favCond ? <button onClick={readFavCountries}>Show Favorite Countries</button> : <button onClick={backButtonReload}>Back</button>} 
          <div>
            <input
              type="search"
              placeholder="Search the country"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          {data && data.map((country) => (
              <Countries
                key={country.name.common}
                name={country.name.common}
                click={() => {handleCurrentCountry(country); handleCountryInfo(false);}}
                clickFav={() => { testPost(country);}}
              />
            ))}
        </div>
      ) : (
        <CountryData
          capital={currentCountry.capital}
          flag={currentCountry.flag}
          continents={currentCountry.continents}
          region={currentCountry.region}
          subregion={currentCountry.subregion}
          population={currentCountry.population}
          borders={currentCountry.borders}
          time={currentCountry.timezones}
          independent={currentCountry.independent}
          startOfWeek={currentCountry.startOfWeek}
          click={() => handleCountryInfo(true)}
        />
      )}
    </div>
  );
}

export default App;
