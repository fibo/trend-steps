# trend-steps

> reduces math series to a square curve of its trend steps

Reduce a math series to a square curve like

```                    __
+3        _
+2      _|
+1    _|             _
 0 _ |     _      __|
-1          |_
-2            |_
-3              |_
```

Use it as an array reducer.

```javascript
const toTrendSteps = require('trend-steps')

const input = [
  1.2, 1.4, 1.5, 1.6, 1.5, 1.4, 1.4, 1.2
]

const output = input.reduce(toTrendSteps(), [])
```

In this case output will be

```javascript
[
  { value: 1.2, level: 0 },
  { value: 1.4, level: 1 },
  { value: 1.5, level: 2 },
  { value: 1.6, level: 3 },
  { value: 1.5, level: -1 },
  { value: 1.4, level: -2 },
  { value: 1.4, level: 0 },
  { value: 1.2, level: -1 }
]
```
