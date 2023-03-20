const Countries = (props) => {
    const name = props.name;
    const click = props.click;
    const clickFav = props.clickFav;
    return (
      <div>
        <div>
          <h2 style={{ display: "inline-block" }}>{name}</h2>
          <button id={name} onClick={clickFav} style={{ display: "inline-block", marginLeft: "10px"}}>+</button>
        </div>
        <button onClick={click}>Learn more</button>
      </div>
    );
  };
  
  export default Countries;