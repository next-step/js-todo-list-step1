import TodoList from "../js/TodoList.js";

describe("TodoList", () => {
  const $target = document.querySelector("body");
  const data = [
    {
      content: "새로운 타이틀",
      isCompleted: false,
    },
    {
      content: "완료된 타이틀",
      isCompleted: true,
    },
    {
      content: "완료된 타이틀",
      isCompleted: true,
    },
  ];
  const params = {
    $target,
    data,
  };

  it("객체로 생성되지 않으면 예외를 던진다", () => {
    expect(() => {
      const todoList = TodoList(params);
    }).toThrow();
  });

  it("생성시 인자가 하나라도 누락되었거나 타입이 잘못되면 예외를 던진다", () => {
    const badParameters = [
      "params",
      {},
      { $target },
      { data },
      { $target: null, data },
      { $target: undefined, data },
      { $target: $target, data: "Should be Array" },
    ];

    badParameters.forEach((params) => {
      expect(() => {
        const todoList = new TodoList(params);
      }).toThrow();
    });
  });

  it("data에 잘못된 todo가 있으면 예외를 발생시킨다.", () => {
    const badTodos = [
      {},
      { content: 1 },
      { content: null },
      { content: undefined },
      { content: "", isCompleted: true },
      { content: "test", isCompleted: "false" },
      { content: "test", isCompleted: null },
      { content: "test", isCompleted: undefined },
    ];

    expect(() => new TodoList({ $target, data: badTodos })).toThrow();
  });
});
