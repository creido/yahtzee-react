import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

// const todoChangeHandler = (val) => store.dispatch(updateCurrent(val))
// replaced by
// const actions = bindActionCreators({updateCurrent}, store.dispatch)

/**
 * This...
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));

/**
 * ...replaces this
 */
// const state = store.getState()

// const render = () => {
//   const state = store.getState()

//   ReactDOM.render(
//     <App todos={state.todos}
//       currentTodo={state.currentTodo}
//       changeCurrent={actions.updateCurrent}
//       />,
//   document.getElementById('root'));
// }

// render()

// store.subscribe(render)


registerServiceWorker();
