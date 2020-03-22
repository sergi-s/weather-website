const path = require('path')
const express = require('express')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Definr paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates")

// setup ejs engine and views location
app.set("view engine", "ejs")
app.set("views", viewsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Sergi Samir",
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Sergi",
    })
})
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Sergi"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provid address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log(forecastData)
            res.send({
                forecast: forecastData.summary + " it's currently " + forecastData.currently + ", There is " + forecastData.percent + "% of raining.",
                location,
                address: req.query.address
            })
        })
    })

})

app.get("/help/*", (req, res) => {
    res.render("error", {
        error_message: "Help artical not found",
        name: "sergi",
        title: "404"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        name: "sergi",
        error_message: "page Not found",
        title: "404"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})