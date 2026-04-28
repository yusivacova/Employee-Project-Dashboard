export function createTableProjects(newProject) {
  const bodyTable = document.querySelector('.table-projects .table__body');
  const trProject = createTrProject(newProject);
  bodyTable.append(trProject);
}

const createTrProject = (project) => {
  const newTr = document.createElement('tr');
  newTr.className = 'table__item';
  console.log('project', project);

  createTDtable(newTr, project['Company Name']);
  createTDtable(newTr, project['Project Name']);
  createTDtable(newTr, `$${project.Budget}`);
  createTDtable(newTr, `0.0/${project['Employee Capacity']}`);
  createButtonShowEmployees(newTr);

  //Project income = total revenue - total cost
  createTDtable(newTr, '=total revenue - total cost');


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

const createButtonShowEmployees = (container) => {
  const newTd = createTDtable(container);
  const btnShowEmployees = document.createElement('button');
  btnShowEmployees.className = 'table__btn-show-employees';
  btnShowEmployees.textContent = 'Show Employees (0)';
  newTd.append(btnShowEmployees);

  return btnShowEmployees;
};
