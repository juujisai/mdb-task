import { ADD_NEW_CATEGORY, ADD_ITEM_TO_LIST, UPDATE_LIST } from '../actions/pcPartsAction'

const initialStore = {
  selectCategories: ['podzespoły komputerowe', 'urządzenia peryferyjne', 'oprogramowanie'],
  listOfComponents: []
}


export const pcPartsReducer = (state = initialStore, action) => {
  if (action.type === ADD_NEW_CATEGORY) {
    let selectCategories = [...state.selectCategories]
    selectCategories = [...selectCategories, action.payload]
    return { ...state, selectCategories }
  }
  if (action.type === ADD_ITEM_TO_LIST) {
    const listOfComponents = [...state.listOfComponents, action.payload]
    window.localStorage.setItem('listOfItems', JSON.stringify(listOfComponents));

    return { ...state, listOfComponents }
  }
  if (action.type === UPDATE_LIST) {
    const listOfComponents = [...action.payload]
    window.localStorage.setItem('listOfItems', JSON.stringify(listOfComponents));

    return { ...state, listOfComponents }
  }
  return state
}