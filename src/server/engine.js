"use strict"
/******************************************************************************
 * 
 * 20200000000000000000000000000000
 *
 * app engine setup  
 * ***************************************************************************/

/*****************************************************************************/
const winston  = require('winston')
/*****************************************************************************/
const moment   = require('moment')
/*****************************************************************************/

const newLogger = function( fileName ){
    if(! fileName){
        return winston.createLogger({
            level       : 'info', 
            format      : winston.format.simple(), 
            transports  : [
                new winston.transports.Console()
            ]
        }) 
    }
}

const configApp = function( app ){
   return new Promise((resolve, reject) => {
      let _consoleLogger  = newLogger()
      let _appLogger      = _consoleLogger
      app.startTime = moment() 
      app.say = msg => {
         _appLogger.info( msg )
         console.log( msg )
      }
      app.say(`Starting ${app.metadata.name} on ${app.startTime}`)
      return resolve(app)
   })
}


const mountAppEngine = function( app ){

   return configApp(app)
   .then( app => {
        app.routers = []
        return app
    })
}

module.exports = {
   mountAppEngine
}