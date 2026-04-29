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
  createTDtable(newTr, `$${employee['Salary']}`);
  createEstimatedPayment(newTr, employee['Salary']);
  createButtonShowAssignments(newTr);
  createProjectedIncome(newTr);
  createButtonsActions(newTr);

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

const createEstimatedPayment = (container, salary) => {
  const valueEstimatedPayment = `$${salary / 2}`;
  const newTd = createTDtable(container, valueEstimatedPayment);

  return newTd;
};

const createButtonShowAssignments = (container) => {
  const newTd = createTDtable(container);
  const btnShowAssignments = document.createElement('button');
  btnShowAssignments.className = 'table__btn-show-assignments';
  btnShowAssignments.textContent = 'Show Assignments (0) 0.0/0.0';
  newTd.append(btnShowAssignments);

  return btnShowAssignments;
};

const createProjectedIncome = (container) => {
  const valueProjectedIncome = 'sum of all assignment profits';
  const newTd = createTDtable(container, valueProjectedIncome);

  return newTd;
};

const createButtonsActions = (container) => {
  const newTd = document.createElement('td');
  newTd.className = 'table__value table-btns';
  container.append(newTd);

  const btnAvailability = document.createElement('button');
  btnAvailability.className = 'table__btn-availability';
  btnAvailability.textContent = 'Availability';
  newTd.append(btnAvailability);

  const btnAssign = document.createElement('button');
  btnAssign.className = 'table__btn-assign';
  btnAssign.textContent = 'Assign';
  newTd.append(btnAssign);

  const btnDelete = document.createElement('button');
  btnDelete.className = 'table__btn-delete';
  btnDelete.textContent = 'Delete';
  newTd.append(btnDelete);

  return [btnAvailability, btnAssign, btnDelete];
};
