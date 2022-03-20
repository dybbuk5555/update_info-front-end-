const axios = require('axios');

export default function CNAE() {
    const config = {
        method: 'get',
        url: 'http://localhost:8080/api/cnae',
        headers: {
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQ3NzMzMzMxLCJleHAiOjE2NDc4MTk3MzF9.xJ15j0KQ114pu2qp7ogR__lBXrCHe8tMlszliE4ai4Q'
        }
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

