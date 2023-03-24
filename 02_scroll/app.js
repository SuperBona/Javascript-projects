/* pageYOffset is a read-only window property that returns the number of pixels the document has been scrolled vertically. */
/* slice extracts a section of a string without modifying original string */
/* offsetTop - a number, representing the top position of the element, in pixels */
/* Element.getBoundingClientRect() method returns the size of an element and its position relative to viewport */

//UPDATE CURRENT YEAR -> date
let date = document.querySelector(".date");
date.innerHTML = new Date().getFullYear();

//TOGGLE LINKS
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  //in css ho nascosto i links su schermo piccolo, devo reinserirlo attraverso l'height
  //linksContainer.classList.toggle("show-links");  ->primo modo per risolverlo, basta questa riga
  // uso il metodo dinamico
  const containerHeight = linksContainer.getBoundingClientRect().height;
  //console.log(containerHeight); //nella console se clicco il toggle-btn ottengo l'oggetto e le sue coordinate. height = 0, perchè di default l'abbiamo messa a 0 in css, perchèla voglio nascondere di default
  //voglio accedere alla vera height di .links, posso usare la lenght di .links e l'height del singolo .scroll-link
  const linksHeight = links.getBoundingClientRect().height;
  //console.log(linksHeight); //ottengo il valore 201.60..., basato sui 4 links; se ne avevo 3 il valore era 150
  if (containerHeight === 0) {
    //aggiungo dinamicamente l'height al container
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    //se sono già aperti
    linksContainer.style.height = 0;
  }
});

//FIXED NAVBAR
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
window.addEventListener("scroll", function () {
  //console.log(window.pageYOffset); //se il numero che esce in console è più grande dell'height della navbar, aggiungo una specifica classe -> fixed-nav
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  //lo stesso deve succedere con il btn
  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});
//se clicco il btn il transito al top della pagina è immediato senza transizione

//SMOOTH SCROLL
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    //prevent default
    e.preventDefault();
    //navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    //console.log(id); //Se clicco sul link in console ho il suo id ora
    //slice(1) mi riporta al primo index, index 1
    const element = document.getElementById(id);
    //calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    //ora voglio prendere la posizione di questo elemento
    let position = element.offsetTop - navHeight; //per arrivare giusti alla sezione
    //console.log(position); //ottengo un valore dinamico che cambia in base al setup, ovvero la posizione di questo elemento
    //quando clicco sul link voglio andare a quel punto

    if (!fixedNav) {
      position = position - navHeight;
    }
    //per schermi più piccoli, per arrivare alla posizione giusta
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    //close
    linksContainer.style.height = 0;
    //devo calcolare le heights
  });
});
