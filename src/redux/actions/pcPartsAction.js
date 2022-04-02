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

export const UPDATE_LIST_WITHOUT_POST = 'UPDATE_LIST_WITHOUT_POST'

export const updateListWithoutPost = (list) => {
  return { type: UPDATE_LIST_WITHOUT_POST, payload: list }
}

export const COPY_MOVED_DATA = 'COPY_MOVED_DATA'
export const copyMovedData = (data) => {
  return { type: COPY_MOVED_DATA, payload: data }
}

export const ADD_NEW_STAT_TO_SHOW = 'ADD_NEW_STAT_TO_SHOW'
export const addNewStatToShow = (data) => {
  return { type: ADD_NEW_STAT_TO_SHOW, payload: data }
}

export const FILTR_BY_CATEGORY = "FILTR_BY_CATEGORY"
export const filtrByCategory = (data) => {
  return { type: FILTR_BY_CATEGORY, payload: data }
}