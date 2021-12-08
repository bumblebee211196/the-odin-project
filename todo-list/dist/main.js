/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/modules/project.js":
/*!********************************!*\
  !*** ./src/modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/modules/task.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");




class Project {
  constructor(name) {
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.name = name;
  }
}

class ProjectList {
  static projectListElement = document.querySelector('.items.project');

  static addProject(project) {
    const todo = _todo__WEBPACK_IMPORTED_MODULE_1__["default"].getTodo();
    todo[project.id] = { 'project': project, 'tasks': {} };
    _todo__WEBPACK_IMPORTED_MODULE_1__["default"].updateTodo(todo);
  }

  static removeProject(projectId) {
    const todo = _todo__WEBPACK_IMPORTED_MODULE_1__["default"].getTodo();
    delete todo[projectId];
    _todo__WEBPACK_IMPORTED_MODULE_1__["default"].updateTodo(todo);
  }

  static updateProject(projectId, name) {
    const todo = _todo__WEBPACK_IMPORTED_MODULE_1__["default"].getTodo();
    todo[projectId]['project']['name'] = name;
    _todo__WEBPACK_IMPORTED_MODULE_1__["default"].updateTodo(todo);
  }

  static getProject(projectId) {
    const todo = _todo__WEBPACK_IMPORTED_MODULE_1__["default"].getTodo();
    return todo[projectId]['project'];
  }

  static getItemCard(project) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('item', 'project');
    cardElement.dataset.key = project.id;

    const name = document.createElement('p');
    name.textContent = project.name;

    const options = document.createElement('div');
    
    options.classList.add('item', 'options');
    const editButton = document.createElement('button');
    editButton.classList.add('edit-project');
    const editButtonImage = document.createElement('img');
    editButtonImage.src = './images/edit-icon.png';
    editButton.appendChild(editButtonImage);
    editButton.addEventListener('click', (e) => {
      event.stopPropagation();
      const parentDiv = e.target.parentElement.parentElement.parentElement;
      if (parentDiv.nextSibling && parentDiv.nextSibling.id === 'project-popup') { return; }
      const projectId = parentDiv.dataset.key;
      this.openUpdatePopupForm(projectId, parentDiv);
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-project');
    const deleteButtonImage = document.createElement('img');
    deleteButtonImage.src = './images/delete-icon.png';
    deleteButton.appendChild(deleteButtonImage);
    deleteButton.addEventListener('click', (e) => {
      event.stopPropagation();
      const projectId = e.target.parentElement.parentElement.parentElement.dataset.key;
      this.removeProject(projectId);
      this.updateItemList();
    });

    options.appendChild(editButton);
    options.appendChild(deleteButton);
    
    cardElement.appendChild(name);
    cardElement.appendChild(options);

    cardElement.addEventListener('click', (e) => {
      document.querySelectorAll('.item.project').forEach((item) => {
        if (item != e.target) {
          if (item.classList.contains('clicked')) {
            item.classList.remove('clicked');
          }
        }
      })
      if (e.target.classList.contains('clicked')) {
        _todo__WEBPACK_IMPORTED_MODULE_1__["default"].setProjectId('');
        e.target.classList.remove('clicked');
      } else {
        _todo__WEBPACK_IMPORTED_MODULE_1__["default"].setProjectId(e.target.dataset.key);
        e.target.classList.add('clicked');
      }
      // console.log(TodoDS.getProjectId());
      _task__WEBPACK_IMPORTED_MODULE_0__["default"].updateItemList(_todo__WEBPACK_IMPORTED_MODULE_1__["default"].getProjectId());
    });

    return cardElement;
  }

  static openPopupForm() {
    const formElement = document.createElement('div');
    formElement.id = 'project-popup';
    formElement.classList.add('item', 'project');
    
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'project-name';
    inputElement.placeholder = 'Project Name';
    inputElement.addEventListener('keyup', (e) => {
      if (e.keyCode !== 13) { return; }
      const name = document.getElementById('project-name').value;
      if (!name) { return }
      const project = new Project(name);
      this.addProject(project);
      this.addToItemList(project, true);
      this.closePopupForm();
    });

    const buttonGroup = document.createElement('div');
    buttonGroup.id = 'button-group';

    const submitButton = document.createElement('button');
    submitButton.id = 'submit-project-popup';
    submitButton.classList.add('btn', 'add');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', () => {
      const name = document.getElementById('project-name').value;
      if (!name) { return }
      const project = new Project(name);
      this.addProject(project);
      this.addToItemList(project, true);
      this.closePopupForm();
    });

    const closeButton = document.createElement('button');
    closeButton.id = 'close-project-popup';
    closeButton.classList.add('btn', 'close');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      this.closePopupForm();
    });
    
    buttonGroup.appendChild(submitButton);
    buttonGroup.appendChild(closeButton)

    formElement.appendChild(inputElement);
    formElement.appendChild(buttonGroup);

    if (this.projectListElement.firstChild && this.projectListElement.firstChild.id === 'project-popup') { return }
    this.projectListElement.insertBefore(formElement, this.projectListElement.firstChild);
  }

  static closePopupForm() {
    if (this.projectListElement.firstChild == null || this.projectListElement.firstChild.id != 'project-popup') return
    this.projectListElement.removeChild(this.projectListElement.firstChild)
  }

  static openUpdatePopupForm(projectId, projectElement) {
    const project = this.getProject(projectId);
    const formElement = document.createElement('div');
    formElement.id = 'project-popup';
    formElement.classList.add('item', 'project');
    
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'project-name';
    inputElement.placeholder = 'Project Name';
    inputElement.value = project.name;
    inputElement.addEventListener('keyup', (e) => {
      if (e.keyCode !== 13) { return; }
      const name = document.getElementById('project-name').value;
      if (!name) { return }
      this.updateProject(projectId, name);
      this.updateItemList();
    });

    const buttonGroup = document.createElement('div');
    buttonGroup.id = 'button-group';

    const submitButton = document.createElement('button');
    submitButton.id = 'submit-project-popup';
    submitButton.classList.add('btn', 'add');
    submitButton.textContent = 'Update';
    submitButton.addEventListener('click', (e) => {
      const name = document.getElementById('project-name').value;
      if (!name) { return }
      this.updateProject(projectId, name);
      this.updateItemList();
    });

    const closeButton = document.createElement('button');
    closeButton.id = 'close-project-popup';
    closeButton.classList.add('btn', 'close');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', (e) => {
      this.closeUpdatePopupForm(e.target.parentElement.parentElement);
    });
    
    buttonGroup.appendChild(submitButton);
    buttonGroup.appendChild(closeButton)

    formElement.appendChild(inputElement);
    formElement.appendChild(buttonGroup);

    this.projectListElement.insertBefore(formElement, projectElement.nextSibling);
  }

  static closeUpdatePopupForm(popupElement) {
    this.projectListElement.removeChild(popupElement);
  }

  static addToItemList(project, focus=false) {
    const cardElement = this.getItemCard(project);
    if (focus) { cardElement.click(); }
    this.projectListElement.appendChild(this.getItemCard(project));
  }

  static updateItemList() {
    this.projectListElement.textContent = '';
    const todo = _todo__WEBPACK_IMPORTED_MODULE_1__["default"].getTodo()
    for (let projectId of Object.keys(todo)) {
      const project = todo[projectId]['project'];
      this.addToItemList(project);
    }
  }
}


/***/ }),

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TaskList)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");



class Task {
  constructor(name, description, priority) {
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_1__["default"])();
    this.name = name;
    this.description = description;
    this.priority = priority;
  }
}

class TaskList {
  static taskListElement = document.querySelector('.items.task');

  static addTask(projectId, task) {
    const todo = _todo__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo();
    todo[projectId]['tasks'][task.id] = task;
    _todo__WEBPACK_IMPORTED_MODULE_0__["default"].updateTodo(todo);
  }

  static removeTask(projectId, task) {
    const todo = _todo__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo();
    delete todo[projectId]['tasks'][task.id];
    _todo__WEBPACK_IMPORTED_MODULE_0__["default"].updateTodo(todo);
  }

  static updateTask(projectId, taskId, name, description, priority) {
    const todo = _todo__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo();
    todo[projectId]['tasks'][taskId]['name'] = name;
    todo[projectId]['tasks'][taskId]['description'] = description;
    todo[projectId]['tasks'][taskId]['priority'] = priority;
    _todo__WEBPACK_IMPORTED_MODULE_0__["default"].updateTodo(todo);
  }

  static getTask(projectId, taskId) {
    const todo = _todo__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo();
    return todo[projectId]['tasks'][taskId];
  }

  static getItemCard(task) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('item', 'task');
    cardElement.dataset.key = task.id;
    cardElement.style.backgroundColor = `var(--priority-${task.priority})`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const content = document.createElement('div');
    content.classList.add('item', 'content');
    const title = document.createElement('p');
    title.textContent = task.name;
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = task.description;
    content.appendChild(title);
    content.appendChild(description);

    const options = document.createElement('div');
    options.classList.add('item', 'options');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-task');
    editButton.style.backgroundColor = `var(--priority-${task.priority})`;
    const editButtonImage = document.createElement('img');
    editButtonImage.src = './images/edit-icon.png';
    editButton.appendChild(editButtonImage);
    editButton.addEventListener('click', (e) => {
      event.stopPropagation();
      const parentDiv = e.target.parentElement.parentElement.parentElement;
      if (parentDiv.nextSibling && parentDiv.nextSibling.id === 'task-popup') { return; }
      const taskId = parentDiv.dataset.key;
      this.openUpdatePopupForm(projectId, taskId, parentDiv)
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    deleteButton.style.backgroundColor = `var(--priority-${task.priority})`;
    const deleteButtonImage = document.createElement('img');
    deleteButtonImage.src = './images/delete-icon.png';
    deleteButton.appendChild(deleteButtonImage);
    deleteButton.addEventListener('click', (e) => {
      event.stopPropagation();
      const parentDiv = e.target.parentElement.parentElement.parentElement;
      const taskId = parentDiv.dataset.key;
      this.removeTask(projectId, taskId)
      this.updateItemList();
    });

    options.appendChild(editButton);
    options.appendChild(deleteButton);

    cardElement.appendChild(checkbox);
    cardElement.appendChild(content);
    cardElement.appendChild(options);

    return cardElement;
  }

  static openPopupForm() {
    const formElement = document.createElement('div');
    formElement.id = 'task-popup';
    formElement.classList.add('item', 'task');

    const inputGroup = document.createElement('div');
    inputGroup.id = 'input-group';
    
    const inputElementName = document.createElement('input');
    inputElementName.type = 'text';
    inputElementName.id = 'task-name';
    inputElementName.placeholder = 'Task Name';
    inputElementName.focus();

    const inputElementDescription = document.createElement('input');
    inputElementDescription.type = 'text';
    inputElementDescription.id = 'task-description';
    inputElementDescription.placeholder = 'Task Description';

    const inputElementPriority = document.createElement('select');
    inputElementPriority.id = 'task-priority';
    const priorityHigh = document.createElement('option');
    priorityHigh.value = 'high';
    priorityHigh.textContent = 'High';
    const priorityMedium = document.createElement('option');
    priorityMedium.value = 'medium';
    priorityMedium.textContent = 'Medium';
    const priorityLow = document.createElement('option');
    priorityLow.value = 'low';
    priorityLow.textContent = 'Low';
    inputElementPriority.appendChild(priorityHigh);
    inputElementPriority.appendChild(priorityMedium);
    inputElementPriority.appendChild(priorityLow);

    inputGroup.appendChild(inputElementName);
    inputGroup.appendChild(inputElementDescription);
    inputGroup.appendChild(inputElementPriority);

    const buttonGroup = document.createElement('div');
    buttonGroup.id = 'button-group';

    const submitButton = document.createElement('button');
    submitButton.id = 'submit-task-popup';
    submitButton.classList.add('btn', 'add');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', () => {
      const name = document.getElementById('task-name').value;
      const description = document.getElementById('task-description').value;
      const priority = document.getElementById('task-priority').value;
      if (!name || !description) { return; }
      const task = new Task(name, description, priority);
      this.addTask(_todo__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectId(), task)
      this.addToItemList(task);
      this.closePopupForm();
    });

