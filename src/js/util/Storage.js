export const storage = {
  get: (TODOS_DATA) => {
    try {
      return JSON.parse(localStorage.getItem(TODOS_DATA))
    } catch(error) {
      console.log(error)
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
