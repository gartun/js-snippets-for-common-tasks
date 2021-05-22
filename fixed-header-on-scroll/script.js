const header = document.querySelector('header');

window.onscroll = () => {
  const winTop = window.pageYOffset;
  
  if(winTop > getHeaderHeight()) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
  
}

function getHeaderHeight() {
  return header.offsetHeight;
}

function createWrapper() {
  const wrapper = document.createElement('div');
  wrapper['aria-hidden'] = 'true';
  
}