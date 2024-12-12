

function GenerirajBrojeve(){
    let brojevi = [];
    while (brojevi.length < 4) {
      let noviBroj = Math.floor(Math.random() * 4);
      if (!brojevi.includes(noviBroj)) { 
        brojevi.push(noviBroj);
      }
    }
    return brojevi;
}
export default GenerirajBrojeve