require('dotenv').config()

const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, {});
app.listen(app.get('port'), () => {
  console.log('We are live on ' + app.get('port'));
});