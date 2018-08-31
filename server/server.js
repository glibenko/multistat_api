const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', ((req, res) => {
    res.render('index');
}));

app.use(bodyParser.json());

app.use(require('./routes/multistat.js'));

app.use(express.static(path.join(__dirname, '../public')));
app.listen(4000, () => console.log('Example app listening on port 4000!'));