const msToString = (n: number) => {
  let h = Math.floor(Math.abs(n / 3600000))
  let m = Math.floor(Math.abs((n % 3600000) / 60000))

  let result = `${h.toString().padStart(2, '0')}:${m
    .toString()
    .padStart(2, '0')}`
  return result
}

export default msToString
