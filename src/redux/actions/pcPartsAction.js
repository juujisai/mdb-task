import axios from 'axios'
const URL = process.env.REACT_APP_API_PCPARTS;

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

// handle import actions
export const IMPORT_FROM_NODE_REQUEST = 'IMPORT_FROM_NODE_REQUEST'
export const IMPORT_FROM_NODE_SUCCESS = 'IMPORT_FROM_NODE_SUCCESS'
export const IMPORT_FROM_NODE_FAILURE = 'IMPORT_FROM_NODE_FAILURE'


export const importFromNodeRequest = () => {
  return { type: IMPORT_FROM_NODE_REQUEST }
}

export const importFromNodeSuccess = (data) => {
  return { type: IMPORT_FROM_NODE_SUCCESS, payload: data }
}

export const importFromNodeFailure = (error) => {
  return { type: IMPORT_FROM_NODE_FAILURE, payload: error }
}

export const handleImportFromNode = (addToLocalStorage) => {
  return (dispatch) => {
    dispatch(importFromNodeRequest())
    console.log(URL)
    axios.get(URL)
      .then(response => {
        console.log('api import');
        let data = response.data

        if (addToLocalStorage) {
          console.log('dodano do localStorage')
          window.localStorage.setItem('listOfItems', JSON.stringify(data))
        };

        dispatch(importFromNodeSuccess(data))
      })
      .catch(error => {
        console.log(error)
        dispatch(importFromNodeFailure(error))
      })


  }
}


// handle export post action
export const POST_TO_NODE_REQUEST = 'POST_TO_NODE_REQUESTT'
export const POST_TO_NODE_SUCCESS = 'POST_TO_NODE_SUCCESS'
export const POST_TO_NODE_FAILURE = 'POST_TO_NODE_FAILURE'


export const postToNodeRequest = () => {
  return { type: POST_TO_NODE_REQUEST }
}

export const postToNodeSuccess = (data) => {
  return { type: POST_TO_NODE_SUCCESS, payload: data }
}

export const postToNodeFailure = (error) => {
  return { type: POST_TO_NODE_FAILURE, payload: error }
}

export const handlePostToNode = (data) => {
  return (dispatch) => {
    dispatch(postToNodeRequest())

    axios.post(URL, data)
      .then(response => {
        console.log('handle post')
        dispatch(postToNodeSuccess(data))
      })
      .catch(error => {
        console.log(error)
        dispatch(postToNodeFailure(error))
      })



  }
}


// handle export put action
export const PUT_TO_NODE_REQUEST = 'PUT_TO_NODE_REQUESTT'
export const PUT_TO_NODE_SUCCESS = 'PUT_TO_NODE_SUCCESS'
export const PUT_TO_NODE_FAILURE = 'PUT_TO_NODE_FAILURE'


export const putToNodeRequest = () => {
  return { type: PUT_TO_NODE_REQUEST }
}

export const putToNodeSuccess = (data) => {
  return { type: PUT_TO_NODE_SUCCESS, payload: data }
}

export const putToNodeFailure = (error) => {
  return { type: PUT_TO_NODE_FAILURE, payload: error }
}

export const handlePutToNode = (data) => {
  return (dispatch) => {
    dispatch(putToNodeRequest())

    axios.put(URL, data)
      .then(response => {
        console.log('handle put')
        dispatch(putToNodeSuccess(data))
      })
      .catch(error => {
        console.log(error)
        dispatch(putToNodeFailure(error))
      })


  }
}
