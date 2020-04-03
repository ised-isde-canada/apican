/*******************************************************************************
 * Canadian Gov. API Store Management Software - written in 2020
 * Application APICan
 * Manages GoC API Store (https://api.canada.ca/)
 * 
 * 2020 - Franck Binard, Innovation Science and Economic Development Canada (ISED)
 *      - Don Vo, Innovation Science and Economic Development Canada (ISED)
 * -----------------------------------------------------------------------------
 *  app.js : application entry point, doesn't export anything
 *
 *****************************************************************************/
"use strict"

/*****************************************************************************/
const http = require('http')
const debug = require('debug')('weirdworld')
/*****************************************************************************/

const normalizePort = function(val) {
    let port = parseInt(val, 10)
    if (isNaN(port)) return val
    if (port >= 0) return port
    return false
}

const onError = function(port, error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = function(addr) {
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

const _httpServer = function( app ) {
    app.server = {}
    require('@server/express').configureExpress( app )
    app.server.port =  process.env.PORT || 3000

    let _server = http.createServer( app.server.express )
    _server.on('error'      , x => onError( app.port , x ))
    _server.on('listening'  , x => onListening( _server.address()))
    app.server.io = require('socket.io')(_server)

    return {

        start   : function(){
           _server.listen(app.server.port, err => {
           })
           app.say(`App running on port ${app.server.port}`)
           return app 
        }
    }
}

const setAppServer = function( app ){
    let server = _httpServer( app ) 
    app.server.start = server.start
    return app
}

module.exports = {
    setAppServer    
}
