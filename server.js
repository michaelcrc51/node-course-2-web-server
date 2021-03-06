const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log');
        }
    });
    next();
});

//The following code puts the site in maint. mode
//
//app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//       pageTitle: 'We will be back shortly!.',
//       pageBody: 'We are currently doing maintenance on our site - please try again soon.'
//   }) ;
//});

app.use(express.static(__dirname + '/public'));
//
//app.get('/', (req, res) => {
//    //res.send('<h1>Hello Express!</h1>');
//    res.send({
//        name: 'Mike',
//        likes: [
//            'Weightlifting',
//            'Coding',
//            'Church'
//        ]
//    });
//});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   res.render('myPage.hbs', {
       pageTitle: 'This is my website.',
       pageBody: 'Thank you for stopping by!'
   }) ;
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   }); 
});

app.get('/projects', (req, res) => {
   res.render('projects.hbs', {
       pageTitle: 'Welcome to the projects page!.',
       pageBody: 'Here, you can find a portfolio of the projects I\'ve been working on!' 
   }) ;
});

app.get('/bad', (req, res) => {
    res.send({
        message: 'Sorry, your request can\'t be processed at this time.'
    });
});
app.listen(port, () => {
    console.log((`Server is up on port ${port}`));
});