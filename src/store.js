import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import diceReducer from './reducers/dice';
import messageReducer from './reducers/messages';
import gamePlayReducer from './reducers/gamePlay';
// import todoReducer from './reducers/todo';

const reducer = combineReducers({
  dice: diceReducer,
  gamePlay: gamePlayReducer,
  message: messageReducer,
  // todo: todoReducer,
})

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
