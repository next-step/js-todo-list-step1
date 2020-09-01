  export const fetchUsers = async(user)=>{
    const res = await fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u/${user}/item/`, {
    method: 'GET',
    })
    return await res.json();
  };
  export const userTodoList = async()=>{
    const res = await  fetch('https://blackcoffee-todolist.df.r.appspot.com/api/u');
    return await res.json();
  };
  export const addTodo = async(userName,todo)=>{
    const res = await fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: todo
      })
    })
    return await res;
  }
  export const deleteTodo = async(userName,userId)=>{
    const res = await fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item/${userId}`, {
      method: 'DELETE'
    })
    return await res;
  }
  export const toggleTodoList = async(user)=>{
    const res = await fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u/${user.name}/item/${user._id}/'toggle'`, {
      method: 'PUT'
    })
    return await res;
  }
  export const modifyTodoList = async(user,todo)=>{
    const res = await fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u/${user.name}/item/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: todo
      })
    })
    return await res;
  }
