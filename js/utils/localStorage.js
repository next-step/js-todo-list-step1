export const setLocalStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.log(err)
  }
}

export const getLocalStorageData = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key)) || null
    return data
  } catch (err) {
    console.log(err)
  }
}
