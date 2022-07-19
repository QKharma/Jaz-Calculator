export const getLocalStorageNumber = (key: string) => {
  let value = window.localStorage.getItem(key)

  if (value) {
    return parseInt(value)
  } else {
    return 0
  }
}

export const setLocalStorageNumber = (
  key: string,
  n: number,
  nullable: boolean
) => {
  if (!nullable && n === 0) {
    return
  }
  localStorage.setItem(key, n.toString())
}
