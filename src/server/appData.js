/*****************************************************************************
*
*
******************************************************************************/
"use strict"

/*****************************************************************************/
const config    = require('config')
/*****************************************************************************/

const localData = function( app ){
    app.staticFolder = app.root + '/public'
    return app  
}

const loadLocalAppData = function( app ){
    return new Promise(resolve => {
        localData( app ) 
        return resolve( app )
    })
}

module.exports = {
   loadLocalAppData 
}
