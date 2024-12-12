
import { useState } from 'react';
import axios from "axios";
import './App.css';
import Pitanje from './assets/Pitanje.jsx'
import PotvrdaIme from './assets/PotvrdaIme.jsx';
import DohvatiPodatke from './assets/DohvatiPodatke.jsx';
import GenerirajBrojeve from './assets/GenerirajBrojeve.js';
import PostaviVrijednost from './assets/PostaviVrijednost.js';

function App() {
  const [brojPitanja, setBrojPitanja] = useState(0);
  const [trenutna, setTrenutna] = useState('StartGame');
  const [ime, setIme] = useState("");
  const [Questions, setQuestions] = useState({
    response_code: 0,
    results: [{
      type: "",
      difficulty: "",
      category: "",
      question: "",
      correct_answer: "",
      incorrect_answers: [""]
    }]
  });
  const [odg, setOdg] = useState([]);
  const [tocni, setTocni] = useState(0);
  const [jeLiTocno, setJeLiTocno] = useState(false);
  const [jeLiNeTocno, setJeLiNeTocno] = useState(false);
  const [korisnikBrojPitanja, setKorisnikBrojPitanja] = useState("10");
  const [korisnikKategorija, setKorisnikKategorija] = useState("9");
  const [korisnikTezina, setKorisnikTezina] = useState("easy");
  const [brOdg, setBrOdg] = useState(0);
  const PromjeniIme = PostaviVrijednost(setIme);
  const PostaviBrojPitanja = PostaviVrijednost(setKorisnikBrojPitanja);
  const PostaviKategorijuPitanja = PostaviVrijednost(setKorisnikKategorija);
  const PostaviTezinuPitanja = PostaviVrijednost(setKorisnikTezina);


  function StartGame(){
    return(
      <div className='glavni' id="startgame">
        <h1>Dobrodosli na KVIZ!</h1>
        <div>
        <h2>Unesite kakav kviz zelite</h2>
        <h3>Broj pitanja:</h3>
        <select className='StartGameIzbori' id="KorisnikBrojPitanja" value={korisnikBrojPitanja} onChange={PostaviBrojPitanja}>
          <option value={"1"}>1</option>
          <option value={"2"}>2</option>
          <option value={"3"}>3</option>
          <option value={"4"}>4</option>
          <option value={"5"}>5</option>
          <option value={"6"}>6</option>
          <option value={"7"}>7</option>
          <option value={"8"}>8</option>
          <option value={"9"}>9</option>
          <option value={"10"}>10</option>
          <option value={"11"}>11</option>
          <option value={"12"}>12</option>
          <option value={"13"}>13</option>
          <option value={"14"}>14</option>
          <option value={"15"}>15</option>
        </select>
        <h3>Kategorija:</h3>
        <select className='StartGameIzbori' id="KorisnikKategorijaPitanja" value={korisnikKategorija} onChange={PostaviKategorijuPitanja}>
              <option value="9">General Knowelage</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals & Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science & Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicels</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Anime & Manga</option>
              <option value="32">Entertainment: Cartoon & Animations</option>
        </select>
        <h3>Tezina:</h3>
        <select className='StartGameIzbori' id="KorisnikTezinaPitanja" value={korisnikTezina} onChange={PostaviTezinuPitanja}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
        <DohvatiPodatke korisnikBrojPitanja={korisnikBrojPitanja} korisnikKategorija={korisnikKategorija} korisnikTezina={korisnikTezina} setQuestions={setQuestions} setOdg={setOdg} setTrenutna={setTrenutna} />
      </div>
    )
  }
  function Pocetna(){
    return(
      <div className='glavni' id="pocetna">
        <h3>Unesite svoje ime:</h3>
        <input value={ime} onChange={PromjeniIme} type="text" placeholder='Unesite svoje ime...' id="ImeInput" /><br/>
        <PotvrdaIme ime={ime} setTrenutna={setTrenutna} />
      </div>
    )
  }
  function Pritisnuto(Odgovor){
    if(Odgovor === Questions.results[brojPitanja].correct_answer){
      setTocni(tocni+1);
      setJeLiTocno(true);
      setTimeout(() => {
        setJeLiTocno(false);
      }, 1000);
    }
    else{
      setJeLiNeTocno(true);
      setTimeout(() => {
        setJeLiNeTocno(false);
      }, 1000);
    }
    if(brojPitanja < (korisnikBrojPitanja - 1)){
      setBrojPitanja(brojPitanja + 1);
      setBrOdg(brojPitanja);
    }
    else{
      setBrOdg(brojPitanja);
      setTimeout(() => {
        setTrenutna('Kraj');
      }, 1000);
    }
  }
  function Pitanja(){
    const jedinstveniBrojevi = GenerirajBrojeve();
    if (!Questions.results || Questions.results.length === 0) {
      return <div>Loading...</div>;
    }
    return(
      <div className='glavni' id="pitanja">
        <h2>{brojPitanja + 1}. pitanje:</h2>
        <Pitanje
          pit={Questions.results[brojPitanja].question}
          odg1={odg[brojPitanja][jedinstveniBrojevi[0]]}
          akcija1={() => Pritisnuto(odg[brojPitanja][jedinstveniBrojevi[0]])}
          odg2={odg[brojPitanja][jedinstveniBrojevi[1]]}
          akcija2={() => Pritisnuto(odg[brojPitanja][jedinstveniBrojevi[1]])}
          odg3={odg[brojPitanja][jedinstveniBrojevi[2]]}
          akcija3={() => Pritisnuto(odg[brojPitanja][jedinstveniBrojevi[2]])}
          odg4={odg[brojPitanja][jedinstveniBrojevi[3]]}
          akcija4={() => Pritisnuto(odg[brojPitanja][jedinstveniBrojevi[3]])}
        />
        <div>
          <h3>Pogodeno pitanja:</h3>
          <h3>{tocni}/{korisnikBrojPitanja}</h3>
          {jeLiTocno && <div className="TocanOdgovorProzor">Točan odgovor!</div>}
          {jeLiNeTocno && <div id='NetocanOdgovor' className="TocanOdgovorProzor">Netočan odgovor! Tocan odgovor je {Questions.results[brOdg].correct_answer}</div>}
        </div>
      </div>
    )
  }
  function Kraj(){
    let ispis;
    if(tocni/korisnikBrojPitanja >= 0.9){
      ispis='Bravo! Izvanredan rezultat!';
    }
    if((tocni/korisnikBrojPitanja >= 0.75) && (tocni/korisnikBrojPitanja < 0.9)){
      ispis='Odlično! Skoro pa savršeno!';
    }
    if((tocni/korisnikBrojPitanja >= 0.6) && (tocni/korisnikBrojPitanja < 0.75)){
      ispis='Solidno! Možete se poboljšati.';
    }
    if((tocni/korisnikBrojPitanja >= 0.4) && (tocni/korisnikBrojPitanja < 0.6)){
      ispis='Nije loše! Možete bolje.';
    }
    if((tocni/korisnikBrojPitanja >= 0.2) && (tocni/korisnikBrojPitanja < 0.4)){
      ispis='Nije loše! Ali možete bolje.';
    }
    if(tocni/korisnikBrojPitanja <0.2){
      ispis='Pokušajte ponovno! Svaka greška je prilika za učenje.';
    }
    return(
      <div className='glavni' id="Kraj">
        <h1>KRAJ</h1>
        <h2>Tocna pitanja od {ime}:</h2>
        <h2>{tocni}/{korisnikBrojPitanja}</h2>
        <h3>{ispis}</h3>
        <button onClick={Nova} id="buttonNova">Nova</button>
      </div>
    )
  }
  function Nova(){
    setTrenutna('StartGame');
    setBrojPitanja(0);
    setQuestions(null);
    setIme('');
    setOdg('');
    setTocni(0);
    setKorisnikBrojPitanja("10");
    setKorisnikKategorija("9");
    setKorisnikTezina("easy")
    setBrOdg(0);
  }

  

  return (
    <div>
      {trenutna === 'StartGame' ? StartGame() : (trenutna === 'Pocetna' ? Pocetna() : (trenutna === 'Pitanja' ? Pitanja() : Kraj()))}
    </div>
  );
}

export default App;