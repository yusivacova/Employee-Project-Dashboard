import { MONTHLY_DATA, defineDateKey } from './dataApp';
import { updateTablesProjectsAndEmployees, removeTablesProjectsAndEmployees } from './localStorage';

export const deletePtoject = (clickBtn) => {
  const parent = clickBtn.closest('.table__item');
  const indexProject = parent.getAttribute('data-index');
  const keyObjData = defineDateKey();

  MONTHLY_DATA[keyObjData].projects.splice(indexProject, 1);

  if (!MONTHLY_DATA[keyObjData].projects.length && !MONTHLY_DATA[keyObjData].employees.length) {
    delete MONTHLY_DATA[keyObjData];
  }

  removeTablesProjectsAndEmployees();
  updateTablesProjectsAndEmployees();
};
