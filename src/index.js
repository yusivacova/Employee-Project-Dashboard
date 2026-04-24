import '@babel/polyfill';
import './index.html';
import './styles/index.scss';

import { setMenu } from './script/menu';
import { setMode } from './script/mode';
import { addProject } from './script/addProject';
import { setSeedData } from './script/seedData';
import { addEmployees } from './script/addEmployees';

window.onload = function () {
  setMenu();
  setMode();
  addProject();
  setSeedData();
  addEmployees();
};
