import React from 'react';

import './App.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'

import { pcPartsReducer } from './redux/reducers/pcPartsReducer'

import CreateEntry from './layout/CreateEntry'
import Tools from './layout/Tools'
import Table from './layout/Table'
import Statistics from './layout/Statistics'

const rootReducer = combineReducers({
  pcParts: pcPartsReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)


function App() {
  React.useEffect(() => {
    let i = window.localStorage.getItem('listOfItems');
    if (i === null) {
      window.localStorage.setItem('listOfItems', JSON.stringify([]));
    }

    console.log('pobieram local storage')
  })
  return (
    <Provider store={store}>
      <div className="App" >
        <h1 className="main-header">Podlicz koszty nowego stanowiska komputerowego</h1>
        <CreateEntry />
        <Tools />
        <Table />
        <Statistics />
      </div>
    </Provider>
  );
}

export default App;
