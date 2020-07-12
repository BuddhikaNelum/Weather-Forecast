const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Buddhika Nelum'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Buddhika Nelum'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'This is some helpful text',
        name: 'Buddhika Nelum'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search tearm'
        })
    }

    geocode(req.query.address, (error, {latitude ,longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude,'m', (error, data) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error: 'You must provide a search tearm'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Buddhika Nelum',
        error: 'Help artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Buddhika Nelum',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is listing on port ' + port)
})