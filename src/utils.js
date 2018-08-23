
/**
 * An empty object. Used as placeholder for `props` in VNode.
 * @type {{}} EMPTY_OBJECT
 */
export const EMPTY_OBJECT = {}

/**
 * Combine two objects, merging the second into the first. Any properties already existing in the first will be replaced by those of the second. Any properties in the second not in the first will be added to it.
 * @param {Object.<string, any>} firstObject
 * @param {Object.<string, any>} secondObject
 * @return {Object.<string, any>} target
 */
export function merge(firstObject, secondObject) {
  const target = {}

  for (let i in firstObject) target[i] = firstObject[i]
  for (let j in secondObject) target[j] = secondObject[j]

  return target
}

/**
 * A function to test where something is an object literal or not. Used by Component setState.
 * @param {Object.<string, any>} obj An object literal to test.
 * @return {boolean} boolean
 */
export function isObject(obj) {
  if (Array.isArray(obj)) return false
  else if (typeof obj === 'object') return true
  return false
}

/**
 * Function to create an RFC4122 version 4 compliant uuid.
 * @return {string} string
 */
export function uuid() {
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
