const express = require('express');

const app = express();
const { resolve } = require('path');
const server = require('./');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', server);
app.use(express.static(resolve(__dirname, '..', '..', 'www')));
app.get('*', (req, res) => res.sendFile(resolve(__dirname, '..', '..', 'www/index.html')));

app.listen(process.env.PORT || 3000, () => {
	console.log(chalk.cyan('Server is listening'), chalk.yellow('http://localhost:3000'));
});
