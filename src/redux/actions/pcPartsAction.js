export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY'
export const addNewCategory = (item) => {
  return { type: ADD_NEW_CATEGORY, payload: item }
}

export const ADD_ITEM_TO_LIST = 'ADD_ITEM_TO_LIST'
export const UPDATE_LIST = 'UPDATE_LIST'

export const addItemToList = (item) => {
  return { type: ADD_ITEM_TO_LIST, payload: item }
}

export const updateList = (list) => {
  return { type: UPDATE_LIST, payload: list }
}

export const SET_SUM_OF_COMPONENTS = 'SET_SUM_OF_COMPONENTS'
export const setSumOfComponents = (sum) => {
  return { type: SET_SUM_OF_COMPONENTS, payload: sum }
}