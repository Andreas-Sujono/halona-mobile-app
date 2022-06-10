/**
 * Create map from array of action types.
 * For example: (['SET'], 'NAMESPACE') becomes { 'SET': 'NAMESPACESET' }
 *
 * @param {Array<String>} typeList List of action types
 * @param {String} [namespace] Namespace to be prepended on the action types
 */
export const composeWithNamespace = (typeList: string[], namespace = ''): Record<any, any> =>
  typeList.reduce((actions, type) => ({ ...actions, [type]: `${namespace}_${type}` }), {});

/**
 * Basic action creator
 * @param {Object} [ActionTypes] must have: "SET", "LOAD_REQUEST", "LOAD_SUCCESS", "LOAD_FAILED"
 */
type ActionTypesType = Record<string, string>;
export const set = (ActionTypes: ActionTypesType, key: string, value: any) => ({
  type: ActionTypes.SET,
  payload: {
    key,
    value,
  },
});

export const loadRequest = (ActionTypes: ActionTypesType, data: any) => ({
  type: ActionTypes.LOAD_REQUEST,
  payload: data,
});

export const loadSuccess = (ActionTypes: ActionTypesType, data: any) => ({
  type: ActionTypes.LOAD_SUCCESS,
  payload: data,
});

export const loadFailed = (ActionTypes: ActionTypesType) => ({
  type: ActionTypes.LOAD_FAILED,
  payload: null,
});
