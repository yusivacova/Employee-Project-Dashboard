import { MONTHLY_DATA, defineDateKey } from './dataApp';
import { getNameMonth } from './tableSeedData.js';

export const getDayVacationEmployee = (clickBtn) => {
  const parent = clickBtn.closest('.table__item');
  const indexEmployee = parent.getAttribute('data-index');
  const keyObjData = defineDateKey();

  createCalendar(parent);

  console.log('clickBtn', parent);
};

const createHtmlElement = (tag, className, parent, value) => {
  const newTag = document.createElement(tag);
  newTag.className = className;
  parent.append(newTag);

  if (value) newTag.textContent = value;

  return newTag;
};

const createCalendar = (employeeHtml) => {
  const container = document.querySelector('.main-content__body');
  const calendar = createHtmlElement('div', 'calendar', container);
  const calendarBody = createHtmlElement('div', 'calendar__body', calendar);

  const nameEmployee = employeeHtml.children[0].textContent;
  const surnameEmployee = employeeHtml.children[1].textContent;

  console.log('employeeHtml', employeeHtml);
  const crossCalendar = createHtmlElement('div', 'calendar__cross', calendarBody);
  createHtmlElement('span', 'calendar__cross-item', crossCalendar);
  createHtmlElement('span', 'calendar__cross-item', crossCalendar);

  createHtmlElement('p', 'calendar__title', calendarBody, `${nameEmployee} ${surnameEmployee} - Availability`);

  const monthNum = document.querySelector('.list-month').value;
  const month = getNameMonth(monthNum);
  const year = document.querySelector('.list-year').value;
  createHtmlElement('p', 'calendar__subtitle', calendarBody, `${month} ${year}`);

  const workday = createCalendarContainer(calendarBody, monthNum, year);



  createWorkDaysEmployee(workday);

  return calendar;
};

const createCalendarContainer = (calendarBody, month, year) => {
  const dayWeeks = createHtmlElement('div', 'calendar__day-weeks', calendarBody);
  const dayNums = createHtmlElement('div', 'calendar__day-nums', calendarBody);
  let workday = 0;

  const arrDayWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  arrDayWeek.forEach((itemName) => {
    createHtmlElement('span', 'calendar__day-week', dayWeeks, itemName);
  });

  const firstDayIndex = new Date(year, month, 1).getDay();
  const startDay = (firstDayIndex === 0) ? 6 : firstDayIndex - 1;

  for (let i = 0; i < startDay; i++) {
    const div = document.createElement('div');
    dayNums.appendChild(div);
  }

  const lastDay = new Date(year, +month + 1, 0).getDate();
  for (let i = 1; i <= lastDay; i++) {
    const dayNum = document.createElement('span');
    dayNum.textContent = i;
    dayNum.className = 'calendar__day-num';

    let dayOfWeek = new Date(year, month, i).getDay();
    dayOfWeek = dayOfWeek - 1;
    if (dayOfWeek < 0) dayOfWeek = 0;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      dayNum.classList.add('weekend-day');
    } else {
      dayNum.classList.add('workday-day');
      workday += 1;
    }

    dayNums.appendChild(dayNum);
  }

  return workday;
};

const createWorkDaysEmployee = (workday) => {
  // у нас есть значение рабочих дней в месяце

}
