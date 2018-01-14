import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import diceReducer from './reducers/dice';
import gamePlayReducer from './reducers/gamePlay';
import messageReducer from './reducers/messages';
import scoresReducer from './reducers/scores';

const reducer = combineReducers({
  dice: diceReducer,
  gamePlay: gamePlayReducer,
  message: messageReducer,
  scores: scoresReducer,
})

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
