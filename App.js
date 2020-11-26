const App = () => {
  let data = {
    inputDatas: ["1", "2", "3", "4"],
    tempVal: [1, 2, 3, 4],
  };
  let todoList;
  let input;
  // 초기화
  const init = () => {
    todoList = document.querySelector(".todo-list");
    input = document.querySelector(".new-todo");

    input.addEventListener("keypress", handleKeypress);
    render();
  };
  // 데이터의 상태 변경
  const setState = (nextData) => {
    data = nextData;
    render();
  };
  // 화면 렌더
  const render = () => {
    todoList.innerHTML = data.inputDatas
      .map((inputData) => {
        return `<li>
                    <div class="view">
                      <input class="toggle" type="checkbox"/>
                      <label class="label">${inputData}</label>
                      <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${inputData}" />
                </li>`;
      })
      .join(" ");
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
