const CountryData = (props) => {
    const capital = props.capital;
    const flag = props.flag;
    const continents = props.continents;
    const region = props.region;
    const subregion =props.subregion;
    const population = props.population;
    const borders = props.borders;
    const time= props.timez;
    const independent= props.independent;
    const startOfWeek= props.startOfWeek;
    const click = props.click;
 
 return (
     <div>
         <h4>Capital: {capital}</h4>
         <img src={flag}/>
         <h4>Continent: {continents}</h4>
         <h4>Region: {region}</h4>
         <h4>Subregion: {subregion}</h4>
         <h4>Population: {population}</h4>
         <h4>Borders: {borders}</h4>
         <h4>TimeZone: {time}</h4>
         <h4>Independent: {independent}</h4>
         <h4>startOfWeek: {startOfWeek}</h4>
         <button onClick={click}>Back</button>
     </div>
 );
 }
 
 export default CountryData;