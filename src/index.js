import Model from './js/Model'
import View from './js/View'
import Controller from './js/Controller'

const VIEW = new View()
const CONTROLLER = new Controller(Model, VIEW)

CONTROLLER.init()
