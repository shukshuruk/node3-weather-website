const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars angine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mariia Kabanova'
    })
})

app.get('/about', (rep, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mariia Kabanova'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message',
        title: 'Help',
        name: 'Mariia Kabanova'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article is not found',
        name: 'Mariia Kabanova'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page is not found',
        name: 'Mariia Kabanova'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on 3000')
})