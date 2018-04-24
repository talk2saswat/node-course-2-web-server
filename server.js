const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; //for heroku the first one will take and the next one for local
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
/*Addded first other wise the static file will load*/
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Saswat',
  //   age: 30,
  //   likes: [
  //     'Badminton', 'Bikes', 'Cricket'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});
app.get('/about', (req, res) => {
  //res.send('About Page.');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
// app.listen(3000);//We can use this also
app.listen(`${port}`, () => {
  console.log('Server is up in port 3000');
});
