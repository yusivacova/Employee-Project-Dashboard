import '@babel/polyfill';
import './index.html';
import './styles/index.scss';

import { setMenu } from './script/menu';
import { setMode } from './script/mode';
import { addProject } from './script/addProject';
import { setSeedData } from './script/seedData';
import { addEmployees } from './script/addEmployees';
import { setLocalStorage, getLocalStorageForUpdateTabels } from './script/localStorage';
import { monitorValueСhangeMonthrApp, monitorValueСhangeYearApp } from './script/monitorValueСhangeData';

window.onload = function () {
  setMenu();
  setMode();
  addProject();
  addEmployees();
  setSeedData();
  monitorValueСhangeMonthrApp();
  monitorValueСhangeYearApp();
};

window.addEventListener('load', getLocalStorageForUpdateTabels);
window.addEventListener('beforeunload', setLocalStorage);
