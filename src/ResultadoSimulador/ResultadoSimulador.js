import React, { Component } from 'react';
import { Link } from "react-router-dom";
import localCurrency from '../helpers/localCurrency'

export default class ResultadoSimulador extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.location);
    this.state = {
      name: this.props.location.state.name,
      mensalidade: this.props.location.state.mensalidade,
      contribuicaoMeses: this.props.location.state.contribuicaoMeses,
      valor: this.props.location.state.valor
    };
  }

  render() {
    return (
      <div className="form__simulation--result">
        <h1 className="title">Resultado</h1>
        <div className="result">
          <p>
            Olá { this.state.name }, 
            juntando { localCurrency(this.state.mensalidade) } 
            &nbsp; todo mês, você terá
            &nbsp;{ localCurrency(this.state.valor) }
            &nbsp; em { this.state.contribuicaoMeses }  anos
          </p>
        </div>      

        <Link to="/" className="btn btn__primary">Simular Novamente</Link>
      </div>
    );
  }
}