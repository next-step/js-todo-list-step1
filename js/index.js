import Model from './Model'
import View from './View'
import Controller from './Controller'

const VIEW = new View()
const CONTROLLER = new Controller(Model, VIEW)

CONTROLLER.init()
