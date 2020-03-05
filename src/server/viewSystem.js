/******************************************************************************
 * ---------------------------------------------------------------------------
 *
 * ***************************************************************************/
"use strict"

const hbs = require('express-handlebars')
const viewSystem = function ( app ) {

    app.express.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: app.root + '/views/layouts',
        partialsDir: app.root + '/views/partials/'
    }))
    app.express.set('view engine', 'hbs')
    return app
}


const addViewEngine = function( app ){
    return viewSystem( app )
}
module.exports = {
   addViewEngine 
}