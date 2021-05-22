const btnWrapper = document.querySelector(".hmbrgr-btn-wrapper");

btnWrapper.addEventListener("click", openMenu);

function openMenu() {
  btnWrapper.classList.toggle("open");
}