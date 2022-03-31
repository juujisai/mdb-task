export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'
export const addNewCategory = (item) => {
  return { type: ADD_NEW_CATEGORY, payload: item }
}