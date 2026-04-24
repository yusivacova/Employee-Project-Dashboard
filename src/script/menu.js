const changeImgMenu = (status) => {
  const imgSrc = {
    close: 'assets/images/close-arrow.png',
    open: 'assets/images/open-arrow.png',
  };

  const img = document.querySelector('.header__sidebar-btn-img-tag');
  img.src = imgSrc[status];
};

const openCloseMenu = () => {
  const btnMenu = document.querySelector('.header__sidebar-btn');

  btnMenu.addEventListener('click', () => {
    const menu = document.querySelector('.sidebar');
    menu.classList.toggle('inactive-class');

    if (menu.classList.contains('inactive-class')) {
      changeImgMenu('open');
    } else {
      changeImgMenu('close');
    }
  });
};

export function setMenu() {
  openCloseMenu();
}
