/**
 * Reduce to a square curve.
 */

function trendSteps (options = {}) {
  const tolerance = options.tolerance || 0.001

  let unit

  return function (accumulator, current, index, array) {
    if (index === 0) {
      // As a first step, compute unit. It is the minimum delta found in array,
      // where delta is the difference between two consecutive elements.
      for (let i = 1; i < array.length; i++) {
        const delta = Math.abs(array[i] - array[i - 1])

        if (typeof unit === 'number') {
          if (delta >= tolerance) {
            unit = Math.min(delta, unit)
          }
        } else {
          unit = delta
        }
      }

      return [{ value: current, level: 0 }]
    } else {
      const previous = accumulator[index - 1]

      const currentEqualsPrevious = Math.abs(current - previous.value) <= tolerance

      if (currentEqualsPrevious) {
        accumulator.push({ value: current, level: 0 })
      } else {
        const delta = Math.abs(current - previous.value)
        const size = typeof unit === 'number' ? Math.round(delta / unit) : 1

        if (current >= previous.value + tolerance) {
          if (previous.level >= 0) {
            accumulator.push({ value: current, level: previous.level + size })
          } else {
            accumulator.push({ value: current, level: size })
          }
        }

        if (current <= previous.value - tolerance) {
          if (previous.level <= 0) {
            accumulator.push({ value: current, level: previous.level - size })
          } else {
            accumulator.push({ value: current, level: 0 - size })
          }
        }
      }

      return accumulator
    }
  }
}

module.exports = exports.default = trendSteps
