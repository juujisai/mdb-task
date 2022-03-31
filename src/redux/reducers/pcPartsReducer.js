import { ADD_NEW_CATEGORY, ADD_ITEM_TO_LIST, UPDATE_LIST } from '../actions/pcPartsAction'

let s = JSON.parse(window.localStorage.getItem('cat'))
let x = JSON.parse(window.localStorage.getItem('cat'));

if (s === null) {
  s = ['podzespoły komputerowe', 'urządzenia peryferyjne', 'oprogramowanie']
}

if (x === null) {
  x = []
}

const initialStore = {
  selectCategories: s,
  listOfComponents: x
}


export const pcPartsReducer = (state = initialStore, action) => {
  if (action.type === ADD_NEW_CATEGORY) {
    let selectCategories = [...state.selectCategories]
    selectCategories = [...selectCategories, action.payload]
    window.localStorage.setItem('cat', JSON.stringify(selectCategories));

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