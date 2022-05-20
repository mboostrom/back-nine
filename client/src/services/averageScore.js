const averageScore = (roundArr) => {
  let sum = 0
  roundArr.forEach((round) => {
    sum = sum + round.score
  })
  let avg = sum / roundArr.length
  return avg.toFixed(2)
}

export default averageScore