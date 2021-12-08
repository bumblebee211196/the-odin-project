import UI from "./modules/ui";

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
  UI.update();
});

UI.update();
