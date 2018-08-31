const express = require('express');
const axios = require('axios');
const { parseString } = require('xml2js');
const querystring = require('querystring');

const router = express.Router();

router.post('/multistat', (req, res) => {
    // if need proxy
    const proxy = {
        host: 'host',
        port: 'port',
        auth: {
            username: 'admin',
            password: 'admin',
        },
    };

    const tp = {
        go: '9031',
        agent_id: 'id',
        agent_pass: 'pass',
        user_login: 'login',
        user_pass: 'pass',
        return_type_info: '1',
        limit_type_info: '50',
        list_count_page: '50',
        list_query_id: '0',
        list_current_page: '1',
        resource_id: '7',
        return_format: '1',
        inn: req.body.inn,
    };

    const requestParams = {
        url: encodeURI('http://api2.multistat.ru/services.php'),
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36',
            'ACCEPT-CHARSET': 'windows-1251,utf-8;q=0.7,*;q=0.7',
        },
        data: querystring.stringify(tp),
        proxy,
        responseType: 'text',
    };

    axios(requestParams)
        .then(response => {
            console.log(response.data);
            console.log(response.headers);
            let data = [];
            parseString(response.data, { normalizeTags: true, explicitArray: false }, (err, result) => {
                data = result;
            });
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.send(data);
        })
        .catch(error => {
            console.log('err', error);
            return res.sendStatus(400);
        });
});

module.exports = router;
