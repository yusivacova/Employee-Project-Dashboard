import { MONTHLY_DATA } from './dataApp';

export function createTableProjects(newProject, index) {
  const bodyTable = document.querySelector('.table-projects .table__body');
  const trProject = createTrProject(newProject);
  trProject.dataset.index = index;
  bodyTable.append(trProject);
}

const createTrProject = (project) => {
  const newTr = document.createElement('tr');
  newTr.className = 'table__item';

  createTDtable(newTr, project['Company Name']);
  createTDtable(newTr, project['Project Name']);
  createTDtable(newTr, `$${project.Budget}`);
  createTDtable(newTr, `0.0/${project['Employee Capacity']}`);
  createButtonShowEmployees(project, newTr);
  createEstimatedIncome(project, newTr);
  createButtonDelete(newTr);

  return newTr;
};

const createTDtable = (container, value) => {
  const newTd = document.createElement('td');
  newTd.className = 'table__value';
  if (value) newTd.textContent = value;
  container.append(newTd);

  return newTd;
};

const createButtonDelete = (container) => {
  const newTd = createTDtable(container);
  const btnDelete = document.createElement('button');
  btnDelete.className = 'table__btn-delete';
  btnDelete.textContent = 'Delete';
  newTd.append(btnDelete);

  return btnDelete;
};

const createEstimatedIncome = (project, container) => {
  //нужно снчала посчитать и записать в проект в общий объект значние
  // и потом его включить
  const newTd = document.createElement('td');

  if (project['Estimated Income']) {
    //Project income = total revenue - total cost
    newTd.className = 'table__value estimated-income profit';
    newTd.textContent = 'total revenue - total cost';
  } else {
    newTd.className = 'table__value estimated-income profit';
    newTd.textContent = '$0.00';
  }
  container.append(newTd);
};

const createButtonShowEmployees = (project, container) => {
  //если мы назначили работника - то нужно сделать кнопку показать раблотников
  //а так не делать кнопку

  if (project.Employees) {
    const newTd = createTDtable(container);
    const btnShowEmployees = document.createElement('button');
    btnShowEmployees.className = 'table__btn-show-employees';
    btnShowEmployees.textContent = 'Show Employees (0)';
    newTd.append(btnShowEmployees);
  } else {
    createTDtable(container, '-');
  }
};

export const updateTotalEstimatedIncome = () => {
  const valueTotal = document.querySelector('.main-content__value');
  const allEstimatedIncome = document.querySelectorAll('.estimated-income');
  const periodMonth = document.querySelector('.list-month').value;
  const periodYear = document.querySelector('.list-year').value;
  const keyObjData = `${periodYear}-${periodMonth}`;
  let sumEstimatedIncome = 0;
  let sumPartSalaryEmployees = 0;

  allEstimatedIncome.forEach((item) => {
    sumEstimatedIncome += Number(item.textContent.slice(1));
  });

  if (MONTHLY_DATA[keyObjData].employees) {
    MONTHLY_DATA[keyObjData].employees.forEach((employee) => {
      sumPartSalaryEmployees += employee.Salary / 2;
    });

    const total = sumEstimatedIncome - sumPartSalaryEmployees;

    if (total) {
      MONTHLY_DATA[keyObjData].total = `$${total}`;
      valueTotal.textContent = `$${total}`;
    }

    if (total > 0) {
      valueTotal.classList.remove('not-profit');
      valueTotal.classList.add('profit');
    }

    if (total < 0) {
      valueTotal.classList.add('not-profit');
      valueTotal.classList.remove('profit');
    }
  }
};

export const returnInitialTotalEstimatedIncome = () => {
  const valueTotal = document.querySelector('.main-content__value');
  valueTotal.className = 'main-content__value profit';
  valueTotal.textContent = '$0.00';
};
