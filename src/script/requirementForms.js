export const addRequirementForForm = (form, countChar) => {
  form.addEventListener('input', (e) => {
    const valueInput = e.target.value;
    const counter = valueInput.length;
    const notificationElement = form.nextElementSibling;

    let charCounter = 0;
    const arrValueInput = valueInput.split('');

    arrValueInput.forEach((char) => {
      const isLetterOrDigit = /[a-zа-яё0-9]/i.test(char);
      if (isLetterOrDigit) charCounter += 1;
    });

    if (counter < countChar && !notificationElement) {
      incorrectInput(form, `You must enter at least ${countChar} alphanumeric characters`);
    }

    if (charCounter >= countChar && notificationElement) {
      removeNotification(form);
      correctInput(form);
    }

    checkCorrectDataInInput('.form-projects .form__item', '.form-projects .correct-input', '.form-projects .form-btn-add');
  });
};

const incorrectInput = (input, notification) => {
  input.classList.add('incorrect-input');
  if (input.classList.contains('correct-input')) input.classList.remove('correct-input');
  const elementNotification = createNotification(notification);
  input.after(elementNotification);
};

const correctInput = (input) => {
  if (input.classList.contains('incorrect-input')) input.classList.remove('incorrect-input');
  input.classList.add('correct-input');
};

const createNotification = (notification) => {
  const elementNotification = document.createElement('p');
  elementNotification.className = 'form-notification';
  elementNotification.textContent = notification;
  return elementNotification;
};

const removeNotification = (input) => {
  const notificationElement = input.nextElementSibling;
  notificationElement.remove();
};

export const addRequirementForFormBudget = (form) => {
  form.addEventListener('input', (e) => {
    const valueInput = e.target.value;
    const notificationElement = form.nextElementSibling;

    const arrValue = valueInput.split('.');

    if (arrValue[1] && arrValue[1].length > 2) {
      const valueInputNum = Number(valueInput);
      form.value = valueInputNum.toFixed(2);
    }

    if (!valueInput || valueInput[0] === '0') {
      if (!notificationElement) incorrectInput(form, 'You must enter the budget amount');
    }

    if (valueInput) {
      if (notificationElement) removeNotification(form);
      correctInput(form);
    }

    checkCorrectDataInInput('.form-projects .form__item', '.form-projects .correct-input', '.form-projects .form-btn-add');
  });
};

export const addRequirementForFormEmployeeCapacity = (form) => {
  form.addEventListener('input', (e) => {
    const valueInput = e.target.value;
    const notificationElement = form.nextElementSibling;
    const arrValue = valueInput.split('.');

    if (!valueInput || arrValue[1] || valueInput[0] === '0') {
      if (!notificationElement) incorrectInput(form, 'You must enter integer, minimum 1');
    }

    if (valueInput) {
      if (notificationElement) removeNotification(form);
      correctInput(form);
    }

    checkCorrectDataInInput('.form-projects .form__item', '.form-projects .correct-input', '.form-projects .form-btn-add');
  });
};

const checkCorrectDataInInput = (forms, inputs, btn) => {
  const allInputInForms = document.querySelectorAll(forms);
  const countAllInputInForms = allInputInForms.length;

  const allCorrectInput = document.querySelectorAll(inputs);
  const countAllCorrectInput = allCorrectInput.length;

  const btnAddForm = document.querySelector(btn);
  const hasDisabledBtn = btnAddForm.hasAttribute('disabled');

  if (countAllInputInForms === countAllCorrectInput && hasDisabledBtn) {
    btnAddForm.removeAttribute('disabled');
  }

  if (countAllInputInForms !== countAllCorrectInput && !hasDisabledBtn) {
    btnAddForm.setAttribute('disabled', '');
  }
};

export const addRequirementForFormEmployeeName = (form, countChar) => {
  form.addEventListener('input', (e) => {
    const valueInput = e.target.value;
    const counter = valueInput.length;
    const notificationElement = form.nextElementSibling;

    let charCounter = 0;
    const arrValueInput = valueInput.split('');

    arrValueInput.forEach((char, index, array) => {
      const isLetter = /^[a-zA-Zа-яА-ЯёЁ]+$/.test(char);
      if (isLetter) {
        charCounter += 1;
      } else {
        array[index] = '';
      }
      form.value = arrValueInput.join('');
    });

    if (counter < countChar && !notificationElement) {
      incorrectInput(form, `You must enter at least ${countChar} letters`);
    }

    if (charCounter >= countChar && notificationElement) {
      removeNotification(form);
      correctInput(form);
    }

    checkCorrectDataInInput('.form-employees .form__item', '.form-employees .correct-input', '.form-employees .form-btn-add');
  });
};

export const addRequirementForFormEmployeeBirth = (form) => {
  form.addEventListener('input', (e) => {
    const enteredDateBirth = e.target.value;

    const today = new Date().toISOString().slice(0, 10);
    const arrToday = today.split('-');
    arrToday[0] -= 18;
    const date18 = arrToday.join('-');

    const notificationElement = form.nextElementSibling;

    if (date18 < enteredDateBirth && !notificationElement) {
      incorrectInput(form, 'The employee must be over 18 years old');
    }

    if (date18 >= enteredDateBirth) {
      if (notificationElement) removeNotification(form);
      correctInput(form);
    }

    checkCorrectDataInInput('.form-employees .form__item', '.form-employees .correct-input', '.form-employees .form-btn-add');
  });
};

export const addRequirementForFormEmployeePosition = (form) => {
  form.addEventListener('input', () => {
    correctInput(form);
    checkCorrectDataInInput('.form-employees .form__item', '.form-employees .correct-input', '.form-employees .form-btn-add');
  });
};

export const addRequirementForFormEmployeeSalary = (form) => {
  form.addEventListener('input', (e) => {
    const valueInput = e.target.value;
    const notificationElement = form.nextElementSibling;

    const arrValue = valueInput.split('.');

    if (arrValue[1] && arrValue[1].length > 2) {
      const valueInputNum = Number(valueInput);
      form.value = valueInputNum.toFixed(2);
    }

    if (!valueInput || valueInput[0] === '0') {
      if (!notificationElement) incorrectInput(form, "You must enter the Employee's salary");
    }

    if (valueInput) {
      if (notificationElement) removeNotification(form);
      correctInput(form);
    }

    checkCorrectDataInInput('.form-employees .form__item', '.form-employees .correct-input', '.form-employees .form-btn-add');
  });
};
