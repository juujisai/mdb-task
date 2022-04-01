export const SWITCH_EDIT = 'SWITCH_EDIT'
export const switchEdit = () => {
  return { type: SWITCH_EDIT }
}


export const SHOW_TOOLS_HELPER = 'SHOW_TOOL_HELPER'
export const showToolHelper = (tool) => {
  return { type: SHOW_TOOLS_HELPER, payload: tool }
}