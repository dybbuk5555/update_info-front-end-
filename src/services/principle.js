const axios = require('axios');

export default function Principle(cnae, register, annuity) {
    let config = {
        method: 'get',
        url: 'http://localhost:8080/api/principle',
        headers: {
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQ3NzMzMzMxLCJleHAiOjE2NDc4MTk3MzF9.xJ15j0KQ114pu2qp7ogR__lBXrCHe8tMlszliE4ai4Q'
        }
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

