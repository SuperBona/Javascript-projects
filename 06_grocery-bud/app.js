// ========= SELECT ITEMS ==========
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//edit option
let editElement;
let editFlag = false; //sarà false di default -> non sto editando
let editID = ""; //sarà un empty string

// ========= EVENT LISTENERS =========
//submit form
form.addEventListener("submit", addItem);
//clear items
clearBtn.addEventListener("click", clearItems); //imposto un nome alla funzione per richiamarla dopo
//accesso a delete ed edit btn
const deleteBtn = document.querySelector(".delete-btn");
const editBtn = document.querySelector(".edit-btn");
window.addEventListener("DOMContentLoaded", setupItems);

// ========= FUNCTIONS ==========
//submit form
function addItem(e) {
  e.preventDefault(); //per prevenire il comportamento di default del submit, che invia i dati
  //console.log(grocery.value); // quando premo submit, il valore di #grocery viene inserito in console
  const value = grocery.value;
  const id = new Date().getTime().toString(); //voglio convertire il Time in una stringa (ms) -> ID sarà il codice identificativo di ogni item, e corrispondendo ai millisecondi del time attuale sarà un valore sempre diverso
  //console.log(id);
  // quando submit il form ho 3 opzioni -> aggiungere l'item nella lista / se non sto editando, quindi edit = false, avrò un'altra opzione dove editare, quindi diventa true / se l'user non ha aggiunto alcun valore -> conduìitions
  // PRIMO MODO PER SCRIVERE LE CONDIZIONI
  // *****************
  /* if (value !== "" && editFlag === false) {
    //se il valore non è una stringa vuota e editFlag = false (valore di default)
    console.log("add item to the list");
  } else if (value !== "" && editFlag === true) {
    //se entrambe le condizioni sono vere
    console.log("editing");
  } else {
    //altrimenti
    console.log("empty value");
  } */
  // *****************
  // SECONDO MODO PER SCRIVERE LE CONDIZIONI
  if (value && !editFlag) {
    createListItem(id, value);
    /* const element = document.createElement("article"); //creo un article in questa condizione e gli metto un id dataset
    //add class
    element.classList.add("grocery-item");
    //add id -> creo una costante per assegnare un attributo data-id che andrò ad assegnare al grocery-item
    const attr = document.createAttribute("data-id");
    attr.value = id; //imposto un valore all'attributo
    element.setAttributeNode(attr); //method name
    //lo aggiungo ad html
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
    //DELETE e EDIT BTN
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    //append child -> verrà aggiunto l'elemento inviato nel form alla lista e verrà messo a display con le proprietà e valori assegnati
    list.appendChild(element); */
    //display element
    displayAlert("item added to the list", "success");
    //show container
    container.classList.add("show-container");
    //ed ecco che ora viene mostrato l'oggetto, ma vanno ancora abilitati i comandi modifica e elimina e clear items
    //add to local storage -> più voce sotto
    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value; //ricordo che vaulue = grocery-value
    displayAlert("value changed", "success");
    //edit local storage
    editLocalStorage(editID, value); //id vecchio e id nuovo nel local storage
    setBackToDefault(); //per ritornare ai valori iniziali
  } else {
    //console.log("empty value");
    /* alert.textContent = "empty value"; */
    //ho una classe con alert, una con alert-danger e una alert-success
    /* alert.classList.add("alert-danger"); */
    //collego questa funzione a quella sotto
    displayAlert("please enter value", "danger");
  }
  // *****************
}
//concetto di truthy e falsy -> se ho un valore, value is truthy
/* if(value){
    console.log('value is truthy);
} */
//se non ho alcun valore, allora è falsy
/* if(!value){
    console.log('value is falsy');
} */
/* 
if(value && !editFlag){
    value è true e !editFlag (se è false) è true perchè di default editFlag è false -> condizioni soddisfatte
    console.log()
} */
/* 
if(value && editFlag){
    value è true e editFlag (se è true) è false perchè di default editFlag è false -> condizioni non soddisfatte
    console.log
} */

//DISPLAY ALERT
//inserisco i due arguments -> ciò che voglio mostrare (testo) e il tipo di azione - alert-danger o alert-success
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000); //deve durare un secondo
}

