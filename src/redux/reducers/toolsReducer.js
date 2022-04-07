import { SWITCH_EDIT, SHOW_TOOLS_HELPER } from '../actions/toolsActions'

const initialState = {
  editActive: false,
  showExport: false,
  showStats: false,
  showSelection: false,
  showExportApi: false,
  showImportFrom: false
}

export const toolsReducer = (state = initialState, action) => {
  if (action.type === SWITCH_EDIT) {
    return { ...state, editActive: !state.editActive }
  }
  if (action.type === SHOW_TOOLS_HELPER) {
    if (action.payload === 'export') { return { ...state, showExport: !state.showExport } }
    if (action.payload === 'stats') { return { ...state, showStats: !state.showStats } }
    if (action.payload === 'selection') { return { ...state, showSelection: !state.showSelection } }
    if (action.payload === 'exp-imp') { return { ...state, showExportApi: !state.showExportApi } }
    if (action.payload === 'import') { return { ...state, showImportFrom: !state.showImportFrom } }
  }

  return state
}


