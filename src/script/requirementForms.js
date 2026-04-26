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

    checkCorrectDataInInput();
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

    if (arrValue[1] && arrValue[1].length > 3) {
      const valueInputNum = Number(valueInput);
      form.value = valueInputNum.toFixed(2);
    }

    if (!valueInput || valueInput[0] === '0') {
      if (!notificationElement) incorrectInput(form, 'You must enter the budget amount');
    }

    if (valueInput && notificationElement) {
      removeNotification(form);
      correctInput(form);
    }

    checkCorrectDataInInput();
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

    if (valueInput && notificationElement) {
      removeNotification(form);
      correctInput(form);
    }

    checkCorrectDataInInput();
  });
};

const checkCorrectDataInInput = () => {
  const allInputInForms = document.querySelectorAll('.form-projects .form__item');
  const countAllInputInForms = allInputInForms.length;

  const allCorrectInput = document.querySelectorAll('.form-projects .correct-input');
  const countAllCorrectInput = allCorrectInput.length;

  const btnAddForm = document.querySelector('.form-btn-add');
  const hasDisabledBtn = btnAddForm.hasAttribute('disabled');

  if (countAllInputInForms === countAllCorrectInput && hasDisabledBtn) {
    btnAddForm.removeAttribute('disabled');
  }

  if (countAllInputInForms !== countAllCorrectInput && !hasDisabledBtn) {
    btnAddForm.setAttribute('disabled', '');
  }
};
