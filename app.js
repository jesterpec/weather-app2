const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000; 
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');

// Setup hbs engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.engine('html', require('hbs').__express);
app.use(express.static(publicDirectoryPath ));

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andy Pecover'
    }); 
});
app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Andy Pecover'
    });
});
app.get('/help',(req, res) => {
    res.render('help', {
        title:'Help',
        name:'Andy Pecover',
        helpText:'If you require assistance email me at assistance@tiscali.co.uk'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
    });

    forecast(latitude, longitude,(error, forecastData) => {
        if (error) {
            return res.send({error});
        }
    });
    res.send({
        forecast: forecastData,
        location,
        address: req.query.address
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    
    console.log(req.query.search);
    res.send({
        products: []
    }); 
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Andy Pecover',
        errorMessage:'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Andy Pecover',
        errorMessage:'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
}); 
