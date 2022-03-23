import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import authHeader from '../../services/auth-header.js';

export default class CNAE extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectOptions: [],
        }
    }

    getOptions() {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/api/cnae',
            headers: authHeader()
        };
        const options = [];
        axios(config)
            .then(function (response) {

                for (let i = 0; i < JSON.parse(JSON.stringify(response.data)).length; i++) {
                    options[i] = {
                        "value": i,
                        "label": JSON.parse(JSON.stringify(response.data))[i].CNAE
                    };
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({ selectOptions: options });
    }


    handleChange(e) {
        localStorage.setItem("cnae", JSON.stringify(e.label));
    }

    componentDidMount() {
        this.getOptions()
    }

    render() {
        return (
            <div>
                <Select
                    ref={ref => {
                        this.selectRef = ref;
                    }}
                    options={this.state.selectOptions}
                    onChange={this.handleChange.bind(this)}
                    placeholder="CNAE Principal" />
            </div>
        )
    }
}