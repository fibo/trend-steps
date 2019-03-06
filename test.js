const assert = require('assert')

const toTrendSteps = require('trend-steps')

const input = [
  1.2, 1.4, 1.5, 1.6, 1.5, 1.4, 1.4, 1.2
]

const expectedOutput = [
  { value: 1.2, level: 0 },
  { value: 1.4, level: 2 },
  { value: 1.5, level: 3 },
  { value: 1.6, level: 4 },
  { value: 1.5, level: -1 },
  { value: 1.4, level: -2 },
  { value: 1.4, level: 0 },
  { value: 1.2, level: -2 }
]

const output = input.reduce(toTrendSteps(), [])

assert.deepEqual(output, expectedOutput)
