import {
  addRequirementForFormEmployeeName, addRequirementForFormEmployeeBirth, addRequirementForFormEmployeeSalary, addRequirementForFormEmployeePosition,
} from './requirementForms';

export function addEmployees() {
  openFormAddEmployees();
  closeFormAddEmployees();
  addRequirementForFormEmployeesName();
  addRequirementForFormEmployeesSurname();
  addRequirementForFormEmployeesBirth();
  addRequirementForFormEmployeesSalary();
  addRequirementForFormEmployeesPosition();
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
      removeFormInputAndNotification();
    }
  });
};

const removeFormInputAndNotification = () => {
  const inputForms = document.querySelectorAll('.form-employees .form__item input');
  inputForms.forEach((input) => {
    input.value = '';
    if (input.classList.contains('incorrect-input')) input.classList.remove('incorrect-input');
    if (input.classList.contains('correct-input')) input.classList.remove('correct-input');
  });

  const notificationsTags = document.querySelectorAll('.form-employees .form-notification');
  notificationsTags.forEach((notification) => {
    notification.remove();
  });
};

const addRequirementForFormEmployeesName = () => {
  const inputFormEmployeeName = document.getElementById('form__name');
  addRequirementForFormEmployeeName(inputFormEmployeeName, 3);
};

const addRequirementForFormEmployeesSurname = () => {
  const inputFormEmployeeSurname = document.getElementById('form__surname');
  addRequirementForFormEmployeeName(inputFormEmployeeSurname, 3);
};

const addRequirementForFormEmployeesBirth = () => {
  const inputFormEmployeeSurname = document.getElementById('form__birth');
  addRequirementForFormEmployeeBirth(inputFormEmployeeSurname);
};

const addRequirementForFormEmployeesPosition = () => {
  const inputFormEmployeePosition = document.getElementById('form-employees__position');
  addRequirementForFormEmployeePosition(inputFormEmployeePosition);
};

const addRequirementForFormEmployeesSalary = () => {
  const inputFormEmployeeSalary = document.getElementById('form-employees__salary');
  addRequirementForFormEmployeeSalary(inputFormEmployeeSalary);
};
