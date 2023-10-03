/**
 * Converts camelCase to snake_case and vise versa.
 * @class
 */
export declare class CaseConvert {
    /**
     * Function should ignore any processing when the newKey is the same as the old one.
     *
     * @param {CaseConvert~operateOnKeyFunc} operateOnKeyFunc
     */
    _deepIterate(obj: any, operateOnKeyFunc: (obj: any, key: string) => string): void;
    /**
     * Convert to camel case. This function returns the changed object
     *
     * @param {object} o Object to change
     */
    convertToCamelCase(o: any): any;
    /**
     * Convert to snake case. This function mutates the original object
     *
     * @param {object} o Object to mutate
     */
    convertToSnakeCase(o: any): void;
}
/**
 * Callback Change the key of the provided object.
 *
 * @callback CaseConvert~operateOnKeyFunc
 * @param {object} obj The object that has the key. This operation expects to mutate the object.
 * @param {string} key Property's key to mutate
 * @returns {string} The new key
 */
