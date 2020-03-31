/*******************************************************************************
 * Canadian Gov. API Store Management Software - written in 2020
 * Application APICan
 * Manages GoC API Store (https://api.canada.ca/)
 * 
 * 2020 - Franck Binard, Innovation Science and Economic Development Canada (ISED)
 *      - Don Vo, Innovation Science and Economic Development Canada (ISED)
 * -----------------------------------------------------------------------------
 *  express configuration
 *****************************************************************************/
"use strict"
 /*****************************************************************************/
const configureExpress = function( app ){

    let express = require('express')

    app.server.express = express()
    app.server.express.use(express.json())
    app.server.express.use(express.urlencoded({
        extended: false
    }))

    const hbs = require('express-handlebars')
    app.server.express.engine('hbs', hbs({
        extname: 'hbs', 
        defaultLayout: 'main', 
        layoutsDir: app.metadata.root + '/views/layouts/', 
        partialsDir: app.metadata.root + '/views/partials/'
    }))
    app.server.express.set('view engine', 'hbs');
    app.server.express.use(express.static( app.metadata.staticFolderPath))


}

module.exports = {
   configureExpress 
}