const express = require('express');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const credentials = require('./credentials');
const routes = require('./routes');

const port = process.env.PORT || 9000;

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
routes(app);

mongoose.set('strictQuery', true);
mongoose.connect(credentials.credentials.mongoUrlConnection)
.then(() => app.listen(port))
.then(() => console.log(`Connection successfully  on http://localhost:${port}`))
.catch(err => console.log(`Connection failed: ${err.message}`));