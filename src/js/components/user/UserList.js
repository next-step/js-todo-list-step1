export default function UserList({ initialState }) {
  this.state = initialState;

  this.$targetBtn = document.createElement('input');
  this.$targetBtn.type = 'button';
  this.$targetBtn.value = '📄 USER';
  this.$targetBtn.className = 'user-drop';

  this.$target = document.createElement('ul');
  this.$target.className = 'user-list';
  this.$target.id = 'user-list';
  const $userApp = document.querySelector('.userApp');
  $userApp.append(this.$targetBtn, this.$target);

  const { users } = this.state;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.$targetBtn.addEventListener('click', (e) => {
    if (e.target.className === 'user-drop') {
      let $userList = document.getElementById('user-list');
      $userList.classList.toggle('drop');
    }
  });

  this.render = () => {
    const userListTemplate = `${users
      .map((user) => `<li>${user.name}</li>`)
      .join('')}`;

    this.$target.innerHTML = userListTemplate;
  };
}
