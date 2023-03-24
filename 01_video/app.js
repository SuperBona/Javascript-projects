// MDN
/* The DOMContentLoaded event fires when the initial html document has been completely loaded and parsed,
without waiting for stylesheets, images, and subframes to finish loading */
/* The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images */

const btn = document.querySelector(".switch-btn");
const video = document.querySelector(".video-container");

btn.addEventListener("click", function () {
  if (!btn.classList.contains("slide")) {
    //Se il btn non ha questa classe (!)
    btn.classList.add("slide");
    video.pause();
  } else {
    btn.classList.remove("slide");
    video.play();
  }
  //adesso il rettangolino blu si sposta al click su pause e su play e ho anche attivato le funzioni
});

//PRELOADER -> uso la funzione load
const preloader = document.querySelector(".preloader");
window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});

//provo a nascondere il titolo e a farlo riapparire al click
const title = document.getElementById("title");

/* title.addEventListener("click", function () {
  if (title.style.display === "none") {
    title.style.display = "block";
  } else {
    title.style.display = "none";
  }
});
 */

title.addEventListener("click", function () {
  if (title.style.visibility === "hidden") {
    title.style.visibility = "visible";
  } else {
    title.style.visibility = "hidden";
  }
});
