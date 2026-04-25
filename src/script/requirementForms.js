export const addRequirementForForm = (form, countChar) => {
  form.addEventListener('input', (e) => {
    const valueInput = e.target.value;
    const counter = valueInput.length;
    const notificationElement = document.querySelector('.form-notification');

    let charCounter = 0;
    const arrValueInput = valueInput.split('');

    arrValueInput.forEach((char) => {
      const isLetterOrDigit = /[a-zа-яё0-9]/i.test(char);
      if (isLetterOrDigit) charCounter += 1;
    });

    if (counter < countChar && !notificationElement) {
      incorrectInput(form, `Project name must be at least ${countChar} characters`);
    }

    if (charCounter >= countChar && notificationElement) removeNotification(form);
  });
};

const incorrectInput = (input, notification) => {
  input.classList.add('incorrect-input');
  const elementNotification = createNotification(notification);
  input.after(elementNotification);
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
