import React, { Component, useRef } from 'react';
import Select from 'react-select';
import axios from 'axios';
import authHeader from '../../services/auth-header.js';

export default class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectOptions: [],
        }
    }

    getOptions() {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/api/register',
            headers: authHeader()
        };
        const options = [];
        axios(config)
            .then(function (response) {

                for (let i = 0; i < JSON.parse(JSON.stringify(response.data)).length; i++) {
                    options[i] = {
                        "value": i,
                        "label": JSON.parse(JSON.stringify(response.data))[i].Situacao_registro
                    };
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({ selectOptions: options });
    }



    handleChange = (e) => {
        const temp = [];
        for (let i = 0; i < e.length; i++) {
            temp[i] = e[i].label;
        }

        localStorage.setItem("register", JSON.stringify(temp));
    }

    componentDidMount() {
        this.getOptions()
    }

    render() {
        return (
            <div>
                <Select
                    options={this.state.selectOptions}
                    onChange={this.handleChange}
                    placeholder="Situação do Registro (A opção “Com Registro Regional” precisa está marcada)"
                    isMulti
                    isDisabled={this.props.isDisabled}
                />
            </div>
        )
    }
}