import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";

export default function TodoApp(params) {
  const { $targetTodoList, $targetTodoInput, $targetTodoCount } = params;
  this.data = params.data;

  const onToggle = (id) => {
    const nextData = this.data.map((todo, index) =>
      index == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    this.setState(nextData);
  };

  const onRemove = (id) => {
    const nextData = this.data.filter((todo, index) => index != id);
    this.setState(nextData);
  };

  const onModify = (id, nextContent) => {
    const nextData = this.data.map((todo, index) =>
      index == id ? { ...todo, content: nextContent } : todo
    );
    this.setState(nextData);
  };

  const onKeyEnter = (content) => {
    const nextData = this.data.concat({ content, isCompleted: false });
    this.setState(nextData);
  };

  this.todoInput = new TodoInput({
    $target: $targetTodoInput,
    onKeyEnter,
  });

  this.todoList = new TodoList({
    $target: $targetTodoList,
    data: this.data,
    onToggle,
    onRemove,
    onModify,
  });

  this.todoCount = new TodoCount({
    $target: $targetTodoCount,
    count: this.data.length,
  });

  this.setState = (nextData) => {
    this.data = nextData;
    this.todoList.setState(this.data);
    this.todoCount.setState(this.data.length);
    this.render();
  };

  this.render = () => {
    this.todoList.render();
    this.todoCount.render();
  };
}
