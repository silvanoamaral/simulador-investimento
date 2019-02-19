import React, { Component } from 'react';

const options = [
  { value: '0', label: 'Selecione o ano' },
  { value: '1', label: '1 ano' },
  { value: '2', label: '2 ano' },
  { value: '3', label: '3 ano' }
];

export default class SelectCustomizado extends Component {

  render() {
    return (
      <div className="select__tempo custom__select">
        <label className="form-label">{ this.props.label }</label>
        <select onChange={ this.props.onChange } name={ this.props.name } >
          {
            options.map(element => {
              return <option value={ element.value } key={ element.value } >{ element.label }</option>
            })
          }
        </select>
        <span className="error-message">{ this.props.data }</span>
      </div>
    );
  }
}