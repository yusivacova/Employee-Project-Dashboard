import { addRequirementForForm } from './requirementForms';
import { addRequirementForFormBudget } from './requirementForms';
import { addRequirementForFormEmployeeCapacity } from './requirementForms';

export function addProject() {
  openFormAddProject();
  closeFormAddProject();
  addRequirementForFormProjectName();
  addRequirementForFormProjectCompany();
  addRequirementForFormProjectBudget();
  addRequirementForFormProjectEmployeeCapacity();
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
  inputForms.forEach(input => {
    input.value = '';
    if (input.classList.contains('incorrect-input')) input.classList.remove('incorrect-input');
    if (input.classList.contains('correct-input')) input.classList.remove('correct-input');
  });

  const notificationsTags = document.querySelectorAll('.form-projects .form-notification');
  notificationsTags.forEach(notification => {
    notification.remove();
  });
};
