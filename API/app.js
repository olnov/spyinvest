var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require ('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json')
const { syncDatabase } = require ('./db/db');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const assetsRouter = require('./routes/assets');
const portfoliosRouter = require('./routes/portfolios');
const portfolioAssetsRouter = require('./routes/portfolioAssets');
const profieImagesRouter = require('./routes/profiles');
const tokenChecker = require('./middleware/tokenChecker');


var app = express();


// Initializing DB. Use 'true' if you need to recreate DB schema
syncDatabase(false);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', tokenChecker, usersRouter);
app.use('/assets', tokenChecker,  assetsRouter);
app.use('/portfolios',tokenChecker,  portfoliosRouter);
app.use('/portfolio_assets', tokenChecker, portfolioAssetsRouter);
app.use('/profiles', profieImagesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
