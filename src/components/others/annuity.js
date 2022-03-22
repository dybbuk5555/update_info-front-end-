import React, { Component } from 'react';
import Select from 'react-select';

export default class Annuity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectOptions: [],
        }
    }

    componentDidMount() {
        const options = [{ 'value': 0, 'label': 'adimplente' }, { 'value': 1, 'label': 'inadimplente' }];
        this.setState({ selectOptions: options });
    }

    handleChange = (e) => {
        localStorage.setItem("annuity", JSON.stringify(e.label));
    }

    render() {
        return (
            <div>
                {this.props.isDisabled ?
                    <Select
                        options={this.state.selectOptions}
                        onChange={this.handleChange}
                        placeholder="Situação da Anuidade (A opção “Com Registro Regional” precisa está marcada)"
                        isDisabled
                    />
                    : <Select
                        options={this.state.selectOptions}
                        onChange={this.handleChange}
                        placeholder="Situação da Anuidade (A opção “Com Registro Regional” precisa está marcada)"
                    />
                }
            </div>
        )
    }
}