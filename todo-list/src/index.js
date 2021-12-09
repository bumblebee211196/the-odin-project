import UI from './modules/ui'

document.addEventListener('storage', () => {
  UI.update()
})

UI.update()
