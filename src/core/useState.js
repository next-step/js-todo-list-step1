function useState(init) {
  
  let stateList = [];
  let listener = init;

  const initData = (key, payload) => {
    if(!stateList.filter(state => state.key === key)[0]) {
      stateList.push({
        key,
        data: payload
      })
    }
  }

  const getState = key => {
    return stateList.filter(state => state.key === key)[0];
  }

  const setState = (key, payload) => {
    stateList = stateList.map(state => {
      return state.key === key? {
        key,
        data: payload
      } : state
    });;
    listener();
  }

  return { initData, getState, setState };
}

export default useState;