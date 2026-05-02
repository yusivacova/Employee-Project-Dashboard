import { MONTHLY_DATA, defineDateKey } from './dataApp';
import { getNameMonth } from './tableSeedData.js';

export const getDayVacationEmployee = (clickBtn) => {
  const parent = clickBtn.closest('.table__item');
  const indexEmployee = parent.getAttribute('data-index');

  createCalendar(parent, indexEmployee);
  closeTableVacationEmployee();
  addSelectedVacationDaysIsWereChosen(indexEmployee);
  createDatesVacationForTitle();
};

const createHtmlElement = (tag, className, parent, value) => {
  const newTag = document.createElement(tag);
  newTag.className = className;
  parent.append(newTag);

  if (value) newTag.textContent = value;

  return newTag;
};

const createCalendar = (employeeHtml, indexEmployee) => {
  const calendar = document.querySelector('.calendar');
  calendar.classList.remove('inactive-class');
  const calendarBody = createHtmlElement('div', 'calendar__body', calendar);
  const nameEmployee = employeeHtml.children[0].textContent;
  const surnameEmployee = employeeHtml.children[1].textContent;

  const crossCalendar = createHtmlElement('div', 'calendar__cross', calendarBody);
  createHtmlElement('span', 'calendar__cross-item', crossCalendar);
  createHtmlElement('span', 'calendar__cross-item', crossCalendar);

  createHtmlElement('p', 'calendar__title', calendarBody, `${nameEmployee} ${surnameEmployee} - Availability`);

  const monthNum = document.querySelector('.list-month').value;
  const month = getNameMonth(monthNum);
  const year = document.querySelector('.list-year').value;
  createHtmlElement('p', 'calendar__subtitle', calendarBody, `${month} ${year}`);

  const workday = createCalendarContainer(calendarBody, monthNum, year);
  createWorkDaysEmployee(calendarBody, workday, indexEmployee);
  currentSelectedVactionDays(calendarBody, indexEmployee);

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
    dayOfWeek -= 1;
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

const createWorkDaysEmployee = (container, workday, indexEmployee) => {
  let countWorkDay = workday;
  const tagCountWorkDay = createHtmlElement('p', 'calendar__count-workday', container);
  createHtmlElement('span', 'calendar__text-count-workday', tagCountWorkDay, 'Working Days:');
  const calendarWorkdayValue = createHtmlElement('span', 'calendar__count-workday-value', tagCountWorkDay, `${workday} / ${workday}`);

  const calendar = document.querySelector('.calendar__body');

  calendar.addEventListener('click', (e) => {
    const clickTag = e.target;
    const keyObjData = defineDateKey();
    const dayVacation = clickTag.textContent;
    const datesSelectedVacationArr = [];

    if (clickTag.classList.contains('calendar__day-num') && clickTag.classList.contains('day-num-selected')) {
      const indexDay = datesSelectedVacationArr.indexOf(dayVacation);
      datesSelectedVacationArr.splice(indexDay, 1);
      clickTag.classList.remove('day-num-selected');
      countWorkDay += 1;
    } else if (clickTag.classList.contains('calendar__day-num') && !clickTag.classList.contains('day-num-selected')) {
      clickTag.classList.add('day-num-selected');
      datesSelectedVacationArr.push(dayVacation);
      countWorkDay -= 1;
    }

    createDatesVacationForTitle();

    calendarWorkdayValue.textContent = `${countWorkDay} / ${workday}`;

    sendDataObdVacationsEmployee(indexEmployee);
  });
};

const currentSelectedVactionDays = (container) => {
  const tagCurrentSelectedVacationDays = createHtmlElement('div', 'calendar__current-vacation', container);
  createHtmlElement('p', 'calendar__title-vacation', tagCurrentSelectedVacationDays, 'Vacation Days:');
  createHtmlElement('span', 'calendar__dates-vacation', tagCurrentSelectedVacationDays);
  createHtmlElement('button', 'calendar__set-vacation-btn', tagCurrentSelectedVacationDays, 'Set vacation');
};

const createDatesVacationForTitle = () => {
  const keyObjData = defineDateKey();
  const datesVacation = document.querySelector('.calendar__dates-vacation');
  datesVacation.textContent = [];
  const arrKeyObjData = keyObjData.split('-');
  const monthNum = +arrKeyObjData[1] + 1;
  let monthStr = String(monthNum);
  if (monthStr.length !== 2) monthStr = `0${monthStr}`;

  const arrDaysVacationElements = [...document.querySelectorAll('.day-num-selected')];
  const arrDays = arrDaysVacationElements.reduce((acc, item) => {
    acc.push(item.textContent);
    return acc;
  }, []);

  arrDays.forEach((dayVacation, index) => {
    const dayVacationWithMonth = (dayVacation.length === 2) ? `${dayVacation}.${monthStr}` : `0${dayVacation}.${monthStr}`;
    if (index === 0) datesVacation.textContent += `${dayVacationWithMonth}`;
    if (index >= 1) {
      datesVacation.textContent += `, ${dayVacationWithMonth}`;
    }
  });
};

const sendDataObdVacationsEmployee = (indexEmployee) => {
  const btrSetVacation = document.querySelector('.calendar__set-vacation-btn');

  btrSetVacation.addEventListener('click', (e) => {
    const keyObjData = defineDateKey();
    const clickTag = e.target;
    MONTHLY_DATA[keyObjData].employees[indexEmployee].vacation = [];

    const datesSelectedVacation = document.querySelectorAll('.day-num-selected');

    datesSelectedVacation.forEach((item) => {
      MONTHLY_DATA[keyObjData].employees[indexEmployee].vacation.push(item.textContent);
    });

   // const calendar = document.querySelector('.calendar');
   // calendar.classList.add('inactive-class');
   // calendar.innerHTML = '';
  });
};

const closeTableVacationEmployee = () => {
  const calendar = document.querySelector('.calendar');

  calendar.addEventListener('click', (e) => {
    const clickTag = e.target;
    if (clickTag.className.includes('calendar__cross') || clickTag.className.includes('calendar__set-vacation-btn')) {
      calendar.classList.add('inactive-class');
      calendar.innerHTML = '';
    }
  });
};

const addSelectedVacationDaysIsWereChosen = (indexEmployee) => {
  const keyObjData = defineDateKey();
  const allDaysMonth = document.querySelectorAll('.calendar__day-num');

  if (MONTHLY_DATA[keyObjData].employees[indexEmployee].vacation.length) {
    allDaysMonth.forEach((item) => {
      if (MONTHLY_DATA[keyObjData].employees[indexEmployee].vacation.includes(item.textContent)) {
        item.classList.add('day-num-selected');
      }
    });
  }
};
