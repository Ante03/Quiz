import React from 'react';
import './PotvrdaIme.css'

function PotvrdaIme({ ime, setTrenutna }) {
  const potvrdaIme = () => {
    if (ime !== '') {
      setTrenutna('Pitanja');
    } else {
      window.alert("Niste unijeli ime");
    }
  };

  return (
    <button onClick={potvrdaIme} id='startgamebutton'>Potvrdi ime</button>
  );
}

export default PotvrdaIme;