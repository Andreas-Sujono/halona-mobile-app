import get from 'lodash.get';

export function searchFromListOfObject(
  list: any[],
  keys: any[],
  searched: string,
  isParsed = true
): any[] {
  // filter list of object based on key
  let result = list.filter((item) => {
    const escapedSearched = searched.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const searchRe = new RegExp(isParsed ? escapedSearched : searched, 'i');
    let isFiltered = false;

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const valueByKey = get(item, key);
      if (searchRe.test(valueByKey)) {
        isFiltered = true;
        break;
      }
    }

    return isFiltered;
  });
  if (!result || !result.length) {
    result = [];
  }
  return result;
}
