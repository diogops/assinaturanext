const { create } = require('apisauce')


exports.api = create({
    //baseURL : 'https://paineldeboxe.kernelsystem.com.br:7000',
    baseURL : 'https://brasilcar.kernelsystem.com.br:7000',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization" : process.env.COMPANY_KEY
    }
})

