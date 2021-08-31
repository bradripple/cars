const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const fs = require('fs');

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(ejsLayouts)
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use('/vintage-cars', require('./controllers/vintage-cars'));
app.use('/concept-cars', require('./controllers/concept-cars'));
app.use('/strange-cars', require('./controllers/strange-cars'));
app.use('/user-favs', require('./controllers/user-favs'));

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(PORT, () => {
    console.log('Server running on PORT:', PORT);
})