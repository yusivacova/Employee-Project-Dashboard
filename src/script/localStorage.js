import { MONTHLY_DATA } from './dataApp';
import { createTableProjects } from './tableProject';
import { createTableEmployees } from './tableEmployees';
import { returnInitialTotalEstimatedIncome } from './tableProject';

export function setLocalStorage() {
  localStorage.setItem('isUpdatePage', 'true');
  localStorage.setItem('local-MONTHLY_DATA', JSON.stringify(MONTHLY_DATA));
}

export function getLocalStorageForUpdateTabels() {
  if (localStorage.getItem('isUpdatePage')) {
    const MONTHLY_DATA_localJson = localStorage.getItem('local-MONTHLY_DATA');
    const MONTHLY_DATA_local = JSON.parse(MONTHLY_DATA_localJson);

    for (let key in MONTHLY_DATA_local) {
      MONTHLY_DATA[key] = MONTHLY_DATA_local[key];
    }

    updateTablesProjectsAndEmployees();
  }
}

export const updateTablesProjectsAndEmployees = () => {
  const periodMonth = document.querySelector('.list-month').value;
  const periodYear = document.querySelector('.list-year').value;
  const keyObjData = `${periodYear}-${periodMonth}`;

  if (MONTHLY_DATA[keyObjData]) {
    MONTHLY_DATA[keyObjData].projects.forEach((project, index) => {
      createTableProjects(project, index);
    });

    MONTHLY_DATA[keyObjData].employees.forEach((employee, index) => {
      createTableEmployees(employee, index);
    });
  } else {
    returnInitialTotalEstimatedIncome();
  }
};

export const removeTablesProjectsAndEmployees = () => {
  const bodyTableProjects = document.querySelector('.table-projects .table__body');
  bodyTableProjects.innerHTML = '';
  const bodyTableEmployees = document.querySelector('.table-employee .table__body');
  bodyTableEmployees.innerHTML = '';
};
