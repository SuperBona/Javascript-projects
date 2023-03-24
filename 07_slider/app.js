/* 
seleziono le slide e i btn. inizio poi a iterare sopra le slides: in base a dove sono posizionati gli item mi muovo a 0, 100, 200%...
ho una node list, posso iterarci sopra con forEach, attraverso la cui funzione callback posso accedere a ogni item. in questo caso mi serve avere un index opzionale perchè voglio controllare dove si trova l'item nella nodelist.
a tutte le slide (edito la classe .slide) voglio aggiungere la proprietà left e gli inserisco come valore un template string per accedere a un'espressione - è lo stesso di scrivere in css .slide:nth-child(1) = left 0 ; ...(2) = left 100% ... .
adesso vedo come prima slide la prima slide e non più la quarta. Devo controllare quale mostrare e quale nascondere. Inizio dall'opzione per cui posso navigare dalla prima all'ultima e viceversa.
Imposto un counter, che è uguale a 0, visto che sto all'inizio, e attivo i btn. imposto che nextBtn mi fa andare avanti di uno e il prev indietro di 1, quindi uso il counter++ e --.
Ora imposto una funzione che prende il valore del counter e aggiunge il translateX() a tutte le slides.
Così facendo posso navigare tra una slide e l'altra. Ogni volta che aumento, itero sulle slides. Ancora non faccio nulla per navigare dalla prima all'ultima. mi occupo dopo.
con translateX(-...) mi sposto a sinistra e con il valore positivo a dx. Devo invocare la funzione carousel all'interno delle click function precedenti per attivarla.
Ricordo, counter = 0 perchè inizio da 0. Quando clicco su next, il counter diventa 1, se mi sposto ancora, 2, e transformX)100%, 200%...
Ho due opzioni quando arrivo alla fine delle slide, torno alla prima o mi sposto indietro fino alla prima. Imposto le condizioni if. Una volta che arrivo all'ultima slide, se clicco next ritorno alla prima, il counter torna a 0.
Posso lavorare anche con i btn. Quando sono alla prima slide voglio nascondere il prevBtn e quando sono all'ultima voglio nascondere il nextBtn.
*/

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});
let counter = 0;
nextBtn.addEventListener("click", function () {
  counter++;
  carousel();
});

prevBtn.addEventListener("click", function () {
  counter--;
  carousel();
});

function carousel() {
  // working with slides
  /*  if (counter === slides.length) {
    counter = 0;
  }
  if (counter < 0) {
    counter = slides.length - 1;
  } */

  // working with buttons
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }
  //ora il nextBtn sparisce quando sono all'ultima slide

  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }
  //stesso per il prevBtn

  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

//prevBtn.style.display = "none";
