#!/usr/bin/env node

/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store Management Software 2020
 *
 * Application APICan
 * -------------------------------------
 *  app.js : application entry point, doesn't export anything
 *
 * server code compile with browserify into public/javascripts/bundle.js
 * view system is handlebars (see src/server/viewEngine.js)
 *
 ******************************************************************************/

"use strict"

/*****************************************************************************/
require('module-alias/register')    //uses aliases to express paths to modules in src
/*****************************************************************************/
const appFeatures   = require('@apiCan/appfeatures').appFeatures
const errors        = require('@errors/error').errors
const security      = require('@security/security').security 
/*****************************************************************************/

const appStatus = require('@apiCan/appStatus').appStatus({
    appFeatures, 
    security, 
    errors
}                

/*****************************************************************************/
const path = require('path')
const httpServer    = ('@server/httpServer').httpServer({
    rootPath    : path.join( __dirname ) 
    viewPath    : path.join( __dirname, 'views' ) 
    staticPath  : path.join( __dirname, 'public')
})
const apiCanApp     = require('@apiCan/apiCanApp').apiCanApp( {
    httpServer, 
    appStatus
}) 

const appData       = require('@apiCan/appData').appData
appData.spark( appStatus )                                     //get the app's configuration data
.then( bootReport => apiCanApp.boot( bootReport ))  //start
.then( bootReport => apiCanApp.run( bootReport ))   //application run
.catch ( errors.handler )
/*****************************************************************************/
/*****************************************************************************/
/*****************************************************************************/
