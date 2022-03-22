import React, { Component } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header.js';

export default class Principle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableContents: [],
            start: 0,
            limit: 1000
        }
    }

    async getOptions() {


    }

    componentDidMount() {
        const config = {
            method: 'get',
            url: `http://localhost:8080/api/principle?_start=${this.state.start}&_limit=${this.state.limit}`,
            headers: authHeader()
        };

        if (this.props.cnae !== "") {
            config.url = config.url + '?cnae_principal=' + this.state.cnae;
            if (this.props.register !== "") {
                config.url = config.url + '&situacao_registro=' + this.state.register + '&situacao_anuidade=' + this.state.annuity;
            }
        }

        const getContents = async () => {
            let { data } = await axios(config);

            this.setState({ tableContents: data });
        };
        getContents();
    }

    render() {
        const { tableContents } = this.state;
        return (
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">CNPJ</th>
                            <th scope="col">RAZÃO SOCIAL</th>
                            <th scope="col">NOME SOCIAL</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">CIDADE</th>
                            <th scope="col">UF</th>
                            <th scope="col">CNAE Principal</th>
                            <th scope="col">CNAE Secundário</th>
                            <th scope="col">Situação Registro</th>
                            <th scope="col">Registro Regional</th>
                            <th scope="col">Situação Anuidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableContents.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.CNPJ}</td>
                                    <td>{row.Razao_Social}</td>
                                    <td>{row.Nome_Fantasia}</td>
                                    <td>{row.Endereco}</td>
                                    <td>{row.Cidade}</td>
                                    <td>{row.UF}</td>
                                    <td>{row.CNAE_principal}</td>
                                    <td>{row.CNAE_Secundário}</td>
                                    <td>{row.Situacao_registro}</td>
                                    <td>{row.Registro_regional}</td>
                                    <td>{row.Situacao_anuidade}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}



