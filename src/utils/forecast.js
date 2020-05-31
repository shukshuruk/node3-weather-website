const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a43072c6d25a6d63b902278dc2d7ccb2&query=' + latitude + ',' + longitude +''

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to forecast service!')
        } else if (body.error) {
            callback('Unable to find location!')
        } else {
            const data = body.current
            callback(undefined, {
                description: data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. And feels like ' + data.feelslike + ' degrees out',
                icon: data.weather_icons[0]
            })
        }
    })
}

module.exports = forecast