import { MONTHLY_DATA } from './dataApp';

export function createTableSeedData() {
  const bodyTable = document.querySelector('.seed-data .table__body');

  for (let key in MONTHLY_DATA) {
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

const getNameMonth = (num) => {
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

  return btnSeed;
};
