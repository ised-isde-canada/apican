"use strict"
/******************************************************************************
 * WeirdWorld - By FranckEinstein90
 * 20200000000000000000000000000000
 *
 * entry point
 * - sets up database
 * - gets config variables and what nots
 * - says everything a go, app is booting
 *
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
        let appRun = function(){
            if(app.routers && app.routers.length > 0){
                app.routers.forEach( path => {
                    app.expressStack.use( path.route, path.router )
                })
            }
            app.server.start()
            app.say(`${app.metadata.name} now running`)
        }
 

        app.featureSystem.add({
            label     : 'run', 
            method    : appRun, 
            mountFile : __filename
        })

        return app
    })
}

module.exports = {
   mountAppEngine
}