    const closeButton = document.createElement('button');
    closeButton.id = 'close-task-popup';
    closeButton.classList.add('btn', 'close');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      this.closePopupForm();
    });

    buttonGroup.appendChild(submitButton);
    buttonGroup.appendChild(closeButton);

    formElement.appendChild(inputGroup);
    formElement.appendChild(buttonGroup);
    
    if (this.taskListElement.firstChild && this.taskListElement.firstChild.id === 'task-popup') { return }
    this.taskListElement.insertBefore(formElement, this.taskListElement.firstChild);
  }

  static closePopupForm() {
    if (this.taskListElement.firstChild == null || this.taskListElement.firstChild.id != 'task-popup') return
    this.taskListElement.removeChild(this.taskListElement.firstChild);
  }

  static openUpdatePopupForm(projectId, taskId, taskElement) {
    const task = this.getTask(projectId, taskId);

    const formElement = document.createElement('div');
    formElement.id = 'task-popup';
    formElement.classList.add('item', 'task');

    const inputGroup = document.createElement('div');
    inputGroup.id = 'input-group';
    
    const inputElementName = document.createElement('input');
    inputElementName.type = 'text';
    inputElementName.id = 'task-name';
    inputElementName.placeholder = 'Task Name';
    inputElementName.value = task.name;

    const inputElementDescription = document.createElement('input');
    inputElementDescription.type = 'text';
    inputElementDescription.id = 'task-description';
    inputElementDescription.placeholder = 'Task Description';
    inputElementDescription.value = task.description;

    const inputElementPriority = document.createElement('select');
    inputElementPriority.id = 'task-priority';
    const priorityHigh = document.createElement('option');
    priorityHigh.value = 'high';
    priorityHigh.textContent = 'High';
    const priorityMedium = document.createElement('option');
    priorityMedium.value = 'medium';
    priorityMedium.textContent = 'Medium';
    const priorityLow = document.createElement('option');
    priorityLow.value = 'low';
    priorityLow.textContent = 'Low';
    inputElementPriority.appendChild(priorityHigh);
    inputElementPriority.appendChild(priorityMedium);
    inputElementPriority.appendChild(priorityLow);

    inputGroup.appendChild(inputElementName);
    inputGroup.appendChild(inputElementDescription);
    inputGroup.appendChild(inputElementPriority)

    const buttonGroup = document.createElement('div');
    buttonGroup.id = 'button-group';

    const submitButton = document.createElement('button');
    submitButton.id = 'submit-project-popup';
    submitButton.classList.add('btn', 'add');
    submitButton.textContent = 'Update';
    submitButton.addEventListener('click', (e) => {
      const name = document.getElementById('task-name').value;
      const description = document.getElementById('task-description').value;
      const priority = document.getElementById('task-priority').value;
      if (!name || !description) { return }
      this.updateTask(projectId, taskId, name, description, priority)
      this.updateItemList();
    });

    const closeButton = document.createElement('button');
    closeButton.id = 'close-project-popup';
    closeButton.classList.add('btn', 'close');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', (e) => {
      this.closeUpdatePopupForm(e.target.parentElement.parentElement);
    });

    buttonGroup.appendChild(submitButton);
    buttonGroup.appendChild(closeButton)

    formElement.appendChild(inputGroup);
    formElement.appendChild(buttonGroup);

    this.taskListElement.insertBefore(formElement, taskElement.nextSibling);
  }

  static closeUpdatePopupForm(popupElement) {
    taskListElement.removeChild(popupElement);
  }

  static addToItemList(task) {
    this.taskListElement.appendChild(this.getItemCard(task));
  }

  static updateItemList(projectId) {
    this.taskListElement.textContent = '';
    if (projectId) {
      const todo = _todo__WEBPACK_IMPORTED_MODULE_0__["default"].getTodo();
      for (let taskId of Object.keys(todo[projectId]['tasks'])) {
        const task = todo[projectId]['tasks'][taskId];
        this.addToItemList(task);
      }
    }
  }
}


/***/ }),

/***/ "./src/modules/todo.js":
/*!*****************************!*\
  !*** ./src/modules/todo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodoDS)
/* harmony export */ });
if (window.localStorage.getItem("todo") == null) {
  window.localStorage.setItem("todo", JSON.stringify({}));
}

class TodoDS {
  static projectId = ''
  static todo = JSON.parse(window.localStorage.getItem('todo'));
  
  static getProjectId = () => {
    return this.projectId
  }
  static setProjectId = (projectId) => {
    this.projectId = projectId;
  }
  static getTodo() {
    return this.todo;
  }
  static updateTodo(todo) {
    this.todo = todo;
    window.localStorage.setItem('todo', JSON.stringify(this.todo));
  }
}


/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/modules/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/modules/task.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo */ "./src/modules/todo.js");




const openProjectPopupButton = document.getElementById('open-project-popup');
const openTaskPopupButton = document.getElementById('open-task-popup');

class UI {
  constructor() {}

  static addProject() {
    _project__WEBPACK_IMPORTED_MODULE_0__["default"].openPopupForm();
  }

  static addTask() {
    _task__WEBPACK_IMPORTED_MODULE_1__["default"].openPopupForm();
  }
  
  static update() {
    _project__WEBPACK_IMPORTED_MODULE_0__["default"].updateItemList();
    _task__WEBPACK_IMPORTED_MODULE_1__["default"].updateItemList();
  }
}

openProjectPopupButton.addEventListener('click', () => {
  UI.addProject();
});

