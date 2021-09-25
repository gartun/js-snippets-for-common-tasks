const header = document.querySelector("header");

// Boolean for avoiding repetitive tasks
let isReplaced = false;

window.onscroll = function () {
  setTimeout(() => {
    if (window.pageYOffset > getHeaderHeight()) {
      if (!isReplaced) {
        createReplacer();

        isReplaced = true;
      }

      addClass("fixed");
      addClass("animation-class");
    } else {
      if (isReplaced) {
        removeReplacer();

        isReplaced = false;
      }

      remClass("fixed");
      remClass("animation-class");
    }
  }, 150);
};

function getHeaderHeight() {
  return header.offsetHeight;
}

function addClass(cls) {
  const clsList = [].slice.call(header.classList);

  if (clsList.indexOf(cls) === -1) header.classList.add(cls);
}

function remClass(cls) {
  header.classList.remove(cls);
}

// we are creating a replacer to prevent the page from jumping
// when we fix the header.
function createReplacer() {
  const replacer = document.createElement("div");

  // NOT TESTED! added here so that screen-readers don't get confused
  replacer.setAttribute("aria-hidden", "true");

  replacer.style.height = getHeaderHeight() + "px";
  replacer.className = "replacer-div";

  document.body.insertBefore(replacer, header);
}

function removeReplacer() {
  // find the node with the className 'replacer-div' and remove it
  document.body.removeChild(document.querySelector(".replacer-div"));
}
