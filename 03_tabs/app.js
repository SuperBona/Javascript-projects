/* seleziono about e target tutti i btn + article; aggiungo evento click ad about e btn, non article. 
Alla callback-function voglio poter accedere all'evento quindi inserisco il parametro e (event) nelle parentesi (e).
Ho dei btn nei diversi article, alcuni con i data-id e altri senza; a quelli con, posso accedere con dataSet.
Dopo aver inserito nel log il dataset.id, se cliccassi sul p dell'article otterei undefined perchè non ho un valore data-id, se invece clicco sui btn allora ottengo quel valore in console perchè questi li hanno
Voglio che se id è true, allora venga rimossa la classe active dai btn, perchè quando ci clicco sopra aggiungerò questa classe.
Quando clicco su un btn la classe active ora viene rimossa da tutti i btns e si aggiunge a quello che vado a cliccare
Devo rimuovere la stessa classe anche dai contents perchè voglio nasconderli, quelli non necessari.
*/

const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", function (e) {
  //console.log(e.target); // voglio vedere dove è il mio target -> quando ci clicco, vedo in console ciò su cui sto cliccando
  //console.log(e.target.dataset.id);
  const id = e.target.dataset.id;
  if (id) {
    //remove active from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });
    //hide other articles and display the one that has the matching id
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    //quale contenuto voglio a display?
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

//clicco su vision, in display ho solo ciò che riguarda vision; clicco su history, stessa cosa...
