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
    menu.classList.toggle('close-menu');
    setTimeout(() => {
      menu.classList.toggle('inactive-class');
    }, 200);

    if (menu.classList.contains('close-menu')) {
      changeImgMenu('open');
    } else {
      changeImgMenu('close');
    }
  });
};

const setCurrentMonthAndYear = () => {
  const today = new Date().toISOString().slice(0, 10);
  const arrToday = today.split('-');

  const periodMonth = document.querySelector('.list-month');
  const currentMonth = arrToday[1] - 1;
  periodMonth.value = (currentMonth.length === 2) ? currentMonth : `0${currentMonth}`;
  const periodYear = document.querySelector('.list-year');
  periodYear.value = arrToday[0];
};

export function setMenu() {
  openCloseMenu();
  setCurrentMonthAndYear();
}
