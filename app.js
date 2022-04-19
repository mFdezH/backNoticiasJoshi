(async ()=>{
  await require('./database');
})()

require('./scrapping/scrapping');

let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


let feedsRouter = require('./routes/feeds');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/feeds', feedsRouter);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
