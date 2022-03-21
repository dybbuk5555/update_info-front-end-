import authHeader from './auth-header.js';
const axios = require('axios');

export default function Register() {
    const config = {
        method: 'get',
        url: 'http://localhost:8080/api/register',
        headers: authHeader()
    };

    return axios(config)
        .then(function (response) {
            let register = [];
            for (let i = 0; i < JSON.parse(JSON.stringify(response.data)).length; i ++) {
                register.push(JSON.parse(JSON.stringify(response.data))[i].Situacao_registro);
            }
            return register;
        })
        .catch(function (error) {
            console.log(error);
        });
}

