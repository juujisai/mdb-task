import { ADD_NEW_CATEGORY } from '../actions/pcPartsAction'

const initialStore = {
  selectCategories: ['podzespoły komputerowe', 'urządzenia peryferyjne', 'oprogramowanie']
}


export const pcPartsReducer = (state = initialStore, action) => {
  if (action.type === ADD_NEW_CATEGORY) {
    let selectCategories = [...state.selectCategories]
    selectCategories = [...selectCategories, action.payload]
    return { ...state, selectCategories }
  }

  return state
}