openTaskPopupButton.addEventListener('click', () => {
  if (!_todo__WEBPACK_IMPORTED_MODULE_2__["default"].getProjectId()) {
    alert('Select a project to add a task.');
    return;
  }
  UI.addTask();
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ "./src/modules/ui.js");


// if (window.localStorage.getItem("todo") == null) {
//   window.localStorage.setItem("todo", JSON.stringify({}));
// }
// const TODO_LIST = JSON.parse(window.localStorage.getItem("todo"));
// let CURR_PROJECT_ID = '';

// function updateLocalStorage(value) {
//   window.localStorage.setItem('todo', JSON.stringify(value));
// }

// function uuid() {
//   return ([1e4]+-1e4+-4e4+-8e4+-1e4).replace(/[018]/g, c =>
//     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//   )
// }

// class Project {
//   constructor(name) {
//     this.id = uuid();
//     this.name = name;
//   }
// }

// class Task {
//   constructor(name, description, priority) {
//     this.id = uuid();
//     this.name = name;
//     this.description = description;
//     this.priority = priority;
//   }
// }

// const projectListElement = document.querySelector('.items.project');
// const taskListElement = document.querySelector('.items.task');

// const addProjectPopupButton = document.getElementById('open-project-popup');
// const addTaskPopupButton = document.getElementById('open-task-popup');

// // Open project popup form
// function openProjectPopupForm() {
//   if (projectListElement.firstChild && projectListElement.firstChild.id === 'project-popup') { return }
//   projectListElement.insertBefore(getProjectPopupForm(), projectListElement.firstChild);
// }

// // Open task popup form
// function openTaskPopupForm() {
//   if (!CURR_PROJECT_ID) { 
//     alert('Create a project first!.');
//     return;
//   }
//   if (taskListElement.firstChild && taskListElement.firstChild.id === 'task-popup') { return }
//   taskListElement.insertBefore(getTaskPopupForm(), taskListElement.firstChild);
// }

// // Get project popup form
// function getProjectPopupForm() {
//   const formElement = document.createElement('div');
//   formElement.id = 'project-popup';
//   formElement.classList.add('item', 'project');
  
//   const inputElement = document.createElement('input');
//   inputElement.type = 'text';
//   inputElement.id = 'project-name';
//   inputElement.placeholder = 'Project Name';
//   inputElement.focus();

//   const buttonGroup = document.createElement('div');
//   buttonGroup.id = 'button-group';

//   const submitButton = document.createElement('button');
//   submitButton.id = 'submit-project-popup';
//   submitButton.classList.add('btn', 'add');
//   submitButton.textContent = 'Add';
//   submitButton.addEventListener('click', () => {
//     const name = document.getElementById('project-name').value;
//     if (!name) { return }
//     const project = new Project(name);
//     TODO_LIST[project.id] = {
//       'project': project,
//       'tasks': {}
//     }
//     updateLocalStorage(TODO_LIST);
//     addProjectToProjectListElement(project);
//     closeProjectPopupForm();
//   });

//   const closeButton = document.createElement('button');
//   closeButton.id = 'close-project-popup';
//   closeButton.classList.add('btn', 'close');
//   closeButton.textContent = 'Close';
//   closeButton.addEventListener('click', () => {
//     closeProjectPopupForm();
//   });
  
//   buttonGroup.appendChild(submitButton);
//   buttonGroup.appendChild(closeButton)

//   formElement.appendChild(inputElement);
//   formElement.appendChild(buttonGroup);

//   return formElement;
// }

// // Get task popup form
// function getTaskPopupForm() {
//   const formElement = document.createElement('div');
//   formElement.id = 'task-popup';
//   formElement.classList.add('item', 'task');

//   const inputGroup = document.createElement('div');
//   inputGroup.id = 'input-group';
  
//   const inputElementName = document.createElement('input');
//   inputElementName.type = 'text';
//   inputElementName.id = 'task-name';
//   inputElementName.placeholder = 'Task Name';
//   inputElementName.focus();

//   const inputElementDescription = document.createElement('input');
//   inputElementDescription.type = 'text';
//   inputElementDescription.id = 'task-description';
//   inputElementDescription.placeholder = 'Task Description';

//   const inputElementPriority = document.createElement('select');
//   inputElementPriority.id = 'task-priority';
//   const priorityHigh = document.createElement('option');
//   priorityHigh.value = 'high';
//   priorityHigh.textContent = 'High';
//   const priorityMedium = document.createElement('option');
//   priorityMedium.value = 'medium';
//   priorityMedium.textContent = 'Medium';
//   const priorityLow = document.createElement('option');
//   priorityLow.value = 'low';
//   priorityLow.textContent = 'Low';
//   inputElementPriority.appendChild(priorityHigh);
//   inputElementPriority.appendChild(priorityMedium);
//   inputElementPriority.appendChild(priorityLow);

//   inputGroup.appendChild(inputElementName);
//   inputGroup.appendChild(inputElementDescription);
//   inputGroup.appendChild(inputElementPriority);

//   const buttonGroup = document.createElement('div');
//   buttonGroup.id = 'button-group';

//   const submitButton = document.createElement('button');
//   submitButton.id = 'submit-task-popup';
//   submitButton.classList.add('btn', 'add');
//   submitButton.textContent = 'Add';
//   submitButton.addEventListener('click', () => {
//     const name = document.getElementById('task-name').value;
//     const description = document.getElementById('task-description').value;
//     const priority = document.getElementById('task-priority').value;
//     if (!name || !description) { return; }
//     const task = new Task(name, description, priority);
//     if (!CURR_PROJECT_ID) {
//       alert('Select a project to add a task.');
//       return;
//     }
//     TODO_LIST[CURR_PROJECT_ID]['tasks'][task.id] = task
//     updateLocalStorage(TODO_LIST);
//     addTaskToTaskListElement(task);
//     closeTaskPopupForm();
//   });

//   const closeButton = document.createElement('button');
//   closeButton.id = 'close-task-popup';
//   closeButton.classList.add('btn', 'close');
//   closeButton.textContent = 'Close';
//   closeButton.addEventListener('click', () => {
//     closeTaskPopupForm();
//   });

//   buttonGroup.appendChild(submitButton);
//   buttonGroup.appendChild(closeButton);

//   formElement.appendChild(inputGroup);
//   formElement.appendChild(buttonGroup);
  
//   return formElement;
// }

// // Close project popup form
// function closeProjectPopupForm() {
//   if (projectListElement.firstChild == null || projectListElement.firstChild.id != 'project-popup') { return }
//   projectListElement.removeChild(projectListElement.firstChild)
// }

// // Close task popup form
// function closeTaskPopupForm() {
//   if (taskListElement.firstChild == null || taskListElement.firstChild.id != 'task-popup') { return }
//   taskListElement.removeChild(taskListElement.firstChild);
// }

// // Open project update popup form
// function updateProjectPopupForm(projectId, projectElement) {
//   const formElement = document.createElement('div');
//   formElement.id = 'project-popup';
//   formElement.classList.add('item', 'project');
  
//   const inputElement = document.createElement('input');
//   inputElement.type = 'text';
//   inputElement.id = 'project-name';
//   inputElement.placeholder = 'Project Name';

//   const buttonGroup = document.createElement('div');
//   buttonGroup.id = 'button-group';

//   const submitButton = document.createElement('button');
//   submitButton.id = 'submit-project-popup';
//   submitButton.classList.add('btn', 'add');
//   submitButton.textContent = 'Update';
//   submitButton.addEventListener('click', (e) => {
//     const name = document.getElementById('project-name').value;
//     if (!name) { return }
//     TODO_LIST[projectId]['project']['name'] = name;
//     updateLocalStorage(TODO_LIST);
//     updateProjectListElement();
//   });

//   const closeButton = document.createElement('button');
//   closeButton.id = 'close-project-popup';
//   closeButton.classList.add('btn', 'close');
//   closeButton.textContent = 'Close';
//   closeButton.addEventListener('click', (e) => {
//     closeUpdateProjectPopupForm(e.target.parentElement.parentElement);
//   });
  
//   buttonGroup.appendChild(submitButton);
//   buttonGroup.appendChild(closeButton)

//   formElement.appendChild(inputElement);
//   formElement.appendChild(buttonGroup);

//   projectListElement.insertBefore(formElement, projectElement.nextSibling);
// }

// // Open task update popup form
// function updateTaskPopupForm(projectId, taskId, taskElement) {
//   const task = TODO_LIST[projectId]['tasks'][taskId];

//   const formElement = document.createElement('div');
//   formElement.id = 'task-popup';
//   formElement.classList.add('item', 'task');

//   const inputGroup = document.createElement('div');
//   inputGroup.id = 'input-group';
  
//   const inputElementName = document.createElement('input');
//   inputElementName.type = 'text';
//   inputElementName.id = 'task-name';
//   inputElementName.placeholder = 'Task Name';
//   inputElementName.value = task.name;

//   const inputElementDescription = document.createElement('input');
//   inputElementDescription.type = 'text';
//   inputElementDescription.id = 'task-description';
//   inputElementDescription.placeholder = 'Task Description';
//   inputElementDescription.value = task.description;

//   const inputElementPriority = document.createElement('select');
//   inputElementPriority.id = 'task-priority';
//   const priorityHigh = document.createElement('option');
//   priorityHigh.value = 'high';
//   priorityHigh.textContent = 'High';
//   const priorityMedium = document.createElement('option');
//   priorityMedium.value = 'medium';
//   priorityMedium.textContent = 'Medium';
//   const priorityLow = document.createElement('option');
//   priorityLow.value = 'low';
//   priorityLow.textContent = 'Low';
//   inputElementPriority.appendChild(priorityHigh);
//   inputElementPriority.appendChild(priorityMedium);
//   inputElementPriority.appendChild(priorityLow);

//   inputGroup.appendChild(inputElementName);
//   inputGroup.appendChild(inputElementDescription);
//   inputGroup.appendChild(inputElementPriority)

//   const buttonGroup = document.createElement('div');
//   buttonGroup.id = 'button-group';

//   const submitButton = document.createElement('button');
//   submitButton.id = 'submit-project-popup';
//   submitButton.classList.add('btn', 'add');
//   submitButton.textContent = 'Update';
//   submitButton.addEventListener('click', (e) => {
//     const name = document.getElementById('task-name').value;
//     const description = document.getElementById('task-description').value;
//     const priority = document.getElementById('task-priority').value;
//     if (!name || !description) { return }
//     TODO_LIST[projectId]['tasks'][taskId]['name'] = name;
//     TODO_LIST[projectId]['tasks'][taskId]['description'] = description;
//     TODO_LIST[projectId]['tasks'][taskId]['priority'] = priority;
//     updateLocalStorage(TODO_LIST);
//     updateTaskListElement();
//   });

//   const closeButton = document.createElement('button');
//   closeButton.id = 'close-project-popup';
//   closeButton.classList.add('btn', 'close');
//   closeButton.textContent = 'Close';
//   closeButton.addEventListener('click', (e) => {
//     closeUpdateTaskPopupForm(e.target.parentElement.parentElement);
//   });

//   buttonGroup.appendChild(submitButton);
//   buttonGroup.appendChild(closeButton)

//   formElement.appendChild(inputGroup);
//   formElement.appendChild(buttonGroup);

//   taskListElement.insertBefore(formElement, taskElement.nextSibling);
// }

// // Close project update popup form
// function closeUpdateProjectPopupForm(popupElement) {
//   projectListElement.removeChild(popupElement);
// }

// // Close task update popup form
// function closeUpdateTaskPopupForm(popupElement) {
//   taskListElement.removeChild(popupElement);
// }

// // Get project item card
// function getProjectItemCard(project) {
//   const cardElement = document.createElement('div');
//   cardElement.classList.add('item', 'project');
//   cardElement.dataset.key = project.id;

//   const name = document.createElement('p');
//   name.textContent = project.name;

//   const options = document.createElement('div');
  
//   options.classList.add('item', 'options');
//   const editButton = document.createElement('button');
//   editButton.classList.add('edit-project');
//   const editButtonImage = document.createElement('img');
//   editButtonImage.src = './images/edit-icon.png';
//   editButton.appendChild(editButtonImage);
//   editButton.addEventListener('click', (e) => {
//     event.stopPropagation();
//     const parentDiv = e.target.parentElement.parentElement.parentElement;
//     if (parentDiv.nextSibling && parentDiv.nextSibling.id === 'project-popup') { return; }
//     const projectId = parentDiv.dataset.key;
//     updateProjectPopupForm(projectId, parentDiv);
//   });
  
//   const deleteButton = document.createElement('button');
//   deleteButton.classList.add('delete-project');
//   const deleteButtonImage = document.createElement('img');
//   deleteButtonImage.src = './images/delete-icon.png';
//   deleteButton.appendChild(deleteButtonImage);
//   deleteButton.addEventListener('click', (e) => {
//     event.stopPropagation();
//     const projectId = e.target.parentElement.parentElement.parentElement.dataset.key;
//     delete TODO_LIST[projectId];
//     updateLocalStorage(TODO_LIST);
//     updateProjectListElement();
//   });

//   options.appendChild(editButton);
//   options.appendChild(deleteButton);
  
//   cardElement.appendChild(name);
//   cardElement.appendChild(options);

//   cardElement.addEventListener('click', (e) => {
//     document.querySelectorAll('.item.project').forEach((item) => {
//       if (item != e.target) {
//         if (item.classList.contains('clicked')) {
//           item.classList.remove('clicked');
//         }
//       }
//     })
//     if (e.target.classList.contains('clicked')) {
//       CURR_PROJECT_ID = '';
//       e.target.classList.remove('clicked');
//     } else {
//       CURR_PROJECT_ID = e.target.dataset.key;
//       e.target.classList.add('clicked');
//     }
//     updateTaskListElement();
//   });

//   return cardElement;
// }

// // Get task item card
// function getTaskItemCard(task) {
//   const cardElement = document.createElement('div');
//   cardElement.classList.add('item', 'task');
//   cardElement.dataset.key = task.id;
//   cardElement.style.backgroundColor = `var(--priority-${task.priority})`;

//   const checkbox = document.createElement('input');
//   checkbox.type = 'checkbox';
  
//   const content = document.createElement('div');
//   content.classList.add('item', 'content');
//   const title = document.createElement('p');
//   title.textContent = task.name;
//   const description = document.createElement('p');
//   description.classList.add('description');
//   description.textContent = task.description;
//   content.appendChild(title);
//   content.appendChild(description);

//   const options = document.createElement('div');
//   options.classList.add('item', 'options');

//   const editButton = document.createElement('button');
//   editButton.classList.add('edit-task');
//   editButton.style.backgroundColor = `var(--priority-${task.priority})`;
//   const editButtonImage = document.createElement('img');
//   editButtonImage.src = './images/edit-icon.png';
//   editButton.appendChild(editButtonImage);
//   editButton.addEventListener('click', (e) => {
//     event.stopPropagation();
//     const parentDiv = e.target.parentElement.parentElement.parentElement;
//     if (parentDiv.nextSibling && parentDiv.nextSibling.id === 'task-popup') { return; }
//     const taskId = parentDiv.dataset.key;
//     updateTaskPopupForm(CURR_PROJECT_ID, taskId, parentDiv);
//   });

//   const deleteButton = document.createElement('button');
//   deleteButton.classList.add('delete-task');
//   deleteButton.style.backgroundColor = `var(--priority-${task.priority})`;
//   const deleteButtonImage = document.createElement('img');
//   deleteButtonImage.src = './images/delete-icon.png';
//   deleteButton.appendChild(deleteButtonImage);
//   deleteButton.addEventListener('click', (e) => {
//     event.stopPropagation();
//     const parentDiv = e.target.parentElement.parentElement.parentElement;
//     const taskId = parentDiv.dataset.key;
//     delete TODO_LIST[CURR_PROJECT_ID]['tasks'][taskId];
//     updateLocalStorage(TODO_LIST);
//     updateTaskListElement();
//   });

//   options.appendChild(editButton);
//   options.appendChild(deleteButton);

//   cardElement.appendChild(checkbox);
//   cardElement.appendChild(content);
//   cardElement.appendChild(options);

//   return cardElement;
// }

// // Add project card to the project list div
// function addProjectToProjectListElement(project) {
//   projectListElement.appendChild(getProjectItemCard(project));
// }

// // Add task card to the task list div
// function addTaskToTaskListElement(task) {
//   taskListElement.appendChild(getTaskItemCard(task));
// }

// // Update the project list div with new projects
// function updateProjectListElement() {
//   projectListElement.textContent = '';
//   for (let projectId of Object.keys(TODO_LIST)) {
//     const project = TODO_LIST[projectId]['project'];
//     addProjectToProjectListElement(project);
//   }
// }

// // Update the task list div with new tasks
// function updateTaskListElement() {
//   taskListElement.textContent = '';
//   if (CURR_PROJECT_ID) {
//     for (let taskId of Object.keys(TODO_LIST[CURR_PROJECT_ID]['tasks'])) {
//       const task = TODO_LIST[CURR_PROJECT_ID]['tasks'][taskId];
//       addTaskToTaskListElement(task);
//     }
//   }
// }

// // Update UI
// function updateUI() {
//   updateProjectListElement();
//   updateTaskListElement();
// }

// addProjectPopupButton.addEventListener('click', openProjectPopupForm);

// addTaskPopupButton.addEventListener('click', openTaskPopupForm);

// updateProjectListElement();
// updateTaskListElement()

document.addEventListener('storage', () => {
  _modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"].update();
});

_modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"].update();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFlLGNBQWMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsR0FBRyx5Q0FBeUM7Ozs7Ozs7Ozs7Ozs7O0FDQXBJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEJxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMGdCQUEwZ0I7QUFDMWdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU8sd0RBQVE7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7OztBQzdCRztBQUNZOztBQUV2QztBQUNBO0FBQ0EsK0NBQStDLCtDQUFHLEtBQUs7O0FBRXZEO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBOztBQUVBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxTQUFTLHlEQUFTO0FBQ2xCOztBQUVBLGlFQUFlLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCYzs7QUFFL0I7QUFDQSxxQ0FBcUMsc0RBQVU7QUFDL0M7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOYTtBQUNOO0FBQ0Y7O0FBRTVCO0FBQ0E7QUFDQSxjQUFjLGdEQUFNO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFZTtBQUNmOztBQUVBO0FBQ0EsaUJBQWlCLHFEQUFjO0FBQy9CLHlCQUF5QjtBQUN6QixJQUFJLHdEQUFpQjtBQUNyQjs7QUFFQTtBQUNBLGlCQUFpQixxREFBYztBQUMvQjtBQUNBLElBQUksd0RBQWlCO0FBQ3JCOztBQUVBO0FBQ0EsaUJBQWlCLHFEQUFjO0FBQy9CO0FBQ0EsSUFBSSx3REFBaUI7QUFDckI7O0FBRUE7QUFDQSxpQkFBaUIscURBQWM7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUY7QUFDbkY7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsUUFBUSwwREFBbUI7QUFDM0I7QUFDQSxRQUFRO0FBQ1IsUUFBUSwwREFBbUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsTUFBTSw0REFBdUIsQ0FBQywwREFBbUI7QUFDakQsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJHQUEyRztBQUMzRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIscURBQWM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25Pb0M7QUFDUjs7QUFFNUI7QUFDQTtBQUNBLGNBQWMsZ0RBQU07QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmOztBQUVBO0FBQ0EsaUJBQWlCLHFEQUFjO0FBQy9CO0FBQ0EsSUFBSSx3REFBaUI7QUFDckI7O0FBRUE7QUFDQSxpQkFBaUIscURBQWM7QUFDL0I7QUFDQSxJQUFJLHdEQUFpQjtBQUNyQjs7QUFFQTtBQUNBLGlCQUFpQixxREFBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQSxJQUFJLHdEQUFpQjtBQUNyQjs7QUFFQTtBQUNBLGlCQUFpQixxREFBYztBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELGNBQWM7O0FBRXhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBeUQsY0FBYztBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Y7QUFDaEY7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLDJEQUEyRCxjQUFjO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBLG1CQUFtQiwwREFBbUI7QUFDdEM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtHQUFrRztBQUNsRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxREFBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDL1FBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJvQztBQUNOO0FBQ0Y7O0FBRTVCO0FBQ0E7O0FBRWU7QUFDZjs7QUFFQTtBQUNBLElBQUksOERBQXlCO0FBQzdCOztBQUVBO0FBQ0EsSUFBSSwyREFBc0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrREFBMEI7QUFDOUIsSUFBSSw0REFBdUI7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLE9BQU8sMERBQW1CO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7O1VDbENEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEI7O0FBRTlCO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtHQUFrRztBQUNsRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlGQUF5RjtBQUN6RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5R0FBeUc7QUFDekc7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0dBQWdHO0FBQ2hHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRjtBQUNwRjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxjQUFjOztBQUV6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBELGNBQWM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQSw0REFBNEQsY0FBYztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUUsMERBQVM7QUFDWCxDQUFDOztBQUVELDBEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi4gQWxzbyxcbiAgICAvLyBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gKG1zQ3J5cHRvKSBvbiBJRTExLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykgfHwgdHlwZW9mIG1zQ3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgVGFza0xpc3QgZnJvbSAnLi90YXNrJztcbmltcG9ydCBUb2RvRFMgZnJvbSAnLi90b2RvJztcblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLmlkID0gdXVpZHY0KCk7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0TGlzdCB7XG4gIHN0YXRpYyBwcm9qZWN0TGlzdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaXRlbXMucHJvamVjdCcpO1xuXG4gIHN0YXRpYyBhZGRQcm9qZWN0KHByb2plY3QpIHtcbiAgICBjb25zdCB0b2RvID0gVG9kb0RTLmdldFRvZG8oKTtcbiAgICB0b2RvW3Byb2plY3QuaWRdID0geyAncHJvamVjdCc6IHByb2plY3QsICd0YXNrcyc6IHt9IH07XG4gICAgVG9kb0RTLnVwZGF0ZVRvZG8odG9kbyk7XG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlUHJvamVjdChwcm9qZWN0SWQpIHtcbiAgICBjb25zdCB0b2RvID0gVG9kb0RTLmdldFRvZG8oKTtcbiAgICBkZWxldGUgdG9kb1twcm9qZWN0SWRdO1xuICAgIFRvZG9EUy51cGRhdGVUb2RvKHRvZG8pO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVByb2plY3QocHJvamVjdElkLCBuYW1lKSB7XG4gICAgY29uc3QgdG9kbyA9IFRvZG9EUy5nZXRUb2RvKCk7XG4gICAgdG9kb1twcm9qZWN0SWRdWydwcm9qZWN0J11bJ25hbWUnXSA9IG5hbWU7XG4gICAgVG9kb0RTLnVwZGF0ZVRvZG8odG9kbyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvamVjdChwcm9qZWN0SWQpIHtcbiAgICBjb25zdCB0b2RvID0gVG9kb0RTLmdldFRvZG8oKTtcbiAgICByZXR1cm4gdG9kb1twcm9qZWN0SWRdWydwcm9qZWN0J107XG4gIH1cblxuICBzdGF0aWMgZ2V0SXRlbUNhcmQocHJvamVjdCkge1xuICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXRlbScsICdwcm9qZWN0Jyk7XG4gICAgY2FyZEVsZW1lbnQuZGF0YXNldC5rZXkgPSBwcm9qZWN0LmlkO1xuXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFxuICAgIG9wdGlvbnMuY2xhc3NMaXN0LmFkZCgnaXRlbScsICdvcHRpb25zJyk7XG4gICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZWRpdC1wcm9qZWN0Jyk7XG4gICAgY29uc3QgZWRpdEJ1dHRvbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgZWRpdEJ1dHRvbkltYWdlLnNyYyA9ICcuL2ltYWdlcy9lZGl0LWljb24ucG5nJztcbiAgICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRCdXR0b25JbWFnZSk7XG4gICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IHBhcmVudERpdiA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKHBhcmVudERpdi5uZXh0U2libGluZyAmJiBwYXJlbnREaXYubmV4dFNpYmxpbmcuaWQgPT09ICdwcm9qZWN0LXBvcHVwJykgeyByZXR1cm47IH1cbiAgICAgIGNvbnN0IHByb2plY3RJZCA9IHBhcmVudERpdi5kYXRhc2V0LmtleTtcbiAgICAgIHRoaXMub3BlblVwZGF0ZVBvcHVwRm9ybShwcm9qZWN0SWQsIHBhcmVudERpdik7XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1wcm9qZWN0Jyk7XG4gICAgY29uc3QgZGVsZXRlQnV0dG9uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBkZWxldGVCdXR0b25JbWFnZS5zcmMgPSAnLi9pbWFnZXMvZGVsZXRlLWljb24tMy5wbmcnO1xuICAgIGRlbGV0ZUJ1dHRvbi5hcHBlbmRDaGlsZChkZWxldGVCdXR0b25JbWFnZSk7XG4gICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgcHJvamVjdElkID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5rZXk7XG4gICAgICB0aGlzLnJlbW92ZVByb2plY3QocHJvamVjdElkKTtcbiAgICAgIHRoaXMudXBkYXRlSXRlbUxpc3QoKTtcbiAgICB9KTtcblxuICAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgb3B0aW9ucy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuICAgIFxuICAgIGNhcmRFbGVtZW50LmFwcGVuZENoaWxkKG5hbWUpO1xuICAgIGNhcmRFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbnMpO1xuXG4gICAgY2FyZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLml0ZW0ucHJvamVjdCcpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gIT0gZS50YXJnZXQpIHtcbiAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2NsaWNrZWQnKSkge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjbGlja2VkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xpY2tlZCcpKSB7XG4gICAgICAgIFRvZG9EUy5zZXRQcm9qZWN0SWQoJycpO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjbGlja2VkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBUb2RvRFMuc2V0UHJvamVjdElkKGUudGFyZ2V0LmRhdGFzZXQua2V5KTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coVG9kb0RTLmdldFByb2plY3RJZCgpKTtcbiAgICAgIFRhc2tMaXN0LnVwZGF0ZUl0ZW1MaXN0KFRvZG9EUy5nZXRQcm9qZWN0SWQoKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2FyZEVsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgb3BlblBvcHVwRm9ybSgpIHtcbiAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZvcm1FbGVtZW50LmlkID0gJ3Byb2plY3QtcG9wdXAnO1xuICAgIGZvcm1FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2l0ZW0nLCAncHJvamVjdCcpO1xuICAgIFxuICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRFbGVtZW50LnR5cGUgPSAndGV4dCc7XG4gICAgaW5wdXRFbGVtZW50LmlkID0gJ3Byb2plY3QtbmFtZSc7XG4gICAgaW5wdXRFbGVtZW50LnBsYWNlaG9sZGVyID0gJ1Byb2plY3QgTmFtZSc7XG4gICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgIT09IDEzKSB7IHJldHVybjsgfVxuICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKS52YWx1ZTtcbiAgICAgIGlmICghbmFtZSkgeyByZXR1cm4gfVxuICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpO1xuICAgICAgdGhpcy5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgdGhpcy5hZGRUb0l0ZW1MaXN0KHByb2plY3QsIHRydWUpO1xuICAgICAgdGhpcy5jbG9zZVBvcHVwRm9ybSgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYnV0dG9uR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBidXR0b25Hcm91cC5pZCA9ICdidXR0b24tZ3JvdXAnO1xuXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3VibWl0QnV0dG9uLmlkID0gJ3N1Ym1pdC1wcm9qZWN0LXBvcHVwJztcbiAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2FkZCcpO1xuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lJykudmFsdWU7XG4gICAgICBpZiAoIW5hbWUpIHsgcmV0dXJuIH1cbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcbiAgICAgIHRoaXMuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICAgIHRoaXMuYWRkVG9JdGVtTGlzdChwcm9qZWN0LCB0cnVlKTtcbiAgICAgIHRoaXMuY2xvc2VQb3B1cEZvcm0oKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2xvc2VCdXR0b24uaWQgPSAnY2xvc2UtcHJvamVjdC1wb3B1cCc7XG4gICAgY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2Nsb3NlJyk7XG4gICAgY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSAnQ2xvc2UnO1xuICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZVBvcHVwRm9ybSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgYnV0dG9uR3JvdXAuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pXG5cbiAgICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpO1xuICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkdyb3VwKTtcblxuICAgIGlmICh0aGlzLnByb2plY3RMaXN0RWxlbWVudC5maXJzdENoaWxkICYmIHRoaXMucHJvamVjdExpc3RFbGVtZW50LmZpcnN0Q2hpbGQuaWQgPT09ICdwcm9qZWN0LXBvcHVwJykgeyByZXR1cm4gfVxuICAgIHRoaXMucHJvamVjdExpc3RFbGVtZW50Lmluc2VydEJlZm9yZShmb3JtRWxlbWVudCwgdGhpcy5wcm9qZWN0TGlzdEVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VQb3B1cEZvcm0oKSB7XG4gICAgaWYgKHRoaXMucHJvamVjdExpc3RFbGVtZW50LmZpcnN0Q2hpbGQgPT0gbnVsbCB8fCB0aGlzLnByb2plY3RMaXN0RWxlbWVudC5maXJzdENoaWxkLmlkICE9ICdwcm9qZWN0LXBvcHVwJykgcmV0dXJuXG4gICAgdGhpcy5wcm9qZWN0TGlzdEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5wcm9qZWN0TGlzdEVsZW1lbnQuZmlyc3RDaGlsZClcbiAgfVxuXG4gIHN0YXRpYyBvcGVuVXBkYXRlUG9wdXBGb3JtKHByb2plY3RJZCwgcHJvamVjdEVsZW1lbnQpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5nZXRQcm9qZWN0KHByb2plY3RJZCk7XG4gICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmb3JtRWxlbWVudC5pZCA9ICdwcm9qZWN0LXBvcHVwJztcbiAgICBmb3JtRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpdGVtJywgJ3Byb2plY3QnKTtcbiAgICBcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0RWxlbWVudC50eXBlID0gJ3RleHQnO1xuICAgIGlucHV0RWxlbWVudC5pZCA9ICdwcm9qZWN0LW5hbWUnO1xuICAgIGlucHV0RWxlbWVudC5wbGFjZWhvbGRlciA9ICdQcm9qZWN0IE5hbWUnO1xuICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IHByb2plY3QubmFtZTtcbiAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSAhPT0gMTMpIHsgcmV0dXJuOyB9XG4gICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpLnZhbHVlO1xuICAgICAgaWYgKCFuYW1lKSB7IHJldHVybiB9XG4gICAgICB0aGlzLnVwZGF0ZVByb2plY3QocHJvamVjdElkLCBuYW1lKTtcbiAgICAgIHRoaXMudXBkYXRlSXRlbUxpc3QoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGJ1dHRvbkdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYnV0dG9uR3JvdXAuaWQgPSAnYnV0dG9uLWdyb3VwJztcblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHN1Ym1pdEJ1dHRvbi5pZCA9ICdzdWJtaXQtcHJvamVjdC1wb3B1cCc7XG4gICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdhZGQnKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnVXBkYXRlJztcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LW5hbWUnKS52YWx1ZTtcbiAgICAgIGlmICghbmFtZSkgeyByZXR1cm4gfVxuICAgICAgdGhpcy51cGRhdGVQcm9qZWN0KHByb2plY3RJZCwgbmFtZSk7XG4gICAgICB0aGlzLnVwZGF0ZUl0ZW1MaXN0KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNsb3NlQnV0dG9uLmlkID0gJ2Nsb3NlLXByb2plY3QtcG9wdXAnO1xuICAgIGNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdjbG9zZScpO1xuICAgIGNsb3NlQnV0dG9uLnRleHRDb250ZW50ID0gJ0Nsb3NlJztcbiAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlVXBkYXRlUG9wdXBGb3JtKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgfSk7XG4gICAgXG4gICAgYnV0dG9uR3JvdXAuYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICBidXR0b25Hcm91cC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbilcblxuICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XG4gICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uR3JvdXApO1xuXG4gICAgdGhpcy5wcm9qZWN0TGlzdEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGZvcm1FbGVtZW50LCBwcm9qZWN0RWxlbWVudC5uZXh0U2libGluZyk7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VVcGRhdGVQb3B1cEZvcm0ocG9wdXBFbGVtZW50KSB7XG4gICAgdGhpcy5wcm9qZWN0TGlzdEVsZW1lbnQucmVtb3ZlQ2hpbGQocG9wdXBFbGVtZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUb0l0ZW1MaXN0KHByb2plY3QsIGZvY3VzPWZhbHNlKSB7XG4gICAgY29uc3QgY2FyZEVsZW1lbnQgPSB0aGlzLmdldEl0ZW1DYXJkKHByb2plY3QpO1xuICAgIGlmIChmb2N1cykgeyBjYXJkRWxlbWVudC5jbGljaygpOyB9XG4gICAgdGhpcy5wcm9qZWN0TGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXRJdGVtQ2FyZChwcm9qZWN0KSk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlSXRlbUxpc3QoKSB7XG4gICAgdGhpcy5wcm9qZWN0TGlzdEVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICBjb25zdCB0b2RvID0gVG9kb0RTLmdldFRvZG8oKVxuICAgIGZvciAobGV0IHByb2plY3RJZCBvZiBPYmplY3Qua2V5cyh0b2RvKSkge1xuICAgICAgY29uc3QgcHJvamVjdCA9IHRvZG9bcHJvamVjdElkXVsncHJvamVjdCddO1xuICAgICAgdGhpcy5hZGRUb0l0ZW1MaXN0KHByb2plY3QpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgVG9kb0RTIGZyb20gJy4vdG9kbyc7XG5cbmNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLmlkID0gdXVpZHY0KCk7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tMaXN0IHtcbiAgc3RhdGljIHRhc2tMaXN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGVtcy50YXNrJyk7XG5cbiAgc3RhdGljIGFkZFRhc2socHJvamVjdElkLCB0YXNrKSB7XG4gICAgY29uc3QgdG9kbyA9IFRvZG9EUy5nZXRUb2RvKCk7XG4gICAgdG9kb1twcm9qZWN0SWRdWyd0YXNrcyddW3Rhc2suaWRdID0gdGFzaztcbiAgICBUb2RvRFMudXBkYXRlVG9kbyh0b2RvKTtcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVUYXNrKHByb2plY3RJZCwgdGFzaykge1xuICAgIGNvbnN0IHRvZG8gPSBUb2RvRFMuZ2V0VG9kbygpO1xuICAgIGRlbGV0ZSB0b2RvW3Byb2plY3RJZF1bJ3Rhc2tzJ11bdGFzay5pZF07XG4gICAgVG9kb0RTLnVwZGF0ZVRvZG8odG9kbyk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGFzayhwcm9qZWN0SWQsIHRhc2tJZCwgbmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5KSB7XG4gICAgY29uc3QgdG9kbyA9IFRvZG9EUy5nZXRUb2RvKCk7XG4gICAgdG9kb1twcm9qZWN0SWRdWyd0YXNrcyddW3Rhc2tJZF1bJ25hbWUnXSA9IG5hbWU7XG4gICAgdG9kb1twcm9qZWN0SWRdWyd0YXNrcyddW3Rhc2tJZF1bJ2Rlc2NyaXB0aW9uJ10gPSBkZXNjcmlwdGlvbjtcbiAgICB0b2RvW3Byb2plY3RJZF1bJ3Rhc2tzJ11bdGFza0lkXVsncHJpb3JpdHknXSA9IHByaW9yaXR5O1xuICAgIFRvZG9EUy51cGRhdGVUb2RvKHRvZG8pO1xuICB9XG5cbiAgc3RhdGljIGdldFRhc2socHJvamVjdElkLCB0YXNrSWQpIHtcbiAgICBjb25zdCB0b2RvID0gVG9kb0RTLmdldFRvZG8oKTtcbiAgICByZXR1cm4gdG9kb1twcm9qZWN0SWRdWyd0YXNrcyddW3Rhc2tJZF07XG4gIH1cblxuICBzdGF0aWMgZ2V0SXRlbUNhcmQodGFzaykge1xuICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2FyZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXRlbScsICd0YXNrJyk7XG4gICAgY2FyZEVsZW1lbnQuZGF0YXNldC5rZXkgPSB0YXNrLmlkO1xuICAgIGNhcmRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGB2YXIoLS1wcmlvcml0eS0ke3Rhc2sucHJpb3JpdHl9KWA7XG5cbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaXRlbScsICdjb250ZW50Jyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSB0YXNrLm5hbWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24nKTtcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgY29udGVudC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgY29udGVudC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICBjb25zdCBvcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdpdGVtJywgJ29wdGlvbnMnKTtcblxuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBlZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdGFzaycpO1xuICAgIGVkaXRCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHZhcigtLXByaW9yaXR5LSR7dGFzay5wcmlvcml0eX0pYDtcbiAgICBjb25zdCBlZGl0QnV0dG9uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBlZGl0QnV0dG9uSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL2VkaXQtaWNvbi5wbmcnO1xuICAgIGVkaXRCdXR0b24uYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbkltYWdlKTtcbiAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgcGFyZW50RGl2ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBpZiAocGFyZW50RGl2Lm5leHRTaWJsaW5nICYmIHBhcmVudERpdi5uZXh0U2libGluZy5pZCA9PT0gJ3Rhc2stcG9wdXAnKSB7IHJldHVybjsgfVxuICAgICAgY29uc3QgdGFza0lkID0gcGFyZW50RGl2LmRhdGFzZXQua2V5O1xuICAgICAgdGhpcy5vcGVuVXBkYXRlUG9wdXBGb3JtKHByb2plY3RJZCwgdGFza0lkLCBwYXJlbnREaXYpXG4gICAgfSk7XG5cbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLXRhc2snKTtcbiAgICBkZWxldGVCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHZhcigtLXByaW9yaXR5LSR7dGFzay5wcmlvcml0eX0pYDtcbiAgICBjb25zdCBkZWxldGVCdXR0b25JbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGRlbGV0ZUJ1dHRvbkltYWdlLnNyYyA9ICcuL2ltYWdlcy9kZWxldGUtaWNvbi0zLnBuZyc7XG4gICAgZGVsZXRlQnV0dG9uLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbkltYWdlKTtcbiAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCBwYXJlbnREaXYgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IHRhc2tJZCA9IHBhcmVudERpdi5kYXRhc2V0LmtleTtcbiAgICAgIHRoaXMucmVtb3ZlVGFzayhwcm9qZWN0SWQsIHRhc2tJZClcbiAgICAgIHRoaXMudXBkYXRlSXRlbUxpc3QoKTtcbiAgICB9KTtcblxuICAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgb3B0aW9ucy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG4gICAgY2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xuICAgIGNhcmRFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIGNhcmRFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIGNhcmRFbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIG9wZW5Qb3B1cEZvcm0oKSB7XG4gICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmb3JtRWxlbWVudC5pZCA9ICd0YXNrLXBvcHVwJztcbiAgICBmb3JtRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpdGVtJywgJ3Rhc2snKTtcblxuICAgIGNvbnN0IGlucHV0R3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbnB1dEdyb3VwLmlkID0gJ2lucHV0LWdyb3VwJztcbiAgICBcbiAgICBjb25zdCBpbnB1dEVsZW1lbnROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dEVsZW1lbnROYW1lLnR5cGUgPSAndGV4dCc7XG4gICAgaW5wdXRFbGVtZW50TmFtZS5pZCA9ICd0YXNrLW5hbWUnO1xuICAgIGlucHV0RWxlbWVudE5hbWUucGxhY2Vob2xkZXIgPSAnVGFzayBOYW1lJztcbiAgICBpbnB1dEVsZW1lbnROYW1lLmZvY3VzKCk7XG5cbiAgICBjb25zdCBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRFbGVtZW50RGVzY3JpcHRpb24udHlwZSA9ICd0ZXh0JztcbiAgICBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbi5pZCA9ICd0YXNrLWRlc2NyaXB0aW9uJztcbiAgICBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbi5wbGFjZWhvbGRlciA9ICdUYXNrIERlc2NyaXB0aW9uJztcblxuICAgIGNvbnN0IGlucHV0RWxlbWVudFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgaW5wdXRFbGVtZW50UHJpb3JpdHkuaWQgPSAndGFzay1wcmlvcml0eSc7XG4gICAgY29uc3QgcHJpb3JpdHlIaWdoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgcHJpb3JpdHlIaWdoLnZhbHVlID0gJ2hpZ2gnO1xuICAgIHByaW9yaXR5SGlnaC50ZXh0Q29udGVudCA9ICdIaWdoJztcbiAgICBjb25zdCBwcmlvcml0eU1lZGl1bSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIHByaW9yaXR5TWVkaXVtLnZhbHVlID0gJ21lZGl1bSc7XG4gICAgcHJpb3JpdHlNZWRpdW0udGV4dENvbnRlbnQgPSAnTWVkaXVtJztcbiAgICBjb25zdCBwcmlvcml0eUxvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIHByaW9yaXR5TG93LnZhbHVlID0gJ2xvdyc7XG4gICAgcHJpb3JpdHlMb3cudGV4dENvbnRlbnQgPSAnTG93JztcbiAgICBpbnB1dEVsZW1lbnRQcmlvcml0eS5hcHBlbmRDaGlsZChwcmlvcml0eUhpZ2gpO1xuICAgIGlucHV0RWxlbWVudFByaW9yaXR5LmFwcGVuZENoaWxkKHByaW9yaXR5TWVkaXVtKTtcbiAgICBpbnB1dEVsZW1lbnRQcmlvcml0eS5hcHBlbmRDaGlsZChwcmlvcml0eUxvdyk7XG5cbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RWxlbWVudE5hbWUpO1xuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50RGVzY3JpcHRpb24pO1xuICAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50UHJpb3JpdHkpO1xuXG4gICAgY29uc3QgYnV0dG9uR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBidXR0b25Hcm91cC5pZCA9ICdidXR0b24tZ3JvdXAnO1xuXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3VibWl0QnV0dG9uLmlkID0gJ3N1Ym1pdC10YXNrLXBvcHVwJztcbiAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2FkZCcpO1xuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1uYW1lJykudmFsdWU7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXByaW9yaXR5JykudmFsdWU7XG4gICAgICBpZiAoIW5hbWUgfHwgIWRlc2NyaXB0aW9uKSB7IHJldHVybjsgfVxuICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSk7XG4gICAgICB0aGlzLmFkZFRhc2soVG9kb0RTLmdldFByb2plY3RJZCgpLCB0YXNrKVxuICAgICAgdGhpcy5hZGRUb0l0ZW1MaXN0KHRhc2spO1xuICAgICAgdGhpcy5jbG9zZVBvcHVwRm9ybSgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjbG9zZUJ1dHRvbi5pZCA9ICdjbG9zZS10YXNrLXBvcHVwJztcbiAgICBjbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnY2xvc2UnKTtcbiAgICBjbG9zZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdDbG9zZSc7XG4gICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlUG9wdXBGb3JtKCk7XG4gICAgfSk7XG5cbiAgICBidXR0b25Hcm91cC5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICAgIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKTtcblxuICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGlucHV0R3JvdXApO1xuICAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkdyb3VwKTtcbiAgICBcbiAgICBpZiAodGhpcy50YXNrTGlzdEVsZW1lbnQuZmlyc3RDaGlsZCAmJiB0aGlzLnRhc2tMaXN0RWxlbWVudC5maXJzdENoaWxkLmlkID09PSAndGFzay1wb3B1cCcpIHsgcmV0dXJuIH1cbiAgICB0aGlzLnRhc2tMaXN0RWxlbWVudC5pbnNlcnRCZWZvcmUoZm9ybUVsZW1lbnQsIHRoaXMudGFza0xpc3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlUG9wdXBGb3JtKCkge1xuICAgIGlmICh0aGlzLnRhc2tMaXN0RWxlbWVudC5maXJzdENoaWxkID09IG51bGwgfHwgdGhpcy50YXNrTGlzdEVsZW1lbnQuZmlyc3RDaGlsZC5pZCAhPSAndGFzay1wb3B1cCcpIHJldHVyblxuICAgIHRoaXMudGFza0xpc3RFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMudGFza0xpc3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgc3RhdGljIG9wZW5VcGRhdGVQb3B1cEZvcm0ocHJvamVjdElkLCB0YXNrSWQsIHRhc2tFbGVtZW50KSB7XG4gICAgY29uc3QgdGFzayA9IHRoaXMuZ2V0VGFzayhwcm9qZWN0SWQsIHRhc2tJZCk7XG5cbiAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZvcm1FbGVtZW50LmlkID0gJ3Rhc2stcG9wdXAnO1xuICAgIGZvcm1FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2l0ZW0nLCAndGFzaycpO1xuXG4gICAgY29uc3QgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlucHV0R3JvdXAuaWQgPSAnaW5wdXQtZ3JvdXAnO1xuICAgIFxuICAgIGNvbnN0IGlucHV0RWxlbWVudE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0RWxlbWVudE5hbWUudHlwZSA9ICd0ZXh0JztcbiAgICBpbnB1dEVsZW1lbnROYW1lLmlkID0gJ3Rhc2stbmFtZSc7XG4gICAgaW5wdXRFbGVtZW50TmFtZS5wbGFjZWhvbGRlciA9ICdUYXNrIE5hbWUnO1xuICAgIGlucHV0RWxlbWVudE5hbWUudmFsdWUgPSB0YXNrLm5hbWU7XG5cbiAgICBjb25zdCBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRFbGVtZW50RGVzY3JpcHRpb24udHlwZSA9ICd0ZXh0JztcbiAgICBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbi5pZCA9ICd0YXNrLWRlc2NyaXB0aW9uJztcbiAgICBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbi5wbGFjZWhvbGRlciA9ICdUYXNrIERlc2NyaXB0aW9uJztcbiAgICBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG5cbiAgICBjb25zdCBpbnB1dEVsZW1lbnRQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgIGlucHV0RWxlbWVudFByaW9yaXR5LmlkID0gJ3Rhc2stcHJpb3JpdHknO1xuICAgIGNvbnN0IHByaW9yaXR5SGlnaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIHByaW9yaXR5SGlnaC52YWx1ZSA9ICdoaWdoJztcbiAgICBwcmlvcml0eUhpZ2gudGV4dENvbnRlbnQgPSAnSGlnaCc7XG4gICAgY29uc3QgcHJpb3JpdHlNZWRpdW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBwcmlvcml0eU1lZGl1bS52YWx1ZSA9ICdtZWRpdW0nO1xuICAgIHByaW9yaXR5TWVkaXVtLnRleHRDb250ZW50ID0gJ01lZGl1bSc7XG4gICAgY29uc3QgcHJpb3JpdHlMb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBwcmlvcml0eUxvdy52YWx1ZSA9ICdsb3cnO1xuICAgIHByaW9yaXR5TG93LnRleHRDb250ZW50ID0gJ0xvdyc7XG4gICAgaW5wdXRFbGVtZW50UHJpb3JpdHkuYXBwZW5kQ2hpbGQocHJpb3JpdHlIaWdoKTtcbiAgICBpbnB1dEVsZW1lbnRQcmlvcml0eS5hcHBlbmRDaGlsZChwcmlvcml0eU1lZGl1bSk7XG4gICAgaW5wdXRFbGVtZW50UHJpb3JpdHkuYXBwZW5kQ2hpbGQocHJpb3JpdHlMb3cpO1xuXG4gICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnROYW1lKTtcbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RWxlbWVudERlc2NyaXB0aW9uKTtcbiAgICBpbnB1dEdyb3VwLmFwcGVuZENoaWxkKGlucHV0RWxlbWVudFByaW9yaXR5KVxuXG4gICAgY29uc3QgYnV0dG9uR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBidXR0b25Hcm91cC5pZCA9ICdidXR0b24tZ3JvdXAnO1xuXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3VibWl0QnV0dG9uLmlkID0gJ3N1Ym1pdC1wcm9qZWN0LXBvcHVwJztcbiAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2FkZCcpO1xuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdVcGRhdGUnO1xuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbmFtZScpLnZhbHVlO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1wcmlvcml0eScpLnZhbHVlO1xuICAgICAgaWYgKCFuYW1lIHx8ICFkZXNjcmlwdGlvbikgeyByZXR1cm4gfVxuICAgICAgdGhpcy51cGRhdGVUYXNrKHByb2plY3RJZCwgdGFza0lkLCBuYW1lLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHkpXG4gICAgICB0aGlzLnVwZGF0ZUl0ZW1MaXN0KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNsb3NlQnV0dG9uLmlkID0gJ2Nsb3NlLXByb2plY3QtcG9wdXAnO1xuICAgIGNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdjbG9zZScpO1xuICAgIGNsb3NlQnV0dG9uLnRleHRDb250ZW50ID0gJ0Nsb3NlJztcbiAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlVXBkYXRlUG9wdXBGb3JtKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICBidXR0b25Hcm91cC5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICAgIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKVxuXG4gICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRHcm91cCk7XG4gICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uR3JvdXApO1xuXG4gICAgdGhpcy50YXNrTGlzdEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGZvcm1FbGVtZW50LCB0YXNrRWxlbWVudC5uZXh0U2libGluZyk7XG4gIH1cblxuICBzdGF0aWMgY2xvc2VVcGRhdGVQb3B1cEZvcm0ocG9wdXBFbGVtZW50KSB7XG4gICAgdGFza0xpc3RFbGVtZW50LnJlbW92ZUNoaWxkKHBvcHVwRWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgYWRkVG9JdGVtTGlzdCh0YXNrKSB7XG4gICAgdGhpcy50YXNrTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXRJdGVtQ2FyZCh0YXNrKSk7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlSXRlbUxpc3QocHJvamVjdElkKSB7XG4gICAgdGhpcy50YXNrTGlzdEVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICBpZiAocHJvamVjdElkKSB7XG4gICAgICBjb25zdCB0b2RvID0gVG9kb0RTLmdldFRvZG8oKTtcbiAgICAgIGZvciAobGV0IHRhc2tJZCBvZiBPYmplY3Qua2V5cyh0b2RvW3Byb2plY3RJZF1bJ3Rhc2tzJ10pKSB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSB0b2RvW3Byb2plY3RJZF1bJ3Rhc2tzJ11bdGFza0lkXTtcbiAgICAgICAgdGhpcy5hZGRUb0l0ZW1MaXN0KHRhc2spO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9cIikgPT0gbnVsbCkge1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvXCIsIEpTT04uc3RyaW5naWZ5KHt9KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9EUyB7XG4gIHN0YXRpYyBwcm9qZWN0SWQgPSAnJ1xuICBzdGF0aWMgdG9kbyA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvJykpO1xuICBcbiAgc3RhdGljIGdldFByb2plY3RJZCA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0SWRcbiAgfVxuICBzdGF0aWMgc2V0UHJvamVjdElkID0gKHByb2plY3RJZCkgPT4ge1xuICAgIHRoaXMucHJvamVjdElkID0gcHJvamVjdElkO1xuICB9XG4gIHN0YXRpYyBnZXRUb2RvKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG87XG4gIH1cbiAgc3RhdGljIHVwZGF0ZVRvZG8odG9kbykge1xuICAgIHRoaXMudG9kbyA9IHRvZG87XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvJywgSlNPTi5zdHJpbmdpZnkodGhpcy50b2RvKSk7XG4gIH1cbn1cbiIsImltcG9ydCBQcm9qZWN0TGlzdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5pbXBvcnQgVGFza0xpc3QgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IFRvZG9EUyBmcm9tIFwiLi90b2RvXCI7XG5cbmNvbnN0IG9wZW5Qcm9qZWN0UG9wdXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1wcm9qZWN0LXBvcHVwJyk7XG5jb25zdCBvcGVuVGFza1BvcHVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tdGFzay1wb3B1cCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzdGF0aWMgYWRkUHJvamVjdCgpIHtcbiAgICBQcm9qZWN0TGlzdC5vcGVuUG9wdXBGb3JtKCk7XG4gIH1cblxuICBzdGF0aWMgYWRkVGFzaygpIHtcbiAgICBUYXNrTGlzdC5vcGVuUG9wdXBGb3JtKCk7XG4gIH1cbiAgXG4gIHN0YXRpYyB1cGRhdGUoKSB7XG4gICAgUHJvamVjdExpc3QudXBkYXRlSXRlbUxpc3QoKTtcbiAgICBUYXNrTGlzdC51cGRhdGVJdGVtTGlzdCgpO1xuICB9XG59XG5cbm9wZW5Qcm9qZWN0UG9wdXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIFVJLmFkZFByb2plY3QoKTtcbn0pO1xuXG5vcGVuVGFza1BvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoIVRvZG9EUy5nZXRQcm9qZWN0SWQoKSkge1xuICAgIGFsZXJ0KCdTZWxlY3QgYSBwcm9qZWN0IHRvIGFkZCBhIHRhc2suJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIFVJLmFkZFRhc2soKTtcbn0pOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJIGZyb20gXCIuL21vZHVsZXMvdWlcIjtcblxuLy8gaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9cIikgPT0gbnVsbCkge1xuLy8gICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvXCIsIEpTT04uc3RyaW5naWZ5KHt9KSk7XG4vLyB9XG4vLyBjb25zdCBUT0RPX0xJU1QgPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9cIikpO1xuLy8gbGV0IENVUlJfUFJPSkVDVF9JRCA9ICcnO1xuXG4vLyBmdW5jdGlvbiB1cGRhdGVMb2NhbFN0b3JhZ2UodmFsdWUpIHtcbi8vICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvJywgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gdXVpZCgpIHtcbi8vICAgcmV0dXJuIChbMWU0XSstMWU0Ky00ZTQrLThlNCstMWU0KS5yZXBsYWNlKC9bMDE4XS9nLCBjID0+XG4vLyAgICAgKGMgXiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmIDE1ID4+IGMgLyA0KS50b1N0cmluZygxNilcbi8vICAgKVxuLy8gfVxuXG4vLyBjbGFzcyBQcm9qZWN0IHtcbi8vICAgY29uc3RydWN0b3IobmFtZSkge1xuLy8gICAgIHRoaXMuaWQgPSB1dWlkKCk7XG4vLyAgICAgdGhpcy5uYW1lID0gbmFtZTtcbi8vICAgfVxuLy8gfVxuXG4vLyBjbGFzcyBUYXNrIHtcbi8vICAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5KSB7XG4vLyAgICAgdGhpcy5pZCA9IHV1aWQoKTtcbi8vICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuLy8gICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbi8vICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4vLyAgIH1cbi8vIH1cblxuLy8gY29uc3QgcHJvamVjdExpc3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLml0ZW1zLnByb2plY3QnKTtcbi8vIGNvbnN0IHRhc2tMaXN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pdGVtcy50YXNrJyk7XG5cbi8vIGNvbnN0IGFkZFByb2plY3RQb3B1cEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuLXByb2plY3QtcG9wdXAnKTtcbi8vIGNvbnN0IGFkZFRhc2tQb3B1cEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuLXRhc2stcG9wdXAnKTtcblxuLy8gLy8gT3BlbiBwcm9qZWN0IHBvcHVwIGZvcm1cbi8vIGZ1bmN0aW9uIG9wZW5Qcm9qZWN0UG9wdXBGb3JtKCkge1xuLy8gICBpZiAocHJvamVjdExpc3RFbGVtZW50LmZpcnN0Q2hpbGQgJiYgcHJvamVjdExpc3RFbGVtZW50LmZpcnN0Q2hpbGQuaWQgPT09ICdwcm9qZWN0LXBvcHVwJykgeyByZXR1cm4gfVxuLy8gICBwcm9qZWN0TGlzdEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGdldFByb2plY3RQb3B1cEZvcm0oKSwgcHJvamVjdExpc3RFbGVtZW50LmZpcnN0Q2hpbGQpO1xuLy8gfVxuXG4vLyAvLyBPcGVuIHRhc2sgcG9wdXAgZm9ybVxuLy8gZnVuY3Rpb24gb3BlblRhc2tQb3B1cEZvcm0oKSB7XG4vLyAgIGlmICghQ1VSUl9QUk9KRUNUX0lEKSB7IFxuLy8gICAgIGFsZXJ0KCdDcmVhdGUgYSBwcm9qZWN0IGZpcnN0IS4nKTtcbi8vICAgICByZXR1cm47XG4vLyAgIH1cbi8vICAgaWYgKHRhc2tMaXN0RWxlbWVudC5maXJzdENoaWxkICYmIHRhc2tMaXN0RWxlbWVudC5maXJzdENoaWxkLmlkID09PSAndGFzay1wb3B1cCcpIHsgcmV0dXJuIH1cbi8vICAgdGFza0xpc3RFbGVtZW50Lmluc2VydEJlZm9yZShnZXRUYXNrUG9wdXBGb3JtKCksIHRhc2tMaXN0RWxlbWVudC5maXJzdENoaWxkKTtcbi8vIH1cblxuLy8gLy8gR2V0IHByb2plY3QgcG9wdXAgZm9ybVxuLy8gZnVuY3Rpb24gZ2V0UHJvamVjdFBvcHVwRm9ybSgpIHtcbi8vICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgZm9ybUVsZW1lbnQuaWQgPSAncHJvamVjdC1wb3B1cCc7XG4vLyAgIGZvcm1FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2l0ZW0nLCAncHJvamVjdCcpO1xuICBcbi8vICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbi8vICAgaW5wdXRFbGVtZW50LnR5cGUgPSAndGV4dCc7XG4vLyAgIGlucHV0RWxlbWVudC5pZCA9ICdwcm9qZWN0LW5hbWUnO1xuLy8gICBpbnB1dEVsZW1lbnQucGxhY2Vob2xkZXIgPSAnUHJvamVjdCBOYW1lJztcbi8vICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XG5cbi8vICAgY29uc3QgYnV0dG9uR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgYnV0dG9uR3JvdXAuaWQgPSAnYnV0dG9uLWdyb3VwJztcblxuLy8gICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbi8vICAgc3VibWl0QnV0dG9uLmlkID0gJ3N1Ym1pdC1wcm9qZWN0LXBvcHVwJztcbi8vICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdhZGQnKTtcbi8vICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4vLyAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpLnZhbHVlO1xuLy8gICAgIGlmICghbmFtZSkgeyByZXR1cm4gfVxuLy8gICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcbi8vICAgICBUT0RPX0xJU1RbcHJvamVjdC5pZF0gPSB7XG4vLyAgICAgICAncHJvamVjdCc6IHByb2plY3QsXG4vLyAgICAgICAndGFza3MnOiB7fVxuLy8gICAgIH1cbi8vICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoVE9ET19MSVNUKTtcbi8vICAgICBhZGRQcm9qZWN0VG9Qcm9qZWN0TGlzdEVsZW1lbnQocHJvamVjdCk7XG4vLyAgICAgY2xvc2VQcm9qZWN0UG9wdXBGb3JtKCk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4vLyAgIGNsb3NlQnV0dG9uLmlkID0gJ2Nsb3NlLXByb2plY3QtcG9wdXAnO1xuLy8gICBjbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnY2xvc2UnKTtcbi8vICAgY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSAnQ2xvc2UnO1xuLy8gICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbi8vICAgICBjbG9zZVByb2plY3RQb3B1cEZvcm0oKTtcbi8vICAgfSk7XG4gIFxuLy8gICBidXR0b25Hcm91cC5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuLy8gICBidXR0b25Hcm91cC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbilcblxuLy8gICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnQpO1xuLy8gICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChidXR0b25Hcm91cCk7XG5cbi8vICAgcmV0dXJuIGZvcm1FbGVtZW50O1xuLy8gfVxuXG4vLyAvLyBHZXQgdGFzayBwb3B1cCBmb3JtXG4vLyBmdW5jdGlvbiBnZXRUYXNrUG9wdXBGb3JtKCkge1xuLy8gICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICBmb3JtRWxlbWVudC5pZCA9ICd0YXNrLXBvcHVwJztcbi8vICAgZm9ybUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXRlbScsICd0YXNrJyk7XG5cbi8vICAgY29uc3QgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICBpbnB1dEdyb3VwLmlkID0gJ2lucHV0LWdyb3VwJztcbiAgXG4vLyAgIGNvbnN0IGlucHV0RWxlbWVudE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuLy8gICBpbnB1dEVsZW1lbnROYW1lLnR5cGUgPSAndGV4dCc7XG4vLyAgIGlucHV0RWxlbWVudE5hbWUuaWQgPSAndGFzay1uYW1lJztcbi8vICAgaW5wdXRFbGVtZW50TmFtZS5wbGFjZWhvbGRlciA9ICdUYXNrIE5hbWUnO1xuLy8gICBpbnB1dEVsZW1lbnROYW1lLmZvY3VzKCk7XG5cbi8vICAgY29uc3QgaW5wdXRFbGVtZW50RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuLy8gICBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbi50eXBlID0gJ3RleHQnO1xuLy8gICBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbi5pZCA9ICd0YXNrLWRlc2NyaXB0aW9uJztcbi8vICAgaW5wdXRFbGVtZW50RGVzY3JpcHRpb24ucGxhY2Vob2xkZXIgPSAnVGFzayBEZXNjcmlwdGlvbic7XG5cbi8vICAgY29uc3QgaW5wdXRFbGVtZW50UHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbi8vICAgaW5wdXRFbGVtZW50UHJpb3JpdHkuaWQgPSAndGFzay1wcmlvcml0eSc7XG4vLyAgIGNvbnN0IHByaW9yaXR5SGlnaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuLy8gICBwcmlvcml0eUhpZ2gudmFsdWUgPSAnaGlnaCc7XG4vLyAgIHByaW9yaXR5SGlnaC50ZXh0Q29udGVudCA9ICdIaWdoJztcbi8vICAgY29uc3QgcHJpb3JpdHlNZWRpdW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbi8vICAgcHJpb3JpdHlNZWRpdW0udmFsdWUgPSAnbWVkaXVtJztcbi8vICAgcHJpb3JpdHlNZWRpdW0udGV4dENvbnRlbnQgPSAnTWVkaXVtJztcbi8vICAgY29uc3QgcHJpb3JpdHlMb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbi8vICAgcHJpb3JpdHlMb3cudmFsdWUgPSAnbG93Jztcbi8vICAgcHJpb3JpdHlMb3cudGV4dENvbnRlbnQgPSAnTG93Jztcbi8vICAgaW5wdXRFbGVtZW50UHJpb3JpdHkuYXBwZW5kQ2hpbGQocHJpb3JpdHlIaWdoKTtcbi8vICAgaW5wdXRFbGVtZW50UHJpb3JpdHkuYXBwZW5kQ2hpbGQocHJpb3JpdHlNZWRpdW0pO1xuLy8gICBpbnB1dEVsZW1lbnRQcmlvcml0eS5hcHBlbmRDaGlsZChwcmlvcml0eUxvdyk7XG5cbi8vICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnROYW1lKTtcbi8vICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnREZXNjcmlwdGlvbik7XG4vLyAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50UHJpb3JpdHkpO1xuXG4vLyAgIGNvbnN0IGJ1dHRvbkdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgIGJ1dHRvbkdyb3VwLmlkID0gJ2J1dHRvbi1ncm91cCc7XG5cbi8vICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4vLyAgIHN1Ym1pdEJ1dHRvbi5pZCA9ICdzdWJtaXQtdGFzay1wb3B1cCc7XG4vLyAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYWRkJyk7XG4vLyAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuLy8gICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW5hbWUnKS52YWx1ZTtcbi8vICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG4vLyAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1wcmlvcml0eScpLnZhbHVlO1xuLy8gICAgIGlmICghbmFtZSB8fCAhZGVzY3JpcHRpb24pIHsgcmV0dXJuOyB9XG4vLyAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKG5hbWUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSk7XG4vLyAgICAgaWYgKCFDVVJSX1BST0pFQ1RfSUQpIHtcbi8vICAgICAgIGFsZXJ0KCdTZWxlY3QgYSBwcm9qZWN0IHRvIGFkZCBhIHRhc2suJyk7XG4vLyAgICAgICByZXR1cm47XG4vLyAgICAgfVxuLy8gICAgIFRPRE9fTElTVFtDVVJSX1BST0pFQ1RfSURdWyd0YXNrcyddW3Rhc2suaWRdID0gdGFza1xuLy8gICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShUT0RPX0xJU1QpO1xuLy8gICAgIGFkZFRhc2tUb1Rhc2tMaXN0RWxlbWVudCh0YXNrKTtcbi8vICAgICBjbG9zZVRhc2tQb3B1cEZvcm0oKTtcbi8vICAgfSk7XG5cbi8vICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbi8vICAgY2xvc2VCdXR0b24uaWQgPSAnY2xvc2UtdGFzay1wb3B1cCc7XG4vLyAgIGNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdjbG9zZScpO1xuLy8gICBjbG9zZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdDbG9zZSc7XG4vLyAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuLy8gICAgIGNsb3NlVGFza1BvcHVwRm9ybSgpO1xuLy8gICB9KTtcblxuLy8gICBidXR0b25Hcm91cC5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuLy8gICBidXR0b25Hcm91cC5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbik7XG5cbi8vICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRHcm91cCk7XG4vLyAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkdyb3VwKTtcbiAgXG4vLyAgIHJldHVybiBmb3JtRWxlbWVudDtcbi8vIH1cblxuLy8gLy8gQ2xvc2UgcHJvamVjdCBwb3B1cCBmb3JtXG4vLyBmdW5jdGlvbiBjbG9zZVByb2plY3RQb3B1cEZvcm0oKSB7XG4vLyAgIGlmIChwcm9qZWN0TGlzdEVsZW1lbnQuZmlyc3RDaGlsZCA9PSBudWxsIHx8IHByb2plY3RMaXN0RWxlbWVudC5maXJzdENoaWxkLmlkICE9ICdwcm9qZWN0LXBvcHVwJykgeyByZXR1cm4gfVxuLy8gICBwcm9qZWN0TGlzdEVsZW1lbnQucmVtb3ZlQ2hpbGQocHJvamVjdExpc3RFbGVtZW50LmZpcnN0Q2hpbGQpXG4vLyB9XG5cbi8vIC8vIENsb3NlIHRhc2sgcG9wdXAgZm9ybVxuLy8gZnVuY3Rpb24gY2xvc2VUYXNrUG9wdXBGb3JtKCkge1xuLy8gICBpZiAodGFza0xpc3RFbGVtZW50LmZpcnN0Q2hpbGQgPT0gbnVsbCB8fCB0YXNrTGlzdEVsZW1lbnQuZmlyc3RDaGlsZC5pZCAhPSAndGFzay1wb3B1cCcpIHsgcmV0dXJuIH1cbi8vICAgdGFza0xpc3RFbGVtZW50LnJlbW92ZUNoaWxkKHRhc2tMaXN0RWxlbWVudC5maXJzdENoaWxkKTtcbi8vIH1cblxuLy8gLy8gT3BlbiBwcm9qZWN0IHVwZGF0ZSBwb3B1cCBmb3JtXG4vLyBmdW5jdGlvbiB1cGRhdGVQcm9qZWN0UG9wdXBGb3JtKHByb2plY3RJZCwgcHJvamVjdEVsZW1lbnQpIHtcbi8vICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgZm9ybUVsZW1lbnQuaWQgPSAncHJvamVjdC1wb3B1cCc7XG4vLyAgIGZvcm1FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2l0ZW0nLCAncHJvamVjdCcpO1xuICBcbi8vICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbi8vICAgaW5wdXRFbGVtZW50LnR5cGUgPSAndGV4dCc7XG4vLyAgIGlucHV0RWxlbWVudC5pZCA9ICdwcm9qZWN0LW5hbWUnO1xuLy8gICBpbnB1dEVsZW1lbnQucGxhY2Vob2xkZXIgPSAnUHJvamVjdCBOYW1lJztcblxuLy8gICBjb25zdCBidXR0b25Hcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICBidXR0b25Hcm91cC5pZCA9ICdidXR0b24tZ3JvdXAnO1xuXG4vLyAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuLy8gICBzdWJtaXRCdXR0b24uaWQgPSAnc3VibWl0LXByb2plY3QtcG9wdXAnO1xuLy8gICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2FkZCcpO1xuLy8gICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnVXBkYXRlJztcbi8vICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbi8vICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpLnZhbHVlO1xuLy8gICAgIGlmICghbmFtZSkgeyByZXR1cm4gfVxuLy8gICAgIFRPRE9fTElTVFtwcm9qZWN0SWRdWydwcm9qZWN0J11bJ25hbWUnXSA9IG5hbWU7XG4vLyAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKFRPRE9fTElTVCk7XG4vLyAgICAgdXBkYXRlUHJvamVjdExpc3RFbGVtZW50KCk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4vLyAgIGNsb3NlQnV0dG9uLmlkID0gJ2Nsb3NlLXByb2plY3QtcG9wdXAnO1xuLy8gICBjbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnY2xvc2UnKTtcbi8vICAgY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSAnQ2xvc2UnO1xuLy8gICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4vLyAgICAgY2xvc2VVcGRhdGVQcm9qZWN0UG9wdXBGb3JtKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4vLyAgIH0pO1xuICBcbi8vICAgYnV0dG9uR3JvdXAuYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbi8vICAgYnV0dG9uR3JvdXAuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24pXG5cbi8vICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50KTtcbi8vICAgZm9ybUVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uR3JvdXApO1xuXG4vLyAgIHByb2plY3RMaXN0RWxlbWVudC5pbnNlcnRCZWZvcmUoZm9ybUVsZW1lbnQsIHByb2plY3RFbGVtZW50Lm5leHRTaWJsaW5nKTtcbi8vIH1cblxuLy8gLy8gT3BlbiB0YXNrIHVwZGF0ZSBwb3B1cCBmb3JtXG4vLyBmdW5jdGlvbiB1cGRhdGVUYXNrUG9wdXBGb3JtKHByb2plY3RJZCwgdGFza0lkLCB0YXNrRWxlbWVudCkge1xuLy8gICBjb25zdCB0YXNrID0gVE9ET19MSVNUW3Byb2plY3RJZF1bJ3Rhc2tzJ11bdGFza0lkXTtcblxuLy8gICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICBmb3JtRWxlbWVudC5pZCA9ICd0YXNrLXBvcHVwJztcbi8vICAgZm9ybUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXRlbScsICd0YXNrJyk7XG5cbi8vICAgY29uc3QgaW5wdXRHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICBpbnB1dEdyb3VwLmlkID0gJ2lucHV0LWdyb3VwJztcbiAgXG4vLyAgIGNvbnN0IGlucHV0RWxlbWVudE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuLy8gICBpbnB1dEVsZW1lbnROYW1lLnR5cGUgPSAndGV4dCc7XG4vLyAgIGlucHV0RWxlbWVudE5hbWUuaWQgPSAndGFzay1uYW1lJztcbi8vICAgaW5wdXRFbGVtZW50TmFtZS5wbGFjZWhvbGRlciA9ICdUYXNrIE5hbWUnO1xuLy8gICBpbnB1dEVsZW1lbnROYW1lLnZhbHVlID0gdGFzay5uYW1lO1xuXG4vLyAgIGNvbnN0IGlucHV0RWxlbWVudERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbi8vICAgaW5wdXRFbGVtZW50RGVzY3JpcHRpb24udHlwZSA9ICd0ZXh0Jztcbi8vICAgaW5wdXRFbGVtZW50RGVzY3JpcHRpb24uaWQgPSAndGFzay1kZXNjcmlwdGlvbic7XG4vLyAgIGlucHV0RWxlbWVudERlc2NyaXB0aW9uLnBsYWNlaG9sZGVyID0gJ1Rhc2sgRGVzY3JpcHRpb24nO1xuLy8gICBpbnB1dEVsZW1lbnREZXNjcmlwdGlvbi52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG5cbi8vICAgY29uc3QgaW5wdXRFbGVtZW50UHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbi8vICAgaW5wdXRFbGVtZW50UHJpb3JpdHkuaWQgPSAndGFzay1wcmlvcml0eSc7XG4vLyAgIGNvbnN0IHByaW9yaXR5SGlnaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuLy8gICBwcmlvcml0eUhpZ2gudmFsdWUgPSAnaGlnaCc7XG4vLyAgIHByaW9yaXR5SGlnaC50ZXh0Q29udGVudCA9ICdIaWdoJztcbi8vICAgY29uc3QgcHJpb3JpdHlNZWRpdW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbi8vICAgcHJpb3JpdHlNZWRpdW0udmFsdWUgPSAnbWVkaXVtJztcbi8vICAgcHJpb3JpdHlNZWRpdW0udGV4dENvbnRlbnQgPSAnTWVkaXVtJztcbi8vICAgY29uc3QgcHJpb3JpdHlMb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbi8vICAgcHJpb3JpdHlMb3cudmFsdWUgPSAnbG93Jztcbi8vICAgcHJpb3JpdHlMb3cudGV4dENvbnRlbnQgPSAnTG93Jztcbi8vICAgaW5wdXRFbGVtZW50UHJpb3JpdHkuYXBwZW5kQ2hpbGQocHJpb3JpdHlIaWdoKTtcbi8vICAgaW5wdXRFbGVtZW50UHJpb3JpdHkuYXBwZW5kQ2hpbGQocHJpb3JpdHlNZWRpdW0pO1xuLy8gICBpbnB1dEVsZW1lbnRQcmlvcml0eS5hcHBlbmRDaGlsZChwcmlvcml0eUxvdyk7XG5cbi8vICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnROYW1lKTtcbi8vICAgaW5wdXRHcm91cC5hcHBlbmRDaGlsZChpbnB1dEVsZW1lbnREZXNjcmlwdGlvbik7XG4vLyAgIGlucHV0R3JvdXAuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50UHJpb3JpdHkpXG5cbi8vICAgY29uc3QgYnV0dG9uR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgYnV0dG9uR3JvdXAuaWQgPSAnYnV0dG9uLWdyb3VwJztcblxuLy8gICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbi8vICAgc3VibWl0QnV0dG9uLmlkID0gJ3N1Ym1pdC1wcm9qZWN0LXBvcHVwJztcbi8vICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdhZGQnKTtcbi8vICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ1VwZGF0ZSc7XG4vLyAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4vLyAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW5hbWUnKS52YWx1ZTtcbi8vICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWRlc2NyaXB0aW9uJykudmFsdWU7XG4vLyAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1wcmlvcml0eScpLnZhbHVlO1xuLy8gICAgIGlmICghbmFtZSB8fCAhZGVzY3JpcHRpb24pIHsgcmV0dXJuIH1cbi8vICAgICBUT0RPX0xJU1RbcHJvamVjdElkXVsndGFza3MnXVt0YXNrSWRdWyduYW1lJ10gPSBuYW1lO1xuLy8gICAgIFRPRE9fTElTVFtwcm9qZWN0SWRdWyd0YXNrcyddW3Rhc2tJZF1bJ2Rlc2NyaXB0aW9uJ10gPSBkZXNjcmlwdGlvbjtcbi8vICAgICBUT0RPX0xJU1RbcHJvamVjdElkXVsndGFza3MnXVt0YXNrSWRdWydwcmlvcml0eSddID0gcHJpb3JpdHk7XG4vLyAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKFRPRE9fTElTVCk7XG4vLyAgICAgdXBkYXRlVGFza0xpc3RFbGVtZW50KCk7XG4vLyAgIH0pO1xuXG4vLyAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4vLyAgIGNsb3NlQnV0dG9uLmlkID0gJ2Nsb3NlLXByb2plY3QtcG9wdXAnO1xuLy8gICBjbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnY2xvc2UnKTtcbi8vICAgY2xvc2VCdXR0b24udGV4dENvbnRlbnQgPSAnQ2xvc2UnO1xuLy8gICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4vLyAgICAgY2xvc2VVcGRhdGVUYXNrUG9wdXBGb3JtKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4vLyAgIH0pO1xuXG4vLyAgIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4vLyAgIGJ1dHRvbkdyb3VwLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKVxuXG4vLyAgIGZvcm1FbGVtZW50LmFwcGVuZENoaWxkKGlucHV0R3JvdXApO1xuLy8gICBmb3JtRWxlbWVudC5hcHBlbmRDaGlsZChidXR0b25Hcm91cCk7XG5cbi8vICAgdGFza0xpc3RFbGVtZW50Lmluc2VydEJlZm9yZShmb3JtRWxlbWVudCwgdGFza0VsZW1lbnQubmV4dFNpYmxpbmcpO1xuLy8gfVxuXG4vLyAvLyBDbG9zZSBwcm9qZWN0IHVwZGF0ZSBwb3B1cCBmb3JtXG4vLyBmdW5jdGlvbiBjbG9zZVVwZGF0ZVByb2plY3RQb3B1cEZvcm0ocG9wdXBFbGVtZW50KSB7XG4vLyAgIHByb2plY3RMaXN0RWxlbWVudC5yZW1vdmVDaGlsZChwb3B1cEVsZW1lbnQpO1xuLy8gfVxuXG4vLyAvLyBDbG9zZSB0YXNrIHVwZGF0ZSBwb3B1cCBmb3JtXG4vLyBmdW5jdGlvbiBjbG9zZVVwZGF0ZVRhc2tQb3B1cEZvcm0ocG9wdXBFbGVtZW50KSB7XG4vLyAgIHRhc2tMaXN0RWxlbWVudC5yZW1vdmVDaGlsZChwb3B1cEVsZW1lbnQpO1xuLy8gfVxuXG4vLyAvLyBHZXQgcHJvamVjdCBpdGVtIGNhcmRcbi8vIGZ1bmN0aW9uIGdldFByb2plY3RJdGVtQ2FyZChwcm9qZWN0KSB7XG4vLyAgIGNvbnN0IGNhcmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2l0ZW0nLCAncHJvamVjdCcpO1xuLy8gICBjYXJkRWxlbWVudC5kYXRhc2V0LmtleSA9IHByb2plY3QuaWQ7XG5cbi8vICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbi8vICAgbmFtZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcblxuLy8gICBjb25zdCBvcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIFxuLy8gICBvcHRpb25zLmNsYXNzTGlzdC5hZGQoJ2l0ZW0nLCAnb3B0aW9ucycpO1xuLy8gICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4vLyAgIGVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZWRpdC1wcm9qZWN0Jyk7XG4vLyAgIGNvbnN0IGVkaXRCdXR0b25JbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuLy8gICBlZGl0QnV0dG9uSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL2VkaXQtaWNvbi5wbmcnO1xuLy8gICBlZGl0QnV0dG9uLmFwcGVuZENoaWxkKGVkaXRCdXR0b25JbWFnZSk7XG4vLyAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuLy8gICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuLy8gICAgIGNvbnN0IHBhcmVudERpdiA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuLy8gICAgIGlmIChwYXJlbnREaXYubmV4dFNpYmxpbmcgJiYgcGFyZW50RGl2Lm5leHRTaWJsaW5nLmlkID09PSAncHJvamVjdC1wb3B1cCcpIHsgcmV0dXJuOyB9XG4vLyAgICAgY29uc3QgcHJvamVjdElkID0gcGFyZW50RGl2LmRhdGFzZXQua2V5O1xuLy8gICAgIHVwZGF0ZVByb2plY3RQb3B1cEZvcm0ocHJvamVjdElkLCBwYXJlbnREaXYpO1xuLy8gICB9KTtcbiAgXG4vLyAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuLy8gICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLXByb2plY3QnKTtcbi8vICAgY29uc3QgZGVsZXRlQnV0dG9uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbi8vICAgZGVsZXRlQnV0dG9uSW1hZ2Uuc3JjID0gJy4vaW1hZ2VzL2RlbGV0ZS1pY29uLTMucG5nJztcbi8vICAgZGVsZXRlQnV0dG9uLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbkltYWdlKTtcbi8vICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbi8vICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbi8vICAgICBjb25zdCBwcm9qZWN0SWQgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmtleTtcbi8vICAgICBkZWxldGUgVE9ET19MSVNUW3Byb2plY3RJZF07XG4vLyAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKFRPRE9fTElTVCk7XG4vLyAgICAgdXBkYXRlUHJvamVjdExpc3RFbGVtZW50KCk7XG4vLyAgIH0pO1xuXG4vLyAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4vLyAgIG9wdGlvbnMuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcbiAgXG4vLyAgIGNhcmRFbGVtZW50LmFwcGVuZENoaWxkKG5hbWUpO1xuLy8gICBjYXJkRWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb25zKTtcblxuLy8gICBjYXJkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4vLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLml0ZW0ucHJvamVjdCcpLmZvckVhY2goKGl0ZW0pID0+IHtcbi8vICAgICAgIGlmIChpdGVtICE9IGUudGFyZ2V0KSB7XG4vLyAgICAgICAgIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucygnY2xpY2tlZCcpKSB7XG4vLyAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjbGlja2VkJyk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cbi8vICAgICB9KVxuLy8gICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NsaWNrZWQnKSkge1xuLy8gICAgICAgQ1VSUl9QUk9KRUNUX0lEID0gJyc7XG4vLyAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjbGlja2VkJyk7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIENVUlJfUFJPSkVDVF9JRCA9IGUudGFyZ2V0LmRhdGFzZXQua2V5O1xuLy8gICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnY2xpY2tlZCcpO1xuLy8gICAgIH1cbi8vICAgICB1cGRhdGVUYXNrTGlzdEVsZW1lbnQoKTtcbi8vICAgfSk7XG5cbi8vICAgcmV0dXJuIGNhcmRFbGVtZW50O1xuLy8gfVxuXG4vLyAvLyBHZXQgdGFzayBpdGVtIGNhcmRcbi8vIGZ1bmN0aW9uIGdldFRhc2tJdGVtQ2FyZCh0YXNrKSB7XG4vLyAgIGNvbnN0IGNhcmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgIGNhcmRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2l0ZW0nLCAndGFzaycpO1xuLy8gICBjYXJkRWxlbWVudC5kYXRhc2V0LmtleSA9IHRhc2suaWQ7XG4vLyAgIGNhcmRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGB2YXIoLS1wcmlvcml0eS0ke3Rhc2sucHJpb3JpdHl9KWA7XG5cbi8vICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuLy8gICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgXG4vLyAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdpdGVtJywgJ2NvbnRlbnQnKTtcbi8vICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4vLyAgIHRpdGxlLnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuLy8gICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbi8vICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24nKTtcbi8vICAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xuLy8gICBjb250ZW50LmFwcGVuZENoaWxkKHRpdGxlKTtcbi8vICAgY29udGVudC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbi8vICAgY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICBvcHRpb25zLmNsYXNzTGlzdC5hZGQoJ2l0ZW0nLCAnb3B0aW9ucycpO1xuXG4vLyAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbi8vICAgZWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbi8vICAgZWRpdEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgdmFyKC0tcHJpb3JpdHktJHt0YXNrLnByaW9yaXR5fSlgO1xuLy8gICBjb25zdCBlZGl0QnV0dG9uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbi8vICAgZWRpdEJ1dHRvbkltYWdlLnNyYyA9ICcuL2ltYWdlcy9lZGl0LWljb24ucG5nJztcbi8vICAgZWRpdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uSW1hZ2UpO1xuLy8gICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbi8vICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbi8vICAgICBjb25zdCBwYXJlbnREaXYgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbi8vICAgICBpZiAocGFyZW50RGl2Lm5leHRTaWJsaW5nICYmIHBhcmVudERpdi5uZXh0U2libGluZy5pZCA9PT0gJ3Rhc2stcG9wdXAnKSB7IHJldHVybjsgfVxuLy8gICAgIGNvbnN0IHRhc2tJZCA9IHBhcmVudERpdi5kYXRhc2V0LmtleTtcbi8vICAgICB1cGRhdGVUYXNrUG9wdXBGb3JtKENVUlJfUFJPSkVDVF9JRCwgdGFza0lkLCBwYXJlbnREaXYpO1xuLy8gICB9KTtcblxuLy8gICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbi8vICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS10YXNrJyk7XG4vLyAgIGRlbGV0ZUJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgdmFyKC0tcHJpb3JpdHktJHt0YXNrLnByaW9yaXR5fSlgO1xuLy8gICBjb25zdCBkZWxldGVCdXR0b25JbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuLy8gICBkZWxldGVCdXR0b25JbWFnZS5zcmMgPSAnLi9pbWFnZXMvZGVsZXRlLWljb24tMy5wbmcnO1xuLy8gICBkZWxldGVCdXR0b24uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uSW1hZ2UpO1xuLy8gICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuLy8gICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuLy8gICAgIGNvbnN0IHBhcmVudERpdiA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuLy8gICAgIGNvbnN0IHRhc2tJZCA9IHBhcmVudERpdi5kYXRhc2V0LmtleTtcbi8vICAgICBkZWxldGUgVE9ET19MSVNUW0NVUlJfUFJPSkVDVF9JRF1bJ3Rhc2tzJ11bdGFza0lkXTtcbi8vICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoVE9ET19MSVNUKTtcbi8vICAgICB1cGRhdGVUYXNrTGlzdEVsZW1lbnQoKTtcbi8vICAgfSk7XG5cbi8vICAgb3B0aW9ucy5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbi8vICAgb3B0aW9ucy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG4vLyAgIGNhcmRFbGVtZW50LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbi8vICAgY2FyZEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4vLyAgIGNhcmRFbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbnMpO1xuXG4vLyAgIHJldHVybiBjYXJkRWxlbWVudDtcbi8vIH1cblxuLy8gLy8gQWRkIHByb2plY3QgY2FyZCB0byB0aGUgcHJvamVjdCBsaXN0IGRpdlxuLy8gZnVuY3Rpb24gYWRkUHJvamVjdFRvUHJvamVjdExpc3RFbGVtZW50KHByb2plY3QpIHtcbi8vICAgcHJvamVjdExpc3RFbGVtZW50LmFwcGVuZENoaWxkKGdldFByb2plY3RJdGVtQ2FyZChwcm9qZWN0KSk7XG4vLyB9XG5cbi8vIC8vIEFkZCB0YXNrIGNhcmQgdG8gdGhlIHRhc2sgbGlzdCBkaXZcbi8vIGZ1bmN0aW9uIGFkZFRhc2tUb1Rhc2tMaXN0RWxlbWVudCh0YXNrKSB7XG4vLyAgIHRhc2tMaXN0RWxlbWVudC5hcHBlbmRDaGlsZChnZXRUYXNrSXRlbUNhcmQodGFzaykpO1xuLy8gfVxuXG4vLyAvLyBVcGRhdGUgdGhlIHByb2plY3QgbGlzdCBkaXYgd2l0aCBuZXcgcHJvamVjdHNcbi8vIGZ1bmN0aW9uIHVwZGF0ZVByb2plY3RMaXN0RWxlbWVudCgpIHtcbi8vICAgcHJvamVjdExpc3RFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4vLyAgIGZvciAobGV0IHByb2plY3RJZCBvZiBPYmplY3Qua2V5cyhUT0RPX0xJU1QpKSB7XG4vLyAgICAgY29uc3QgcHJvamVjdCA9IFRPRE9fTElTVFtwcm9qZWN0SWRdWydwcm9qZWN0J107XG4vLyAgICAgYWRkUHJvamVjdFRvUHJvamVjdExpc3RFbGVtZW50KHByb2plY3QpO1xuLy8gICB9XG4vLyB9XG5cbi8vIC8vIFVwZGF0ZSB0aGUgdGFzayBsaXN0IGRpdiB3aXRoIG5ldyB0YXNrc1xuLy8gZnVuY3Rpb24gdXBkYXRlVGFza0xpc3RFbGVtZW50KCkge1xuLy8gICB0YXNrTGlzdEVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbi8vICAgaWYgKENVUlJfUFJPSkVDVF9JRCkge1xuLy8gICAgIGZvciAobGV0IHRhc2tJZCBvZiBPYmplY3Qua2V5cyhUT0RPX0xJU1RbQ1VSUl9QUk9KRUNUX0lEXVsndGFza3MnXSkpIHtcbi8vICAgICAgIGNvbnN0IHRhc2sgPSBUT0RPX0xJU1RbQ1VSUl9QUk9KRUNUX0lEXVsndGFza3MnXVt0YXNrSWRdO1xuLy8gICAgICAgYWRkVGFza1RvVGFza0xpc3RFbGVtZW50KHRhc2spO1xuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG4vLyAvLyBVcGRhdGUgVUlcbi8vIGZ1bmN0aW9uIHVwZGF0ZVVJKCkge1xuLy8gICB1cGRhdGVQcm9qZWN0TGlzdEVsZW1lbnQoKTtcbi8vICAgdXBkYXRlVGFza0xpc3RFbGVtZW50KCk7XG4vLyB9XG5cbi8vIGFkZFByb2plY3RQb3B1cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qcm9qZWN0UG9wdXBGb3JtKTtcblxuLy8gYWRkVGFza1BvcHVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblRhc2tQb3B1cEZvcm0pO1xuXG4vLyB1cGRhdGVQcm9qZWN0TGlzdEVsZW1lbnQoKTtcbi8vIHVwZGF0ZVRhc2tMaXN0RWxlbWVudCgpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCAoKSA9PiB7XG4gIFVJLnVwZGF0ZSgpO1xufSk7XG5cblVJLnVwZGF0ZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9