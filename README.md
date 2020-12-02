ls-manager
==========

**ls** stands for LocalStorage. It allows you to simply get and set objects, arrays etc. directly into the
```window.localStorage```, without worrying about parsing / stringifying data.

## How to use

### "Simple" use (basic JSON encoding)
```js
import lsManager from '@kc/ls-manager/src/ls-manager'

const ls = lsManager()

const key = 'tralala'
const value = {a: 'tsoin-tsoin'}

ls.setItem(key, value)

let otherValue = ls.getItem(key)

// will display: Object { a: "tsoin-tsoin" } Object { a: "tsoin-tsoin" }
console.log(value, otherValue)

ls.update(key, {'testUpdate': 'tralala'})
otherValue = ls.getItem(key)

// will display: Object { a: "tsoin-tsoin", testUpdate: "tralala" }
console.log(otherValue)
```

### Use your very own encoder / decoder
```js
const ls = lsManager({
    parsingFunction: (string) => {
        // return parsed string
    },
    stringifyingFunction: (any) => {
        // return stringified any
    }
})
```

Well... that is all folks! 