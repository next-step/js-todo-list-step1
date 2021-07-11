import Component from "../core/component.js";

class Input extends Component{
    setEvent(){
        const onAddTodo = this.$props;
        this.$target.addEventListener('keyup',(e)=>{
            if(e.key=="Enter"){
                const content = this.$target.value;
                onAddTodo(content);
            }
        });
    }
}

export default Input;