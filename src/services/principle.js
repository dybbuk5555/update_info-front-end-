const request = require('request');

export default function Principle(cnae, register, annuity) {
    const options = {
        'method': 'GET',
        'url': 'http://localhost:8080/api/principle',
        'headers': {
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQ3NzMzMzMxLCJleHAiOjE2NDc4MTk3MzF9.xJ15j0KQ114pu2qp7ogR__lBXrCHe8tMlszliE4ai4Q'
        }
    };

    if (cnae != null) {
        options.url = options.url + '?cnae_principal=' + cnae;
        if (register != null) {
            options.url = options.url + '&situacao_registro=' + register + '&situacao_anuidade=' + annuity;
        }
    }

    return request(options, function (error, response) {
        if (error) throw new Error(error);
        
        return JSON.parse(response.body);        
    });

}

