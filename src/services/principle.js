import authHeader from './auth-header.js';
const axios = require('axios');

export default function Principle(cnae, register, annuity) {
    let config = {
        method: 'get',
        url: 'http://localhost:8080/api/principle',
        headers: authHeader()
    };

    if (cnae != null) {
        config.url = config.url + '?cnae_principal=' + cnae;
        if (register != null) {
            config.url = config.url + '&situacao_registro=' + register + '&situacao_anuidade=' + annuity;
        }
    }

    return axios(config)
        .then(function (response) {
            return JSON.parse(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

