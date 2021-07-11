export class ToDoInput {
    state; 
    $target;
    props;
    constructor(target,props){
        this.$target = target;
        this.props = props;
        this.state = {
            toDoItem : ""
        }
        this.initEventListener();
    }
  
    render () {
  
    }
  
    initEventListener () {
        this.$target.addEventListener('input',({target})=>{
            this.setState({toDoItem: target.value})
        })
        this.$target.addEventListener('keydown',({key,target})=>{
            if(key === "Enter") {
                this.props.addToDoItem(this.state.toDoItem);
                this.reset();
            };
        })
    }
  
    setState (payload) {
        this.state={...this.state,...payload}
    }
    reset(){
        this.setState({toDoItem:""});
        this.$target.value = "";
    }
}