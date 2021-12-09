import ProjectList from './project'
import TaskList from './task'
import TodoDS from './todo'

const openProjectPopupButton = document.getElementById('open-project-popup')
const openTaskPopupButton = document.getElementById('open-task-popup')

export default class UI {
  static addProject () {
    ProjectList.openPopupForm()
  }

  static addTask () {
    TaskList.openPopupForm()
  }

  static update () {
    ProjectList.updateItemList()
    TaskList.updateItemList()
  }
}

openProjectPopupButton.addEventListener('click', () => {
  UI.addProject()
})

openTaskPopupButton.addEventListener('click', () => {
  if (!TodoDS.getProjectId()) {
    alert('Select/Create a project to add a task.')
    return
  }
  UI.addTask()
})
