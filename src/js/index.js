import App from './components/App.js';
import { CLASS } from './utils/constant.js'; 

try{
    window.addEventListener('load',()=>{
        App(document.getElementsByClassName(CLASS.TODOAPP));
    });
}catch(error){
    throw error;
}