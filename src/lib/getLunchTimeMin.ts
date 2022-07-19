const getLunchTimeMin = (t: number) => {
  let calcLunchTimeMin
  if (t <= 18000000) {
    calcLunchTimeMin = 0
  } else if (t > 18000000 && t < 32400000) {
    calcLunchTimeMin = 1800000
  } else {
    calcLunchTimeMin = 3600000
  }
  return calcLunchTimeMin
}

export default getLunchTimeMin
