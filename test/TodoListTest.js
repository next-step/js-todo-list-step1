import TodoList from "../js/TodoList.js";

describe("TodoList", () => {
  const $target = document.querySelector("#todo-list");
  const data = [
    {
      id: 1,
      content: "새로운 타이틀",
      isCompleted: false,
    },
    {
      id: 2,
      content: "완료된 타이틀",
      isCompleted: true,
    },
    {
      id: 3,
      content: "완료된 타이틀",
      isCompleted: true,
    },
  ];
  const params = {
    $target,
    data,
    onToggle: (id) => {
      console.log(id);
    },
    onRemove: (id) => {
      console.log("remove", id);
    },
    onModify: (id, content) => {
      console.log("onModify", id, content);
    },
  };

  it("객체로 생성되지 않으면 예외를 던진다", () => {
    expect(() => {
      const todoList = TodoList(params);
    }).toThrow();
  });

  it("생성시 인자가 하나라도 누락되었거나 타입이 잘못되면 예외를 던진다", () => {
    const onToggle = () => {};
    const onRemove = () => {};
    const onModify = () => {};

    const badParameters = [
      "params",
      {},
      { $target },
      { data },
      { $target: null, data },
      { $target: undefined, data },
      { $target: $target, data: "Should be Array" },
      { $target, data },
      { $target, data, onToggle, onRemove },
      { $target, data, onToggle, onModify },
      { $target, data, onRemove, onModify },
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

  it("체크 박스 클릭시 onToggle(id) 실행.", () => {
    const todoList = new TodoList(params);
    spyOn(todoList, "onToggle");
    const $toggle = $target.querySelector(".toggle");
    let id;
    $toggle.addEventListener("click", (e) => {
      id = e.target.closest("li").dataset.id;
    });
    $toggle.click();

    expect(todoList.onToggle).toHaveBeenCalledWith(Number(id));
  });

  it("삭제 버튼 클릭시 onRemove(id) 실행.", () => {
    const todoList = new TodoList(params);
    spyOn(todoList, "onRemove");
    const $remove = $target.querySelector(".destroy");
    let id;
    $remove.addEventListener("click", (e) => {
      id = e.target.closest("li").dataset.id;
    });
    $remove.click();

    expect(todoList.onRemove).toHaveBeenCalledWith(Number(id));
  });

  describe("onFocus", () => {
    let todoList, $label, $edit, dblclick;

    beforeEach(() => {
      todoList = new TodoList(params);
      spyOn(todoList, "onFocus");
      $label = $target.querySelector(".label");
      $edit;
      $label.addEventListener("dblclick", (e) => {
        $edit = e.target.closest("li");
      });

      dblclick = document.createEvent("MouseEvents");
      dblclick.initEvent("dblclick", true, true);
      $label.dispatchEvent(dblclick);
    });

    it("label 더블 클릭시 onFocus($edit) 실행.", () => {
      expect(todoList.onFocus).toHaveBeenCalledWith($edit);
    });

    it("수정 완료전 ESC 키 입력시 editing 클래스 제거", () => {
      const $onEdit = $target.querySelector(".edit");

      const keyDown = document.createEvent("Events");
      keyDown.initEvent("keydown", true, true);
      keyDown.key = "Escape";
      $onEdit.dispatchEvent(keyDown);

      const editing = $edit.classList.contains("editing");
      expect(editing).toBe(false);
    });

    it("수정 완료 후 Enter 입력 시 onModify 실행", () => {
      spyOn(todoList, "onModify");

      let id, content;

      $target.addEventListener("keydown", (e) => {
        if (e.target.classList.contains("edit")) {
          id = e.target.closest("li").dataset.id;
          if (e.key === "Enter") {
            content = e.target.value;
          }
        }
      });

      const keyDown = document.createEvent("Events");
      keyDown.initEvent("keydown", true, true);
      keyDown.key = "Enter";

      const $onEdit = $target.querySelector(".edit");
      $onEdit.dispatchEvent(keyDown);

      expect(todoList.onModify).toHaveBeenCalledWith(id, content);
    });
  });

  describe("setState", () => {
    it("기존의 data를 인자로 받은 nextData로 바꿔준다.", () => {
      const todoList = new TodoList(params);
      const nextData = [
        {
          content: "nextData",
          isCompleted: false,
        },
      ];
      todoList.setState(nextData);
      expect(todoList.data).toBe(nextData);
    });

    it("setState 실행 후 render함수가 실행 된다.", () => {
      const todoList = new TodoList(params);
      spyOn(todoList, "render");
      const nextData = [
        {
          content: "nextData",
          isCompleted: false,
        },
      ];
      todoList.setState(nextData);
      expect(todoList.render).toHaveBeenCalled();
    });
  });
});
