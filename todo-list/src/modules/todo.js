if (window.localStorage.getItem("todo") == null) {
  window.localStorage.setItem("todo", JSON.stringify({}));
}

export default class TodoDS {
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
