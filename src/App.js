import React, { Component } from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

// import logo from './logo.svg';
// import TodoForm from './components/TodoForm';
// import TodoList from './components/TodoList';
// import Footer from './components/Footer';
import Dice from './components/Dice';
import Message from './components/Message';
import Players from './components/Players';
import Reset from './components/Reset';
import Roll from './components/Roll';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>*/}
        <main>
          <Message />
          {/*<Router>
            <div className="Todo-App">
              <TodoForm />
              <Route path='/:filter?' render={({match}) => (
                  <TodoList filter={match.params.filter} />
                )}/>
              <Footer />
            </div>
          </Router>*/}
          <Dice />
          <Reset />
          <Roll />
          <Players />
        </main>
      </div>
    );
  }
}

export default App
