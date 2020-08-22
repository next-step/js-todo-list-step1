  export const fetchUsers = async({user})=>{
    const res = await fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u/${user}/item/`, {
    method: 'GET',
    })
  };
  export const userTodoList = async()=>{
    const res = await  fetch('https://blackcoffee-todolist.df.r.appspot.com/api/u');
    return await res.json();
  };
  export const addTodoList = async({user,todo})=>{
    const res = await fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u/${user.name}/item/`, {
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
  export const removeTodoList = async({user})=>{
    const res = await fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u/${user.name}/item/${user._id}`, {
      method: 'DELETE'
    })
    return await res;
  }
  export const toggleTodoList = async({user})=>{
    const res = await fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u/${user.name}/item/${user._id}/'toggle'`, {
      method: 'PUT'
    })
    return await res;
  }
  export const modifyTodoList = async({user,todo})=>{
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
