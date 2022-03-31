import './App.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'

import { pcPartsReducer } from './redux/reducers/pcPartsReducer'

const rootReducer = combineReducers({
  pcParts: pcPartsReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)


function App() {
  return (
    <Provider store={store}>
      <div className="App" >
        <div></div>
      </div>
    </Provider>
  );
}

export default App;
