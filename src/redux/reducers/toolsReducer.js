import { SWITCH_EDIT } from '../actions/toolsActions'

const initialState = {
  editActive: false
}

export const toolsReducer = (state = initialState, action) => {
  if (action.type === SWITCH_EDIT) {
    return { ...state, editActive: !state.editActive }
  }

  return state
}