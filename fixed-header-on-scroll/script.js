const header = document.querySelector('header');

// Boolean for avoiding repetitive tasks
let isReplaced = false;

window.onscroll = function() {
  const winTop = window.pageYOffset;
  if(winTop > getHeaderHeight()) {
    if(!isReplaced) createReplacer();
    isReplaced = true;

    header.classList.add('fixed');
  } else {
    if(isReplaced) removeReplacer();
    isReplaced = false;

    header.classList.remove('fixed');
  }
  
}

function getHeaderHeight() {
  return header.offsetHeight;
}

// we are creating a replacer to prevent the page from jumping
// when we fix the header.
function createReplacer() {
  const replacer = document.createElement('div');

  // NOT TESTED! added here so that screen-readers don't get confused
  replacer.setAttribute("aria-hidden", "true");


  replacer.classList.add("replacer-div");
  replacer.style.height = getHeaderHeight() + "px";
  document.body.insertBefore(replacer, header);
}

function removeReplacer() {
  // find the node with the className 'replacer-div' and remove it
  document.body.removeChild(document.querySelector(".replacer-div"));
}