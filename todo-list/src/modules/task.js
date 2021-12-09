import format from 'date-fns/format';
import { v4 as uuidv4 } from 'uuid';
import TodoDS from './todo';

class Task {
  constructor(name, description, dueDate, priority) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.createdDate = format(new Date(), 'yyyy-MM-dd');
  }
}

export default class TaskList {
  static _taskListElement = document.querySelector('.items.task');
  static get taskListElement() {
    return TaskList._taskListElement;
  }
  static set taskListElement(value) {
    TaskList._taskListElement = value;
  }

  static addTask(projectId, task) {
    const todo = TodoDS.getTodo();
    todo[projectId]['tasks'][task.id] = task;
    TodoDS.updateTodo(todo);
  }

  static removeTask(projectId, taskId) {
    const todo = TodoDS.getTodo();
    delete todo[projectId]['tasks'][taskId];
    TodoDS.updateTodo(todo);
  }

  static updateTask(projectId, taskId, name, description, dueDate, priority) {
    const todo = TodoDS.getTodo();
    todo[projectId]['tasks'][taskId]['name'] = name;
    todo[projectId]['tasks'][taskId]['description'] = description;
    todo[projectId]['tasks'][taskId]['dueDate'] = dueDate;
    todo[projectId]['tasks'][taskId]['priority'] = priority;
    TodoDS.updateTodo(todo);
  }

  static getTask(projectId, taskId) {
    const todo = TodoDS.getTodo();
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
    const title = document.createElement('h3');
    title.textContent = task.name;
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = task.description;
    content.appendChild(title);
    content.appendChild(description);

    const other = document.createElement('div');
    other.classList.add('item', 'other');
    const createdDate = document.createElement('p');
    createdDate.innerHTML = `<b>Created:</b> ${task.createdDate}`;
    other.appendChild(createdDate);
    const dueDate = document.createElement('p');
    dueDate.innerHTML = `<b>Due:</b> ${task.dueDate}`;
    other.appendChild(createdDate);
    other.appendChild(dueDate);

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
      this.openUpdatePopupForm(TodoDS.getProjectId(), taskId, parentDiv)
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
      console.log(taskId);
      this.removeTask(TodoDS.getProjectId(), taskId);
      console.log(TodoDS.getTodo()[TodoDS.getProjectId()]['tasks']);
      this.updateItemList(TodoDS.getProjectId());
    });

    options.appendChild(editButton);
    options.appendChild(deleteButton);

    cardElement.appendChild(checkbox);
    cardElement.appendChild(content);
    cardElement.appendChild(other);
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

    const inputElementDate = document.createElement('input');
    inputElementDate.type = 'date';
    inputElementDate.id = 'task-due-date';
    inputElementDate.placeholder = 'Task Due Date';

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
    inputGroup.appendChild(inputElementDate);
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
      const dueDate = document.getElementById('task-due-date').value;
      const priority = document.getElementById('task-priority').value;
      console.log(dueDate);
      if (!name || !description || !dueDate) { return; }
      const task = new Task(name, description, dueDate, priority);
      this.addTask(TodoDS.getProjectId(), task)
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

    const inputElementDate = document.createElement('input');
    inputElementDate.type = 'date';
    inputElementDate.id = 'task-due-date';
    inputElementDate.placeholder = 'Task Due Date';
    inputElementDate.value = task.dueDate;

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
    inputGroup.appendChild(inputElementDate);
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
      const dueDate = document.getElementById('task-due-date').value;
      const priority = document.getElementById('task-priority').value;
      if (!name || !description || !dueDate) { return }
      this.updateTask(projectId, taskId, name, description, dueDate, priority)
      this.updateItemList(TodoDS.getProjectId());
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
    this.taskListElement.removeChild(popupElement);
  }

  static addToItemList(task) {
    this.taskListElement.appendChild(this.getItemCard(task));
  }

  static updateItemList(projectId) {
    this.taskListElement.textContent = '';
    if (projectId) {
      const todo = TodoDS.getTodo();
      for (let taskId of Object.keys(todo[projectId]['tasks'])) {
        const task = todo[projectId]['tasks'][taskId];
        this.addToItemList(task);
      }
    }
  }
}
