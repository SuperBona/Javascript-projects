const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2023, 11, 31, 23, 30, 0); //(anno, mese, data, ora, secondi...)
//console.log(futureDate); //così facendo ottengo una stringa con la data inserita sopra
//se voglio avere una data specifica devo inserirla come valore
//ricordo che per i mesi e settimane sto lavorando con gli array

//ora devo estrarre questi valori; non posso sostituirli direttamente nell'heading, non funzionerebbe
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

//variabili
let month = futureDate.getMonth();
//console.log(months[month]); // in console ho il valore 11 che nell'array corrisponde a dicembre, ma se inserisco anche [month] ottendo non il valore numero ma il mese, il nome
month = months[month];

const date = futureDate.getDate();

//aggiungo anche il nome del giorno
//const weekday = futureDate.getDay();
//console.log(weekday); //ottengo il numero dell'array, voglio il nome del giorno
const weekday = weekdays[futureDate.getDay()];

//aggiorno l'h4 .giveaway
giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month} ${year}, ${hours}:${minutes}pm`;

/* ========= FUTURE TIME IN MS ======== */
/* ========= IMPOSTO IL TIMER ========= */
const futureTime = futureDate.getTime();
//console.log(futureTime); //ottengo un numero lunghissimo

function getRemainingTime() {
  const today = new Date().getTime();
  //console.log(today); //ottengo un altro numerone, posso sottrarre i valori dei due numeroni
  //devo calcolare la differenza dei giorni rimanenti, ecc---
  const t = futureTime - today;
  console.log(t); //questi sono i ms di differenza
  // 1s = 1000ms / 1m = 60s / 1hr = 60min / 1d = 24hr
  //quanti giorni ci sono in questo numero calcolato?
  //values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  //console.log(oneDay); //1 giorno contiene 86400000 ms
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  //calculate all values
  let days = t / oneDay;
  //console.log(days); //da oggi, 17/03/2023, ho 289 per arrivare al 31 dicembre. mi interessa solo il valore intero
  days = Math.floor(days);

  //let hours = t / oneHour;
  //console.log(hours);
  //dato che ho sia i giorni che le ore, voglio mettere a display i giorni e solo dopo l'avanzo delle ore rimaste prima di raggiungere l'orario in cui scade il giveaway
  //come ottenere un reminder, devo trasformare la costante let hours
  let hours = Math.floor((t % oneDay) / oneHour);
  //console.log(hours);

  let minutes = Math.floor((t % oneHour) / oneMinute);

  let seconds = Math.floor((t % oneMinute) / 1000);

  //set values array
  const values = [days, hours, minutes, seconds];

  //se il valore è minore di 10, voglio aggiungere uno 0 davanti (ex, 01, 02...)
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  //quando t è < 0 il current time è > del future time. imposto la deadline
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class='expired'>sorry, this giveaway has expired</h4>`;
  }
}

//per rendere dinamico il conto alla rovescia
//countdown
//set interval (cosa voglio fare, ogni quanto -> ogni secondo)
let countdown = setInterval(getRemainingTime, 1000); //ora in console ogni secondo mi si carica una nuova stringa numerica con i ms in meno
//mi si aggiorna anche il timer

getRemainingTime();

// CERCO DI RIFARE IL PROGETTO MA CON LE DATE DINAMICHE, REALISTICO, IL TEMPO DEVE ESSERE REALISTICO

//imposto funzionalità per cui il termine è impostato 10 giorni avanti al nostro giorno attuale
