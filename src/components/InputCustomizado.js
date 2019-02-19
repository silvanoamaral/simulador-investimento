import React, { Component } from 'react'

export default class InputCustomizado extends Component {

    render() {
        return(
            <div className="field">                            
                <input
                    className="form-control"
                    id={ this.props.id }
                    type={ this.props.type }
                    name={ this.props.name }
                    maxLength= { this.props.maxLength }
                    placeholder={ this.props.placeholder }
                    value={ this.props.value }
                    onChange={ this.props.onChange }
                />
                <label htmlFor={ this.props.id } className="form-label">{ this.props.label }</label> 
                <span className="error-message">{ this.props.data }</span>
            </div>
        );
    }
}