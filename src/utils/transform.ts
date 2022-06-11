// import queryString from 'query-string';

/**
 * Transform camelCase (JavaScript style) to snake_case (Python style).
 *
 * @param {String} str Text to convert.
 */
const camelToSnake = (str: string) =>
  str
    .replace(/\W+/g, '-')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase();

/**
 * Transform snake_case (Python style) to camelCase (JavaScript style).
 *
 * @param {String} str Text to convert.
 */
const snakeToCamel = (s: string) => s.replace(/(_\w)/g, (m) => m[1].toUpperCase());

/**
 * Function to handle types of object received and let fn passed
 * handles the transformation.
 *
 * @param {Object|String|Array} object Object to transform.
 * @param {Function} fn Transformer function to be used.
 */
function transformObject(obj: Record<string, any>, fn: (s: string) => string): Record<string, any> {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((el) => transformObject(el, fn));
  }

  const result: any = {};
  Object.entries(obj).forEach(([key, val]) => {
    result[fn(key)] = transformObject(val, fn);
  });

  return result;
}

/**
 * Transform object/dictionary with keys of snake_case to keys of camelCase
 * and executed recursively.
 *
 * If an array is passed, it transforms each element of the array.
 *
 * Nothing changes if a string is passed.
 *
 * @param {any} object Object to transform.
 */
function parseObjectToCamelCase(obj: Record<string, any>) {
  return transformObject(obj, snakeToCamel);
}

/**
 * Transform object/dictionary with keys of camelCase to keys of snake_case
 * and executed recursively.
 *
 * If an array is passed, it transforms each element of the array.
 *
 * Nothing changes if a string is passed.
 *
 * @param {any} object Object to transform.
 */
function parseObjectToSnakeCase(obj: Record<string, any>) {
  return transformObject(obj, camelToSnake);
}

/**
 * Prefer use this rather than JSON.parse(JSON.stringify())
 *
 * @param {any} obj Object to be cloned.
 */
// function clone(obj: Record<string, any>) {
//   const idempotentTransformer = (str: string) => str;
//   return transformObject(obj, idempotentTransformer);
// }

// const transformQueryparams = (
//   queries: string,
//   includeKeys = [],
//   addedObj = {},
// ) => {
//   const params: any = {};

//   includeKeys.forEach((item) => {
//     params[item] = '';
//   });

//   const obj = queryString.parse(queries);

//   Object.keys(obj).forEach((key) => {
//     if (key in params) params[key] = obj[key];
//   });

//   Object.keys(params).forEach((key) => {
//     if (!params[key]) delete params[key];
//   });
//   const queryResult = queryString.stringify({ ...params, ...addedObj });

//   if (queryResult) return `?${queryResult}`;
//   return '';
// };

export {
  camelToSnake,
  snakeToCamel,
  transformObject,
  parseObjectToCamelCase,
  parseObjectToSnakeCase,
};
