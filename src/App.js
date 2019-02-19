import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import logo from './logo.svg';
import './scss/Reset.scss';
import './scss/App.scss';


import FormSimulador from './FormSimulador/FormSimulador';
import ResultadoSimulador from './ResultadoSimulador/ResultadoSimulador';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/" exact component={ FormSimulador } />
          <Route path="/resultado-simulador" component={ ResultadoSimulador } />
        </div>
      </Router>
    );
  }
}

export default App;
