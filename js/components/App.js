import { checkTarget } from "../utils/validator.js";
import { KEY } from "../utils/constant.js";
import { fetchTodos } from "../domain/todoService.js";

class App {
    constructor($target) {

        checkTarget($target)
        this.$target = $target;
        this.state = fetchTodos(KEY)
        
    }
}

export default App;