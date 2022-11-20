/*
A questo punto una volta terminato il vostro layout, include un vostro file javascript e fate in modo che quando l’utente fa click sul bottone “send” del form, il sito vi calcoli l’ammontare del vostro lavoro per le ore di lavoro richieste dall’utente.
Il prezzo orario per una commissione varia in questo modo:
Se la commissione riguarda lo sviluppo backend il prezzo orario è di 20.50 € l’ora
Se la commissione riguarda lo sviluppo frontend il prezzo orario è di 15.30 € l’ora
Se la commissione riguarda l’analisi progettuale di un progetto il prezzo orario è di 33.60 € l'ora
Se poi l’utente inserisce un codice promozionale tra i seguenti YHDNU32, JANJC63, PWKCN25, SJDPO96, POCIE24, fate in modo che l’utente abbia diritto ad uno sconto del 25% sul prezzo finale.

Se il codice inserito non è valido, informate l’utente che il codice è sbagliato e calcolate il prezzo finale senza applicare sconti.
Mostrare il risultato del calcolo del prezzo finale in una “forma umana” in un apposito tag HTML appena sotto il bottone send.
- Ricordatevi che se non state bene attenti, Javascript vi fa le magie con i tipi :slightly_smiling_face:
- Ricordatevi che il form ha un comportamento “strano” quando fate click sul bottone Send che è di tipo submit (type=submit).
output : Il prezzo finale e di: 153.75
*/
//lista di codici sconto
let codes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

//Super Bonus: Creare una struttura dati adeguata per contenere tutte le informazioni relative ai progetti presenti nella sezione “Portfolio”. Rimuovere quindi le card dal markup nel file html e stamparle in pagina dinamicamente tramite l’utilizzo di JavaScript.
let element = document.getElementById("carte");
element.style.display = "none";

let portfolio = [
    { nome: "Cabin Website", tipo: "Web Design", ore: 240, foto: "./img/portfolio/cabin.png" },
    { nome: "Cake Website", tipo: "Web Design", ore: 132, foto: "./img/portfolio/cake.png" },
    { nome: "Game Website", tipo: "Web Plugin", ore: 860, foto: "./img/portfolio/game.png" },
    { nome: "Submarine", tipo: "Micro controller", ore: 1542, foto: "./img/portfolio/circus.png" },
    { nome: "Safe Website", tipo: "Web Design", ore: 1263, foto: "./img/portfolio/safe.png" },
    { nome: "Robotic Arm", tipo: "PLC", ore: 268, foto: "./img/portfolio/submarine.png" }];

// stampa le projecti in variable che la uso per stampare in HTML doppo
let htmlCode = ``;
portfolio.forEach(element => {
    htmlCode = htmlCode +
        `

<div class="col-3 g-3 bg-white border-white p-0 b-0 m-3 bm-5 w-75">

<div class="card" style="width: 18rem;">
    <img class="img-fluid  m-0 p-0 b-0" src="${element.foto}" alt="${element.nome}">
    <div class="card-body">
      <h5>Nome di progetto: ${element.nome}</h5>
      <p>Tipo di progetto: ${element.tipo}</p>
      <p>Ore di progetto:  ${element.ore}</p>
      <a href="#" class="btn btn-primary mx-2">Preview</a>
      <a href="#" class="btn btn-outline-info mx-2">Visit</a>
   </div>
  </div>
</div>
  `;
});
let cards = document.getElementById("portfolio");
//seleziona dove mettere html codice e puoi lo inserisce
cards.innerHTML = htmlCode;








//calcula il prezzo del lavoro a base di tipo di lavoro e calcula se hai sconto o no
function calcolaPrezzo(event) {
    event.preventDefault();
    let promocode = document.getElementById("promocode").value;
    let prmcd = bonusPromo(promocode, codes);
    let tipo = document.getElementById("inputState").value;
    let ore = parseFloat(document.getElementById("oreHtml").value);
    let prezzo = 0.0;
    if (tipo == 1) {
        prezzo = ore * 15.3;
    }
    if (tipo == 2) {
        prezzo = ore * 20.5;
    }
    if (tipo == 3) {
        prezzo = ore * 33.60;
    }

    if (prmcd) {
        prezzo = prezzo * 0.75;
        document.getElementById("prezzoHtml").innerText = "\t\t" + prezzo.toFixed(2) + "€";
        document.getElementById("promocode").style.color = "green";

    } else {
        document.getElementById("prezzoHtml").innerText = "\t\t" + prezzo.toFixed(2) + "€";
        document.getElementById("promocode").style.color = "red";
    }

    console.log(`
    tipo: ${tipo} 
    ore:  ${ore}
    prezzo:  ${prezzo}
    prmcd: ${prmcd}
    `);
}
//funcione che guarda la promo codice se e valio e torna se codice e vero o falso
function promoCodice(promo) {
    if (promo == "YHDNU32" || promo == "JANJC63" || promo == "PWKCN25" || promo == "SJDPO96" || promo == "POCIE24")
        return true;
    else
        return false;
}

//Inoltre se il codice fornito è valido, eliminare quel codice dall’elenco dei codici sconto disponibili, il codice sconto non sarà più usabile.



//bonus funzione  guarda la promo codice se e valio e torna  codice e valido e lo remove di validi codici se no ne e valido o lo usi piu di una volta torna non e valido
function bonusPromo(promo, lista) {

    let flag = false;
    for (let i = 0; i < lista.length; i++) {
        if (promo == lista[i]) {
            delete lista[i];
            flag = true;
        }

    }
    return flag;
}