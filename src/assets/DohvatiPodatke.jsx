import axios from "axios";
import './DohvatiPodatke.css'

function DohvatiPodatke({korisnikBrojPitanja, korisnikKategorija, korisnikTezina, setQuestions, setOdg, setTrenutna}) {
    function podatci(){
        axios.get('https://opentdb.com/api.php?amount=' + korisnikBrojPitanja + '&category=' + korisnikKategorija + '&difficulty=' + korisnikTezina + '&type=multiple')
        .then(res => {
            setQuestions(res.data);
            const newAnswers = res.data.results.map(result => {
            const neispravniOdgovori = result.incorrect_answers;
            const ispravanOdgovor = result.correct_answer;
            return [...neispravniOdgovori, ispravanOdgovor];
            });
            setOdg(newAnswers);
            setTrenutna('Pocetna');
        })
    }
    return(
        <button onClick={podatci} id="startgamebutton">Start</button>
    )
}
export default DohvatiPodatke
