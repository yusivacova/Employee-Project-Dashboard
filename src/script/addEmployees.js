export function addEmployees() {
  openFormAddEmployees();
  closeFormAddEmployees();
}

const openFormAddEmployees = () => {
  const btnAddEmployee = document.querySelector('.btn-add-employee');
  const formAddEmployees = document.querySelector('.form-employees');

  btnAddEmployee.addEventListener('click', () => {
    formAddEmployees.classList.add('form-open');
  });
};

const closeFormAddEmployees = () => {
  const formAddEmployees = document.querySelector('.form-employees');

  formAddEmployees.addEventListener('click', (e) => {
    const clickTag = e.target;
    if (clickTag.className.includes('form-btn-cancel')) {
      formAddEmployees.classList.remove('form-open');
    }
  });
};
