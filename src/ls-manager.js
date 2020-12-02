export default function ({autoStringify = true, autoParse = autoStringify, parsingFunction = undefined,
                             stringifyingFunction = undefined} = {},
                         silentError = true) {

    if (typeof window === 'undefined') {
        if (!silentError) {
            throw new Error('Local Storage Manager cannot be used in node environment')
        }
        return {setItem: function() {}, getItem: function(){}, update: function(){}}
    }

    let parse = parsingFunction || function (string) {
        if (autoParse) {
            return JSON.parse(string)
        }
        return string
    }

    let stringify = stringifyingFunction || function (value) {
        if (autoStringify) {
            return JSON.stringify(value)
        }
        return value
    }

    return new (class {
        get setItem() {
            /**
             * @param key
             * @param value
             */
            return (key, value) => {
                localStorage.setItem(key, stringify(value))
            }
        }

        get getItem() {
            /**
             * @throws Error if autoparse is on and stored item is not valid JSON
             * @param key
             * @returns {null|object}
             */
            return (key) => {
                let item = localStorage.getItem(key)
                if (!item) {
                    return null
                }
                return parse(item)
            }
        }

        get update() {
            return (key, newValues) => {
                let item = this.getItem(key)
                switch (typeof item) {
                    case 'object':
                        if (Array.isArray(item)) {
                            this.setItem(key, [...item, ...newValues])
                            break
                        }
                        this.setItem(key, {...item, ...newValues})
                        break
                    default:
                        this.setItem(key, newValues)
                        console.warn('You can update only arrays or objects. Please use `setItem` function for' +
                            'other types.')
                }
            }
        }

    })()
}