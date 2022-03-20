const request = require('request');

export default function Register() {
    const options = {
        'method': 'GET',
        'url': 'http://localhost:8080/api/register',
        'headers': {
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjQ3NzMzMzMxLCJleHAiOjE2NDc4MTk3MzF9.xJ15j0KQ114pu2qp7ogR__lBXrCHe8tMlszliE4ai4Q'
        }
    };

    return request(options, function (error, response) {
        if (error) throw new Error(error);
        
        let register = [];
        
        for (let i = 0; i < JSON.parse(response.body).length; i ++)
            register[i] = JSON.parse(response.body)[i].Situacao_registro;
        
        return register;        
    });

}

