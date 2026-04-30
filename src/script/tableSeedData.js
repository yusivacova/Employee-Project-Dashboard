import { MONTHLY_DATA, defineDateKey } from './dataApp';
import { updateTablesProjectsAndEmployees, removeTablesProjectsAndEmployees } from './localStorage';

export function createTableSeedData() {
  const bodyTable = document.querySelector('.seed-data .table__body');

  for (const key in MONTHLY_DATA) {
    const trSeedData = createTrSeedData(MONTHLY_DATA[key], key);
    trSeedData.dataset.index = key;
    bodyTable.append(trSeedData);
  }
}

const createTrSeedData = (dataObject, data) => {
  const newTr = document.createElement('tr');
  newTr.className = 'table__item';

  const arrData = data.split('-');
  const nameMonthData = getNameMonth(arrData[1]);

  createTDtable(newTr, arrData[0]);
  createTDtable(newTr, nameMonthData);
  createTDtable(newTr, dataObject.projects.length);
  createTDtable(newTr, dataObject.employees.length);
  createTDtable(newTr, dataObject.total);
  createButtonSeed(newTr);

  console.log('dataObject', dataObject);

  return newTr;
};

const createTDtable = (container, value) => {
  const newTd = document.createElement('td');
  newTd.className = 'table__value';
  newTd.textContent = value;
  container.append(newTd);

  return newTd;
};

export const getNameMonth = (num) => {
  const allMonth = document.querySelectorAll('.list-month__item');
  let result;

  allMonth.forEach((item) => {
    if (item.value === num) result = item.textContent;
  });

  return result;
};

const createButtonSeed = (container) => {
  const newTd = createTDtable(container);
  const btnSeed = document.createElement('button');
  btnSeed.className = 'table__btn-seed';
  btnSeed.textContent = 'Seed';
  newTd.append(btnSeed);

  btnSeed.addEventListener('click', (e) => {
    const clickTag = e.target;
    seedEmployeeAndProject(clickTag);
    const seedData = document.querySelector('.seed-data');
    seedData.classList.add('inactive-class');
  });

  return btnSeed;
};

const seedEmployeeAndProject = (clickBtn) => {
  const parent = clickBtn.closest('.table__item');
  const keySelectetedObjData = parent.getAttribute('data-index');
  const keyObjDataCurrent = defineDateKey();

  if (!MONTHLY_DATA[keyObjDataCurrent]) {
    MONTHLY_DATA[keyObjDataCurrent] = { employees: [], projects: [], total: '$0.00' };
  }

  MONTHLY_DATA[keySelectetedObjData].projects.forEach((project) => {
    MONTHLY_DATA[keyObjDataCurrent].projects.push(project);
  });

  MONTHLY_DATA[keySelectetedObjData].employees.forEach((employee) => {
    MONTHLY_DATA[keyObjDataCurrent].employees.push(employee);
  });

  removeTablesProjectsAndEmployees();
  updateTablesProjectsAndEmployees();

  console.log(MONTHLY_DATA);

  console.log(clickBtn, 'clickBtn');
  console.log('parent', parent);
};
