import { createTableSeedData } from './tableSeedData';

export function setSeedData() {
  openSeedData();
  closeSeedData();
}

const openSeedData = () => {
  const btnAddProject = document.querySelector('.btn-data-project');
  const seedData = document.querySelector('.seed-data');

  btnAddProject.addEventListener('click', () => {
    removeSeedDataTable();
    seedData.classList.remove('inactive-class');
    createTableSeedData();
  });
};

const closeSeedData = () => {
  const seedData = document.querySelector('.seed-data');

  seedData.addEventListener('click', (e) => {
    const clickTag = e.target;
    if (clickTag.className === 'main-content__seed-data seed-data' || clickTag.className.includes('seed-data__cross')) {
      seedData.classList.add('inactive-class');
    }
  });
};

const removeSeedDataTable = () => {
  const bodyTable = document.querySelector('.seed-data .table__body');
  bodyTable.innerHTML = '';
};
