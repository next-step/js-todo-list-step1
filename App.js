const App = () => {
  let data = {
    inputDatas: ["1", "2", "3", "4"],
    tempVal: [1, 2, 3, 4],
  };
  let todoList;
  let input;

  const init = () => {
    todoList = document.querySelector(".todo-list");
    input = document.querySelector(".new-todo");

    input.addEventListener("keypress", handleKeypress);
    render();
  };

  const setState = (nextData) => {
    data = nextData;
    render();
  };

  const render = () => {
    todoList.innerHTML = data.inputDatas
      .map((inputData) => {
        return `<li class="item">
                    <div class="view">
                      <input class="toggle" type="checkbox"/>
                      <label class="label">${inputData}</label>
                      <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${inputData}" />
                </li>`;
      })
      .join(" ");

    document.querySelectorAll('.item').forEach((item)=>{
      item.addEventListener('click',(e)=>{
        if(e.target.className === 'toggle'){
          if(e.target.checked === true){
            e.target.closest('li').classList.add('completed');
          } else {
            e.target.closest('li').classList.remove('completed');
          }
        }
      })
    })
  };

  const handleKeypress = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      const { inputDatas } = data;
      setState({ inputDatas: [...inputDatas, event.target.value] });
      event.target.value = "";
    }
  };

  return { init };
};
export default App;
