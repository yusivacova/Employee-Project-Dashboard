import { addRequirementForForm, addRequirementForFormBudget, addRequirementForFormEmployeeCapacity } from './requirementForms';
import { MONTHLY_DATA } from './dataApp';
import { createTableProjects } from './tableProject';

export function addProject() {
  openFormAddProject();
  closeFormAddProject();
  addRequirementForFormProjectName();
  addRequirementForFormProjectCompany();
  addRequirementForFormProjectBudget();
  addRequirementForFormProjectEmployeeCapacity();
  sendDataFromInServerProject();
}

const openFormAddProject = () => {
  const btnAddProject = document.querySelector('.btn-add-project');
  const formAddProject = document.querySelector('.form-projects');

  btnAddProject.addEventListener('click', () => {
    formAddProject.classList.add('form-open');
  });
};

const closeFormAddProject = () => {
  const formProjects = document.querySelector('.form-projects');

  formProjects.addEventListener('click', (e) => {
    const clickTag = e.target;
    if (clickTag.className.includes('form-btn-cancel')) {
      formProjects.classList.remove('form-open');
      removeFormInputAndNotification();
    }
  });
};

const addRequirementForFormProjectName = () => {
  const inputFormProjectsName = document.getElementById('form-projects__name');
  addRequirementForForm(inputFormProjectsName, 3);
};

const addRequirementForFormProjectCompany = () => {
  const inputFormProjectsCompany = document.getElementById('form-projects__company');
  addRequirementForForm(inputFormProjectsCompany, 2);
};

const addRequirementForFormProjectBudget = () => {
  const inputFormProjectsBudget = document.getElementById('form-projects__budget');
  addRequirementForFormBudget(inputFormProjectsBudget);
};

const addRequirementForFormProjectEmployeeCapacity = () => {
  const inputFormProjectsEmployeeCapacity = document.getElementById('form-projects__employee');
  addRequirementForFormEmployeeCapacity(inputFormProjectsEmployeeCapacity);
};

const removeFormInputAndNotification = () => {
  const inputForms = document.querySelectorAll('.form-projects .form__item input');
  inputForms.forEach((input) => {
    input.value = '';
    if (input.classList.contains('incorrect-input')) input.classList.remove('incorrect-input');
    if (input.classList.contains('correct-input')) input.classList.remove('correct-input');
  });

  const notificationsTags = document.querySelectorAll('.form-projects .form-notification');
  notificationsTags.forEach((notification) => {
    notification.remove();
  });
};

const sendDataFromInServerProject = () => {
  const formProjects = document.querySelector('.form-projects');

  formProjects.addEventListener('submit', (event) => {
    event.preventDefault();

    const allItemsForm = document.querySelectorAll('.form-projects .form__item');

    const newProject = {};
    allItemsForm.forEach((item) => {
      newProject[item.firstElementChild.textContent.slice(0, -1)] = item.lastElementChild.value;
    });

    const indexNewProject = updateMonthlyDataObjectProject(newProject, formProjects);

    createTableProjects(newProject, indexNewProject);
  });
};

const updateMonthlyDataObjectProject = (newProject, form) => {
  const periodMonth = document.querySelector('.list-month').value;
  const periodYear = document.querySelector('.list-year').value;
  const keyObjData = `${periodYear}-${periodMonth}`;

  if (MONTHLY_DATA[keyObjData]) {
    MONTHLY_DATA[keyObjData].projects.push(newProject);
  }

  if (!MONTHLY_DATA[keyObjData]) {
    MONTHLY_DATA[keyObjData] = { employees: [], projects: [], total: '$0.00' };
    MONTHLY_DATA[keyObjData].projects.push(newProject);
  }

  console.log('MONTHLY_DATA[keyObjData]', MONTHLY_DATA[keyObjData])

  const index = MONTHLY_DATA[keyObjData].projects.length - 1;

  form.classList.remove('form-open');
  removeFormInputAndNotification();

  return index;
};
