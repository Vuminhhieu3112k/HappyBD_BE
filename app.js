var createError   = require('http-errors');
var express       = require('express');
var cors          = require('cors')
var morgan        = require('morgan')
var colors        = require('colors');
var errorHandler  = require('./app/middleware/error')
const validator   = require('express-validator'); 


const mongoose = require('mongoose');
var app = express();
app.use(express.json());
app.use(cors())
app.use(morgan('tiny'))
app.use(validator());


const pathConfig        = require('./path');
global.__base           = __dirname + '/';
global.__path_app       = __base + pathConfig.folder_app + '/';

global.__path_schemas   = __path_app + pathConfig.folder_schemas + '/';
global.__path_models    = __path_app + pathConfig.folder_models + '/';
global.__path_routers   = __path_app + pathConfig.folder_routers + '/';
global.__path_configs   = __path_app + pathConfig.folder_configs + '/';
global.__path_validates = __path_app + pathConfig.folder_validates + '/';



const systemConfig    = require(__path_configs + 'system');
const databaseConfig  = require(__path_configs + 'database');

// Local variable
app.locals.systemConfig = systemConfig;

mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@comment.tt9ay.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected'.magenta);
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

// Setup router
app.use('/api/v1/', require(__path_routers));
app.use(errorHandler)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;

