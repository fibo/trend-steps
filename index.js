/**

Reduce to a square curve.


console.log(output)
// [
//   { value: 1.2, level: 0 },
//   { value: 1.4, level: 1 },
//   { value: 1.5, level: 2 },
//   { value: 1.6, level: 3 },
//   { value: 1.5, level: -1 },
//   { value: 1.4, level: -2 },
//   { value: 1.4, level: 0 },
//   { value: 1.2, level: -1 }
// ]
*/

function trendSteps (options) {
  const tolerance = options.tolerance || 0.001

  return function (accumulator, current, index) {
    if (index === 0) {
      return [{ value: current, level: 0 }]
    } else {
      const previous = accumulator[index - 1]

      const currentEqualsPrevious = Math.abs(current, previous.value) < tolerance

      if (currentEqualsPrevious) {
        accumulator.push({ value: current, level: 0 })
      } else {
        if (current > previous.value + tolerance) {
          if (previous.level >= 0) {
            accumulator.push({ value: current, level: previous.level + 1 })
          } else {
            accumulator.push({ value: current, level: 1 })
          }
        }

        if (current < previous.value - tolerance) {
          if (previous.level <= 0) {
            accumulator.push({ value: current, level: previous.level - 1 })
          } else {
            accumulator.push({ value: current, level: -1 })
          }
        }
      }

      return accumulator
    }
  }
}

module.exports = trendSteps
