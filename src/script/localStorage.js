import { MONTHLY_DATA } from './dataApp';
import { createTableProjects } from './tableProject';
import { createTableEmployees } from './tableEmployees';

export function setLocalStorage() {
  localStorage.setItem('isUpdatePage', 'true');
  localStorage.setItem('local-MONTHLY_DATA', JSON.stringify(MONTHLY_DATA));
}

export function getLocalStorageForUpdateTabels() {
  if (localStorage.getItem('isUpdatePage')) {
    const MONTHLY_DATA_localJson = localStorage.getItem('local-MONTHLY_DATA');
    const MONTHLY_DATA_local = JSON.parse(MONTHLY_DATA_localJson);

    for (let key in MONTHLY_DATA_local){
      MONTHLY_DATA[key] = MONTHLY_DATA_local[key];
    }

    console.log('MONTHLY_DATA_local', MONTHLY_DATA_local);
    updateTablesAfterRebootPage();
  }
}

const updateTablesAfterRebootPage = () => {
  const periodMonth = document.querySelector('.list-month').value;
  const periodYear = document.querySelector('.list-year').value;
  const keyObjData = `${periodYear}-${periodMonth}`;

  MONTHLY_DATA[keyObjData].projects.forEach(project => {
    createTableProjects(project);
  });

  MONTHLY_DATA[keyObjData].employees.forEach(employee => {
    createTableEmployees(employee);
  });
};
