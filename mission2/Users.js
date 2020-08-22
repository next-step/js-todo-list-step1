export default function Users(){
    const $userList = document.querySelector("#user-list");
    this.render=(user)=>{
        if(user){
            const htmlString = user.map(user => `<button data-user="${user.name}">${user.name}</button>`)
            .join('');
            $userList.innerHTML = htmlString;
        }
    }
    this.render();
};