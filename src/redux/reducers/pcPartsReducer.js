import { ADD_NEW_CATEGORY, ADD_ITEM_TO_LIST, UPDATE_LIST, SET_SUM_OF_COMPONENTS, UPDATE_LIST_WITHOUT_POST, COPY_MOVED_DATA, ADD_NEW_STAT_TO_SHOW, FILTR_BY_CATEGORY, IMPORT_FROM_NODE_REQUEST, IMPORT_FROM_NODE_SUCCESS, IMPORT_FROM_NODE_FAILURE, PUT_TO_NODE_SUCCESS, PUT_TO_NODE_REQUEST, PUT_TO_NODE_FAILURE, POST_TO_NODE_FAILURE, POST_TO_NODE_SUCCESS, POST_TO_NODE_REQUEST } from '../actions/pcPartsAction'

let s = JSON.parse(window.localStorage.getItem('cat'))
let x = JSON.parse(window.localStorage.getItem('listOfItems'));

if (s === null) {
  s = ['podzespoły komputerowe', 'urządzenia peryferyjne', 'oprogramowanie']
}

if (x === null) {
  x = []
}

const initialStore = {
  selectCategories: s,
  listOfComponents: x,
  copyOfListOfComponents: [],
  sumPriceOfComponents: 0,
  dataMoved: {},
  partialStat: [],
  filterByCategory: 'all',

  apiLoading: false,
  apiError: ''
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
  if (action.type === SET_SUM_OF_COMPONENTS) {
    return { ...state, sumPriceOfComponents: action.payload }
  }
  if (action.type === UPDATE_LIST_WITHOUT_POST) {
    const listOfComponents = [...action.payload]
    return { ...state, listOfComponents }

  }
  if (action.type === COPY_MOVED_DATA) {
    return { ...state, dataMoved: action.payload }
  }
  if (action.type === ADD_NEW_STAT_TO_SHOW) {
    return { ...state, partialStat: [...state.partialStat, action.payload] }
  }
  if (action.type === FILTR_BY_CATEGORY) {
    return { ...state, filterByCategory: action.payload }
  }

  // node actions
  if (action.type === IMPORT_FROM_NODE_REQUEST || action.type === POST_TO_NODE_REQUEST || action.type === PUT_TO_NODE_REQUEST) {
    return { ...state, apiLoading: true }
  }
  if (action.type === IMPORT_FROM_NODE_FAILURE || action.type === POST_TO_NODE_FAILURE || action.type === PUT_TO_NODE_REQUEST) {
    return { ...state, apiError: action.payload, apiLoading: false }
  }
  if (action.type === POST_TO_NODE_SUCCESS || action.type === PUT_TO_NODE_SUCCESS) {
    return { ...state, apiLoading: false }
  }
  if (action.type === IMPORT_FROM_NODE_SUCCESS) {
    let copyOfListOfComponents = [...state.listOfComponents]
    return { ...state, listOfComponents: action.payload, copyOfListOfComponents, apiLoading: false }
  }




  return state
}