import React, { Component } from 'react';
import Select from 'react-select';

export default class Annuity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectOptions: [],
            id: "",
            name: ''
        }
    }    
     
    componentDidMount() {
        const options = [{ 'value': 0, 'label': 'adimplente' }, { 'value': 1, 'label': 'inadimplente' }];
        this.setState({ selectOptions: options });
    }

    handleChange(e) {
        console.log(e)
        this.setState({ id: e.value, name: e.label })
    }

    render() {
        return (
            <div>
                <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
            </div>
        )
    }
}