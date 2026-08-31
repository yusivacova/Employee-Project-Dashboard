export function setMode() {
  setModeApp();
}

const setModeApp = () => {
  const sidebarModes = document.querySelector('.sidebar__modes');

  sidebarModes.addEventListener('click', (e) => {
    const clickTag = e.target;
    removeModeActiveClass();
    addModeActiveClass(clickTag);
    changeMainContent(clickTag);
  });
};

const addModeActiveClass = (tag) => {
  tag.classList.add('mode-active');
};

const removeModeActiveClass = () => {
  const btnsMode = document.querySelectorAll('.sidebar__modes-btn');

  btnsMode.forEach((btn) => {
    btn.classList.remove('mode-active');
  });
};

const changeMainContent = (tag) => {
  const contentProject = document.querySelector('.main-content__projects');
  const contentEmployees = document.querySelector('.main-content__employees');
  if (tag.textContent === 'Projects') {
    contentProject.classList.remove('inactive-class');
    contentEmployees.classList.add('inactive-class');
  }
  if (tag.textContent === 'Employees') {
    contentProject.classList.add('inactive-class');
    contentEmployees.classList.remove('inactive-class');
  }
};
