const btnWrapper = document.querySelector(".hmbrgr-btn-wrapper");
const mainNavLinks = document.querySelectorAll("#main-nav a");

btnWrapper.addEventListener("click", openMenu);

function openMenu() {
  btnWrapper.classList.toggle("open");
  
  const curr = btnWrapper.getAttribute("aria-expanded");
  
  if(curr === "false") {
    btnWrapper.setAttribute("aria-expanded", "true");
    btnWrapper.setAttribute("aria-label", "Navigasyon listesini kapat");
    makeFocusable()
  } else {
    btnWrapper.setAttribute("aria-expanded", "false");
    btnWrapper.setAttribute("aria-label", "Navigasyon listesini aç");
    makeUnfocusable();
  }
}


/**
 * Functions for making navigation links either focusable
 * or unfocusable depending on the situation. These must
 * be used only on mobile.
 */
function makeUnfocusable() {
  mainNavLinks.forEach(l => {
    l.setAttribute("tabindex", "-1");
  })
}

function makeFocusable() {
  mainNavLinks.forEach(l => {
    l.removeAttribute("tabindex");
  })
}

/**
 * Had to encapsulate the logic in a func to use it more than one time.
 * when Screen is not wider than 600px, links will be unfocusable. 
 */
function focusOrNot() {
  const mql = window.matchMedia("(max-width: 600px)");
  
  if(mql.matches) {
    makeUnfocusable();
  } else {
    makeFocusable();
  }
}

window.addEventListener("load", focusOrNot);
window.addEventListener("resize", focusOrNot);