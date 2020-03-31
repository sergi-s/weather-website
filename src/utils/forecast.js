const request = require("request");

const forecast = (long, lat, callback) => {
    const url = "https://api.darksky.net/forecast/87b6dcab224b1419369560c2b522d143/" + long + "," + lat + "?units=ca&lang=en"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                currently: body.currently.temperature,
                percent: body.currently.precipProbability,
                timeZone: body.timezone,
                pressure: body.currently.pressure,
                windSpeed: body.currently.windSpeed,
            })
        }
    })
}

module.exports = forecast