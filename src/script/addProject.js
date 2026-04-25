import { addRequirementForForm } from './requirementForms';

export function addProject() {
  openFormAddProject();
  closeFormAddProject();
  addRequirementForFormProjectName();
  addRequirementForFormProjectCompany();
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
