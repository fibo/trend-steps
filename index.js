/**
 * Reduce to a square curve.
 */

function trendSteps (options = {}) {
  const tolerance = options.tolerance || 0.001

  return function (accumulator, current, index) {
    if (index === 0) {
      return [{ value: current, level: 0 }]
    } else {
      const previous = accumulator[index - 1]

      const currentEqualsPrevious = Math.abs(current - previous.value) <= tolerance

      if (currentEqualsPrevious) {
        accumulator.push({ value: current, level: 0 })
      } else {
        if (current >= previous.value + tolerance) {
          if (previous.level >= 0) {
            accumulator.push({ value: current, level: previous.level + 1 })
          } else {
            accumulator.push({ value: current, level: 1 })
          }
        }

        if (current <= previous.value - tolerance) {
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

module.exports = exports.default = trendSteps
