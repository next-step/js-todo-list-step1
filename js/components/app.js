import Folder from './list.js';
const App = class extends Set{
  constructor () {
    super();
  }
  static load(json){
    const app = new App();
    json.forEach(f=>{
      app.addFolder(Folder.load(f));
    });
    return app
  }

  toJSON(){
    return this.getFolders();
  }

  addFolder(folder){
    if(!folder instanceof Folder) return console.log('invalid folder');
    super.add(folder);
  }

  removeFolder(folder){
    if(!folder instanceof Folder) return console.log('invalid folder');
    super.delete(folder);
  }

  getFolders(){
    return [...super.values()];
  }
  add(){};
  delete(){};
  clear(){};
  values(){};
}

export default App;
