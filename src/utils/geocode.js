const request = require("request");


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2VyZ2ktcyIsImEiOiJjazd3OW9nNm0wMDEwM2VwbmZydTBpaWwyIn0.rxkfWBASjdtzFdfhveobpQ&limit=1"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services", undefined)
        } else if (!body.features[0]) {
            callback("Cant find loaction", undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;