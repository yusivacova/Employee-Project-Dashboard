import { updateTablesProjectsAndEmployees, removeTablesProjectsAndEmployees } from './localStorage';

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
  console.log(arrToday)

  const periodMonth = document.querySelector('.list-month');
  periodMonth.value = arrToday[1];
  console.log('periodMonth', periodMonth)
  const periodYear = document.querySelector('.list-year');
  periodYear.value = arrToday[0];
};

const monitorValueСhangeMonthrApp = () => {
  const periodMonth = document.querySelector('.list-month');

  periodMonth.addEventListener('change', () => {
    removeTablesProjectsAndEmployees();
    updateTablesProjectsAndEmployees();
  });
};

const monitorValueСhangeYearApp = () => {
  const periodYear = document.querySelector('.list-year');

  periodYear.addEventListener('change', () => {
    removeTablesProjectsAndEmployees();
    updateTablesProjectsAndEmployees();
  });
};

export function setMenu() {
  openCloseMenu();
  setCurrentMonthAndYear();
  monitorValueСhangeMonthrApp();
  monitorValueСhangeYearApp()
}
