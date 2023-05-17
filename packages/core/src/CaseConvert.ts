import decamelize from 'decamelize'
import camelcaseKeys from 'camelcase-keys'


/**
 * Converts camelCase to snake_case and vise versa.
 * @class
 */
export class CaseConvert {

  /**
   * Function should ignore any processing when the newKey is the same as the old one.
   *
   * @param {CaseConvert~operateOnKeyFunc} operateOnKeyFunc
   */
  _deepIterate(obj: any, operateOnKeyFunc: (obj: any, key: string) => string) {
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
  convertToCamelCase(o: any): any {
    return camelcaseKeys(o, {
      deep: true
    })
  }

  /**
   * Convert to snake case. This function mutates the original object
   *
   * @param {object} o Object to mutate
   */
  convertToSnakeCase(o: any) {
    this._deepIterate(o, (obj, key) => {
      const newKey = decamelize(key, { preserveConsecutiveUppercase: true })
      if(newKey !== key) {
        delete Object.assign(obj, { [newKey]: obj[key] })[key]
      }
      return newKey
    })
  }
}

/**
 * Callback Change the key of the provided object.
 *
 * @callback CaseConvert~operateOnKeyFunc
 * @param {object} obj The object that has the key. This operation expects to mutate the object.
 * @param {string} key Property's key to mutate
 * @returns {string} The new key
 */
