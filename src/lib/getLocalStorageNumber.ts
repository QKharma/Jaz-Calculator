const getLocalStorageNumber = (key: string) => {
  let value = window.localStorage.getItem(key)

  if (value) {
    return parseInt(value)
  } else {
    return 0
  }
}

export default getLocalStorageNumber
