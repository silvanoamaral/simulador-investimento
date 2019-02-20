import React, { Component } from 'react';
import InputCustomizado from '../components/InputCustomizado';
import SelectCustomizado from '../components/SelectCustomizado';

export default class FormSimulador extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      mensalidade: '',
      contribuicaoMeses: '',
      formErrors: { name: '', mensalidade: '', contribuicaoMeses: '' },
      nameValid: false,
      mensalidadeValid: false,
      contribuicaoMesesValid: false,
      formValid: false,
      form: { message: "" },
      msgError: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    let fieldValue = target.type === "select-one" ? target.value : target.value;
    const fieldName = target.name;

    let { value, maxLength } = target;
    maxLength = maxLength > 0 ? maxLength : 20;

    fieldValue = value.slice(0, maxLength);

    this.setState (
      { [fieldName]: fieldValue },
      () => {
        this.validateField(fieldName, fieldValue)
      }
    );
  }

  validateField (fieldName, fieldValue) {
    let fieldValidationErrors = this.state.formErrors;
    let mensalidadeValid = this.state.mensalidadeValid;
    let nameValid = this.state.nameValid;
    let contribuicaoMesesValid = this.state.contribuicaoMesesValid;

    switch(fieldName) {
      case 'mensalidade':
        mensalidadeValid = fieldValue.length >= 2;
        fieldValidationErrors.mensalidade = mensalidadeValid ? '' : ' is invalid';
        break;
      case 'name':
        nameValid = fieldValue.length >= 6;
        fieldValidationErrors.name = nameValid ? '': ' is invalid';
        break;
      case 'contribuicaoMeses':
        contribuicaoMesesValid = fieldValue.value !== 0;
        fieldValidationErrors.contribuicaoMeses = contribuicaoMesesValid ? '': ' is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
      mensalidadeValid: mensalidadeValid,
      nameValid: nameValid,
      contribuicaoMesesValid: contribuicaoMesesValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.mensalidadeValid && this.state.nameValid && this.state.contribuicaoMesesValid
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.formValid) {
      //console.log('Formulário com campos validado.',this.state);
      const valorMensalidade = this.state.mensalidade;
      const taxaJuros = 0.0517;// Taxa de juros: 0,517% ao mês
      var tempoContribuicaoMeses = this.state.contribuicaoMeses;

      this.setState ({
        formValid: false
      });

      fetch('https://api.mathjs.org/v4/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          expr: `${ valorMensalidade } * (((1 + ${ taxaJuros }) ^ ${ tempoContribuicaoMeses*12 } - 1) / ${ taxaJuros })`
        })
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Could not reach the API:' + response.statusText);
        }
      }).then(data => {
        console.log(data);
        if(data.error === null) {
          this.props.history.push(`/resultado-simulador`, {
            valor: Number(data.result),
            name: this.state.name,
            mensalidade: Number(this.state.mensalidade),
            contribuicaoMeses: this.state.contribuicaoMeses
          });
        } else {
          throw new Error('API retornou mensagem de error' + data.error);
        }        
      }).catch(error => {
        console.error(error.message);
        this.setState ({
          msgError: 'Falha ao enviar o formulário. Tente mais tarde.',
          formValid: true
        });
      });
    } else {
      console.log('Formulário com erro.',this.state);
    }
  }

  render() {
    return (
      <div className="form__simulation">
        <h1 className="title">Simulador</h1>
        <form onSubmit={ this.handleSubmit } autoComplete="off">
          <InputCustomizado 
            type = "text" 
            id = "name"
            name = "name" 
            label = "Nome"
            placeholder= ""
            maxLength= ""
            value = { this.state.name }
            data = { this.state.formErrors.name }
            onChange = { this.handleChange }
          />
          <InputCustomizado 
            type = "number" 
            id = "mensalidade"
            name = "mensalidade" 
            label = "Mensalidade"
            placeholder= ""
            maxLength= "4"
            value = { this.state.mensalidade }
            data = { this.state.formErrors.mensalidade }
            onChange = {this.handleChange }
          />
          <SelectCustomizado 
            name="contribuicaoMeses" 
            value={ this.state.contribuicaoMeses }
            onChange= { this.handleChange } 
            data = { this.state.formErrors.contribuicaoMeses }
            label = ""
          />

          <input type="submit" value="Submit" className="btn btn__primary" disabled={ !this.state.formValid } />
        </form>
        <p className="error__msg">{ this.state.msgError }</p>
      </div>
    );
  }
}