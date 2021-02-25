const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');
const app = express();
const helmet = require('helmet');
const morgan =require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');


//app.set('view engine','pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);


//configurtion
console.log('Application Name: '+config.get('name'));
console.log('Application Name: '+config.get('mail.host'));



if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

//DB work..
dbDebugger('Connected to the databases...');

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening in port ${port}...`));