// ========= CLEAR ITEMS ==========
function clearItems() {
  //per eliminare tutti gli item listati
  const items = document.querySelectorAll(".grocery-item");
  //voglio controllare che la lenght di questa node list sia maggiore di 0, quindi che ci siano items, e che questi vengano eliminati, iterando sopra; uso la list variable, il parent container, e poi rimuovo l'item dalla list
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
      //se rimuovo gli items dalla list, voglio anche rimuovere il container, devo rimuovere la classe show-container
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  //ora, quando non ci sono elementi in lista, non ci sarà più nemmeno il btn clear items e mi compare un alert quando faccio clean
  setBackToDefault(); //importante perchè metto altre funzioni
  //ora voglio rimuovere la lista dal local storage
  localStorage.removeItem("list");
}

//DELETE FUNCTION
function deleteItem(e) {
  //console.log("item deleted");
  //quando clicco voglio accedere al grocery-item e rimuoverlo dalla grocery-list
  const element = e.currentTarget.parentElement.parentElement; //currentT per accedere all'elemento giusto, non al font-icon, e voglio arrivare all'elemento genitore, il grocery-list; passo dal btn, al container del btn, all'item list completo con dentro testo e btn
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.lenght === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  //remove from local storage
  removeFromLocalStorage(id); //devo impostare ancora l'id - const id
}

//EDIT FUNCTION
function editItem(e) {
  //console.log("edit item");
  const element = e.currentTarget.parentElement.parentElement;
  //set edit item
  editElement = e.currentTarget.parentElement.previousElementSibiling; //cerco per il sibiling, il p con valore title
  //set form value
  grocery.value = editElement.innerHTML;
  editFlag = true; //deve essere true perchè sto editando
  editID = element.dataset.id; //per accedere
  //cambio il valore nel submit
  submitBtn.textContent = "edit"; //a questo punto non è solo submit, ma anche editing
  //il valore che seleziono da modificare viene riportato alla barra submit e il btn submit cambia la scritta in edit
}

//set back to default
function setBackToDefault() {
  //ogni volta che imposto un valore e lo invio, questo rimane nella barra e va cancellato manualmente per scrivere quello nuovo
  //console.log("set back to default"); //invece di ritornare il valore setBackToDefault, voglio che le cose tornino al setup di base
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ========= LOCAL STORAGE ==========
//per aggiornare i valori e riprenderli, editarli, serve il local storage - local storage api
//comandi importanti - setItem, getItem, removeItem, save as strings

function addToLocalStorage(id, value) {
  //console.log("added to local storage");
  const grocery = { id: id, value: value }; //oppure {id, value} //indico che l'id di quello che verrà messo nel local deve essere l'id dell'item e il suo valore
  //console.log(grocery);
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  //l'id lo prendo dal data id
  let items = getLocalStorage(); //che sia array vuoto o con items
  //avendo l'array voglio iterare
  items = items.filter(function (item) {
    //filtro i valori che non corrispondono all'id e faccio passare quelli che corrispondono, rimuovendoli
    if (item.id !== id) {
      return item;
    }
  });
  //imposto i valori nuovi
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  //quando voglio modificare il valore, il testo, questo viene rimandato nella casella submit che prende il testo edit, e da lì posso modificarlo, e viene sostituito il valore vecchio con quello nuovo
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value; //se corrisponde, value = new value
    }
    return item; //altrimenti return l'item
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : []; //voglio prendere l'item con il valore di list, esce undefined o null. se c'è un valore, voglio assegnarlo alla variabile, se non c'è voglio impostarlo come array vuoto
  //console.log(items); //al primo valore non ci sarà nulla, verrà dato u ìn array vuoto, ma la seconda volta si attiva questa funzione, si crea un array con due items, il primo e il secondo scritto, e così via
}

/* localStorage.setItem("orange", JSON.stringify(["item", "item2"])); //nome con cui lo voglio salvare, metodo con cui lo vado a salvare nello storage
//nel local storage ora ho il key-value che è il nome e il value che è l'array inserito, che contiene i valori inseriti
const oranges = JSON.parse(localStorage.getItem("orange")); //così recupero l'item che voglio dal local storage
//console.log(oranges);
localStorage.removeItem("orange"); //per rimuovere il key value e i suoi valori
 */
// ========= SETUP ITEMS ==========
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      //in items ho 2 proprietà, id e value
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}

function createListItem(id, value) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  list.appendChild(element);
}

//se refresho la pagina, i valori restano, li devo cancellare

//PER VEDERE I VALORI STORAGE -> archiviazione - locale
