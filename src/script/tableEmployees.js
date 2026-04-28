export function createTableEmployees(newEmployee) {
  const bodyTable = document.querySelector('.table-employee .table__body');
  const trEmployee = createTrEmployee(newEmployee);
  bodyTable.append(trEmployee);
}

const createTrEmployee = (employee) => {
  const newTr = document.createElement('tr');
  newTr.className = 'table__item';
  console.log('employee', employee);

  createTDtable(newTr, employee['Name']);
  createTDtable(newTr, employee['Surname']);
  createAgeEmployee(newTr, employee['Date of birth']);
  createTDtable(newTr, employee['Position']);
  createTDtable(newTr, employee['Salary']);


  return newTr;
};

const createTDtable = (container, value) => {
  const newTd = document.createElement('td');
  newTd.className = 'table__value';
  if (value) newTd.textContent = value;
  container.append(newTd);

  return newTd;
};

const createAgeEmployee = (container, dateAge) => {
  const today = new Date().toISOString().slice(0, 10);
  const arrToday = today.split('-');
  const arrDateAge = dateAge.split('-');

  let age = arrToday[0] - arrDateAge[0];

  if (arrDateAge[1] > arrToday[1]) age -= 1;

  const newTd = createTDtable(container, age);

  return newTd;
};
