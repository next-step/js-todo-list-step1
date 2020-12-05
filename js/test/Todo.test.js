const Task = require('../components/task');
const Folder = require('../components/list');
const App = require('../components/app');

test('Task', () => {
  const todo = new Task('일하기');

  expect(todo.getInfo()).toEqual({'title' : '일하기', 'isCompleted' : false});
  todo.toggle();
  expect(todo.getInfo()).toEqual({'title' : '일하기', 'isCompleted' : true});
});

test('Folder', () => {
  const task = new Task('task1');
  const task2 = new Task('task1');
  const folder = new Folder('folder1');
  expect(folder.getTasks()).toEqual([]);
  folder.addTask(task);
  expect(folder.getTasks().length).toEqual(1);
  folder.addTask(task2);
  expect(folder.getTasks()).not.toEqual({});
  folder.removeTask(task2)
  expect(folder.getTasks().length).toEqual(1);
})

test('App', () => {
  const task = new Task('task1');
  const task2 = new Task('task1');
  const folder = new Folder('folder1');
  const app = new App();
  expect(app.getFolders().length).toEqual(0);
  folder.addTask(task);
  app.addFolder(folder);
  expect(app.getFolders().length).not.toEqual(0);
  expect(app.getFolders()[0].getTasks()[0].title).toEqual('task1')
  app.addFolder(folder);
  expect(app.getFolders().length).toEqual(1);
})
