ls-manager
==========

**ls** stands for LocalStorage. It allows you to simply get and set objects, arrays etc. directly into the
```window.localStorage```, without worrying about parsing / stringifying data.

## How to use

### "Simple" use (basic JSON encoding)
```js
import lsManager from '@kebab-case/ls-manager'

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

N.B.: ls-manager also supports require syntax (which doesn't help since you don't have access to `window`
with node).

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


-----------------------------------------
## Powered by @kebab-case/npm-simple-publisher

This package has been brought to you by **npm-simple-publisher**

This little nodejs command-line script allows you to easily compile and publish node **and** es6 compliant code 
packages to npm. Init your project with minimal babel configuration for es6, compile to cjs and 
publish to npm with only two commands.

Try it now:

```shell script
sudo apt install yarn
sudo npm install -g @kebab-case/npm-simple-publisher
mkdir my_project
cd my_project
# getting help about command
kc-nsp -h # list of command modules
kc-nsp init -h # and so on
# getting started
kc-nsp init -f # create project 
# ... do things in my_project/src, using proposed build or your own (not npm-friendly)
kc-nsp publish -t M|m|r # publish new Major / minor version or revision
```

Basically, that's all!

Find on npm: https://www.npmjs.com/package/@kebab-case/npm-simple-publisher