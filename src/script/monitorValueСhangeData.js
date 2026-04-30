import { updateTablesProjectsAndEmployees, removeTablesProjectsAndEmployees } from './localStorage';

export function monitorValueСhangeMonthrApp() {
  const periodMonth = document.querySelector('.list-month');

  periodMonth.addEventListener('change', () => {
    removeTablesProjectsAndEmployees();
    updateTablesProjectsAndEmployees();
  });
}

export function monitorValueСhangeYearApp() {
  const periodYear = document.querySelector('.list-year');

  periodYear.addEventListener('change', () => {
    removeTablesProjectsAndEmployees();
    updateTablesProjectsAndEmployees();
  });
}
