const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=983ed8a9e4dfedd8aaa4a2a6ed5e3782&query=' + longitude + ',' + latitude +'&units=m';
    
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location!', undefined);
        }
        else { 
           callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + (' degrees out. It feels like ') + body.current.feelslike + (' degrees.'));
        };
    });
};

module.exports = forecast;
