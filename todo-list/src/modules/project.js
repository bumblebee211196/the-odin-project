import { v4 as uuidv4 } from 'uuid';
import TaskList from './task';
import TodoDS from './todo';

class Project {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
  }
}

export default class ProjectList {
  static projectListElement = document.querySelector('.items.project');

  static addProject(project) {
    const todo = TodoDS.getTodo();
    todo[project.id] = { 'project': project, 'tasks': {} };
    TodoDS.updateTodo(todo);
  }

  static removeProject(projectId) {
    const todo = TodoDS.getTodo();
    delete todo[projectId];
    TodoDS.updateTodo(todo);
  }

  static updateProject(projectId, name) {
    const todo = TodoDS.getTodo();
    todo[projectId]['project']['name'] = name;
    TodoDS.updateTodo(todo);
  }

  static getProject(projectId) {
    const todo = TodoDS.getTodo();
    return todo[projectId]['project'];
  }

  static getItemCard(project) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('item', 'project');
    cardElement.dataset.key = project.id;

    const name = document.createElement('h3');
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
      TodoDS.setProjectId('');
      this.updateItemList();
      TaskList.updateItemList(TodoDS.getProjectId());
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
        TodoDS.setProjectId('');
        e.target.classList.remove('clicked');
      } else {
        TodoDS.setProjectId(e.target.dataset.key);
        e.target.classList.add('clicked');
      }
      TaskList.updateItemList(TodoDS.getProjectId());
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
      this.addToItemList(project);
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
      this.addToItemList(project);
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

  static addToItemList(project) {
    this.projectListElement.appendChild(this.getItemCard(project));
  }

  static updateItemList() {
    this.projectListElement.textContent = '';
    const todo = TodoDS.getTodo()
    for (let projectId of Object.keys(todo)) {
      this.addToItemList(todo[projectId]['project']);
    }
  }
}
