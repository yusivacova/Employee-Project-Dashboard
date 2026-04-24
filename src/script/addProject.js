export function addProject() {
  openFormAddProject();
  closeFormAddProject();
}

const openFormAddProject = () => {
  const btnAddProject = document.querySelector('.btn-add-project');
  const formAddProject = document.querySelector('.form-projects');

  btnAddProject.addEventListener('click', () => {
    formAddProject.classList.remove('inactive-class');
  });
};

const closeFormAddProject = () => {
  const formProjects = document.querySelector('.form-projects');

  formProjects.addEventListener('click', (e) => {
    const clickTag = e.target;
    if (clickTag.className === 'main-content__form form-projects' || clickTag.className.includes('form-btn-cancel')) {
      formProjects.classList.add('inactive-class');
    }
  });
};
