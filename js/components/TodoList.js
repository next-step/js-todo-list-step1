const ContentWrapper = ({ id, content, isCompleted }) => {
  const checked = isCompleted ? 'checked' : '';
  return `<div class="view">
    <input class="toggle" type="checkbox" name="${id}" ${checked}/>
    <label for="${id}">${content}</label>
    <button class="destroy" name="${id}"></button>
  </div>`;
};

const EditInput = ({ id, content }) => {
  return `<input class="edit" name="${id}" value="${content}" autofocus/>`;
};

export const Item = props => {
  const { content, isCompleted, editing } = props;
  const completed = isCompleted ? 'completed' : '';
  const edit = editing ? 'editing' : '';
  return {
    content,
    isCompleted,
    editing,
    template: `<li class="${completed} ${edit}">${ContentWrapper(props)}${EditInput(props)}</li>`
  };
};

export class TodoList {
  constructor(props) {
    const { $element, items, onClickToggle, onClickDestroy, onToggleEdit } = props;
    this.$element = $element;
    this.todoItems = items;
    this.isEditing = -1; // 현재 편집 중인 아이템의 id 저장

    this.render();

    const handleFinishEdit = save => {
      onToggleEdit(
        this.isEditing,
        save ? document.getElementsByClassName('edit')[this.isEditing].value : '',
        false
      );
      this.isEditing = -1;
    };

    // 편집 중인 아이템 외의 기능 선택 시 편집 완료
    window.addEventListener(
      'click', // autofocus가 실행되지 않아 blur 이벤트 대신 사용 중
      e => {
        if (this.isEditing !== -1 && e.target.className !== 'edit') {
          e.stopPropagation();
          handleFinishEdit(true);
          return;
        }
      },
      true
    );

    // 마우스 클릭 이벤트
    this.$element.addEventListener('click', e => {
      // 아이템 완료/미완료 선택
      if (e.target.nodeName === 'INPUT' && e.target.className === 'toggle') {
        onClickToggle(e.target.name);
        return;
      }

      // 아이템 삭제
      if (e.target.nodeName === 'BUTTON' && e.target.className === 'destroy') {
        onClickDestroy(e.target.name);
        return;
      }
    });

    // 마우스 더블 클릭 이벤트
    this.$element.addEventListener('dblclick', e => {
      // 아이템 편집
      if (e.target.nodeName === 'LABEL') {
        const editId = e.target.htmlFor;
        this.isEditing = editId;
        onToggleEdit(editId, '', true);
      }
    });

    // 키보드 입력 이벤트
    // autofocus가 실행되지 않아 input에 focus 안 되어 window 이벤트로 등록
    window.addEventListener('keydown', e => {
      if (this.isEditing !== -1) {
        if (e.key === 'Escape') {
          handleFinishEdit(false);
          return;
        }

        if (e.key === 'Enter') {
          handleFinishEdit(true);
          return;
        }
      }
    });
  }

  render() {
    this.$element.innerHTML = `${this.todoItems.map(item => item.template).join('')}`;
  }

  setState(newItems) {
    this.todoItems = newItems;
    this.render();
  }
}
