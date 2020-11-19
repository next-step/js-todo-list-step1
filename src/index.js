import TodoModel from './js/TodoModel'
import TodoView from './js/TodoView'
import TodoController from './js/TodoController'

const View = new TodoView()
const Controller = new TodoController(TodoModel, View)

Controller.init()
