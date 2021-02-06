import decamelize from 'decamelize'
import camelCase from 'camelcase'


/**
 * Converts camelCase to snake_case and vise versa.
 * @class
 */
class CaseFilter {

  /**
   * Function should ignore any processing when the newKey is the same as the old one.
   *
   * @param {CaseFilter~operateOnKeyFunc} operateOnKeyFunc
   */
  _deepIterate(obj, operateOnKeyFunc) {
    if(Array.isArray(obj)) {
      obj.forEach((entry) => {
        if(typeof entry === 'object') {
          this._deepIterate(entry, operateOnKeyFunc)
        }
      })
    } else if(typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => {
        const newKey = operateOnKeyFunc(obj, key)
          if(typeof obj[newKey] === 'object') {
            this._deepIterate(obj[newKey], operateOnKeyFunc)
          }
      })
    }
  }

  /**
   * Convert to camel case. This function mutates the original object
   *
   * @param {object} o Object to mutate
   */
  convertToCamelCase(o) {
    this._deepIterate(o, (obj, key) => {
      const newKey = camelCase(key)
      if(newKey !== key) {
        delete Object.assign(obj, { [newKey]: obj[key] })[key]
      }

      return newKey
    })
  }

  /**
   * Convert to snake case. This function mutates the original object
   *
   * @param {object} o Object to mutate
   */
  convertToSnakeCase(o) {
    this._deepIterate(o, (obj, key) => {
      debugger
      const newKey = decamelize(key, { preserveConsecutiveUppercase: true })
      console.log(`${key} -> ${newKey}`)
      if(newKey !== key) {
        delete Object.assign(obj, { [newKey]: obj[key] })[key]
      }
      return newKey
    })
  }
}

export default new CaseFilter()

/**
 * Callback Change the key of the provided object.
 *
 * @callback CaseFilter~operateOnKeyFunc
 * @param {object} obj The object that has the key. This operation expects to mutate the object.
 * @param {string} key Property's key to mutate
 * @returns {string} The new key
 */
