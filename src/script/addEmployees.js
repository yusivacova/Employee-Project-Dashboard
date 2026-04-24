export function addEmployees() {
  openFormAddEmployees();
  closeFormAddEmployees();
}

const openFormAddEmployees = () => {
  const btnAddEmployee = document.querySelector('.btn-add-employee');
  const formAddEmployees = document.querySelector('.form-employees');

  btnAddEmployee.addEventListener('click', () => {
    formAddEmployees.classList.remove('inactive-class');
  });
};

const closeFormAddEmployees = () => {
  const formAddEmployees = document.querySelector('.form-employees');

  formAddEmployees.addEventListener('click', (e) => {
    const clickTag = e.target;
    if (clickTag.className === 'main-content__form form-employees' || clickTag.className.includes('form-btn-cancel')) {
      formAddEmployees.classList.add('inactive-class');
    }
  });
};
