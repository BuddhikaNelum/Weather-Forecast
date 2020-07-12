const request = require('request')

const forecast = (latitude, longitude, unit, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e65148861490a5221fd02e82c888e5d6&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units='+unit

    request({url, json: true}, (error, {body}) => {
        if (error) {
           callback('Unable to fetch data from service', undefined)
        } else if (body.error) {
            callback('Unable to load data. Please try again', undefined)
        } else {
            const currentData = body.current
            callback(undefined, currentData.weather_descriptions[0] + '. It is currently '+ currentData.temperature + ' degrees out. It feels like '+ currentData.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast