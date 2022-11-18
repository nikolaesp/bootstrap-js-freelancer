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




//calcula il prezzo del lavoro a base di tipo di lavoro e calcula se hai sconto o no
function calcolaPrezzo(event) {
    event.preventDefault();
    let promocode = document.getElementById("promocode").value;
    let prmcd = promoCodice(promocode);
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
        document.getElementById("prezzoHtml").innerText = "\t\t" + prezzo + "€";
        document.getElementById("promocode").innerHTML.style.color = "green"; 

    } else {
        document.getElementById("promocode").innerHTML.style.color = "red"; 
        document.getElementById("prezzoHtml").innerText = "\t\t" + prezzo + "€";
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
function bonusPromo(promo) {
    let codes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];
    let flag = false;
    for (let i = 0; i < codes.length; i++) {
        if (promo == codes[i]) {
            codes.splice(i, 1);
            flag = true;
        }

    }
    return flag;
}