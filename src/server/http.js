/******************************************************************************
 * ---------------------------------------------------------------------------
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const debug = require('debug')('apiCan::server');
const http = require('http')
/*****************************************************************************/

const normalizePort = function(val) {
    let port = parseInt(val, 10)
    if (isNaN(port)) return val
    if (port >= 0) return port
    return false
}

const onError = function(port) {
    return (error) => {
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
}

const onListening = function(addr) {
    let bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

const defaultListener = function(req, res){
    res.writeHead( 200 )
    res.end('nothing here')
}

const httpServer = function( app ) {

    app.port =  app.implements('localData.port')
                ? app.port
                : normalizePort(process.env.PORT || '3000')

    let _server = http.createServer(
        app.implements('express')
        ? app.express
        : defaultListener
    )
    _server.on('error', x => onError(_port))
    _server.on('listening', x => onListening(_server.address()))

    return {
        start : () => {
            _server.listen( app.port )
        }
    }
}


const addFeature = function( app ){
    app.server = httpServer( app )
    app.addFeature({label:"server"})
}

module.exports = {
  addFeature 
}