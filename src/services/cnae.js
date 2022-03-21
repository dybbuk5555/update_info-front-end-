import authHeader from './auth-header.js';
const axios = require('axios');


export default function CNAE() {
    const config = {
        method: 'get',
        url: 'http://localhost:8080/api/cnae',
        headers: authHeader()
    };

    return axios(config)
        .then(function (response) {
            let cnae = [];
            for (let i = 0; i < JSON.parse(JSON.stringify(response.data)).length; i ++) {
                cnae.push(JSON.parse(JSON.stringify(response.data))[i].CNAE);
            }
            return cnae;
        })
        .catch(function (error) {
            console.log(error);
        });
}

