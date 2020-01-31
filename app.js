#!/usr/bin/env node

/*******************************************************************************
 * Franck Binard, Innovation Science and Economic Development Canada (ISED)
 * franck.binard@canada.ca
 * 
 * Canadian Gov. API Store Management Software - written in 2020
 * Application APICan
 * Manages GoC API Store (https://api.canada.ca/)
 * -----------------------------------------------------------------------------
 *  app.js : application entry point, doesn't export anything
 *
 * Front-end: 
 * - js code compiles with browserify into public/javascripts/bundle.js
 * - js code for front-end is in ./src/client, uses jquery and 
 *   a other front-end libraries (see ./view/partials/head/jsLibraries)
 * - template engine is handlebars, templates are stored in ./views
 *
 * Back-end: 
 * - uses an express stack
 * - mongodb database
 *
 * Security: 
 * - does not store any user information
 * - only accepts requests from whitelisted ips
 ******************************************************************************/
"use strict"

/*****************************************************************************/
require('module-alias/register')    //uses aliases to express paths to modules in src
/*****************************************************************************/
const appFeatures   = require('@apiCan/appFeatures').appFeatures
const errors        = require('@errors/error').errors({
    appFeatures
})
const report        = require('@report/report').report
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

/*****************************************************************************/
const apiCanApp     = require('@apiCan/apiCanApp').apiCanApp( {
    httpServer, 
    appStatus
}) 

/*****************************************************************************/
const appData       = require('@apiCan/appData').appData
appData.spark( appStatus )                                     //get the app's configuration data
    .then( bootReport => apiCanApp.boot( bootReport ))  //start
    .then( bootReport => apiCanApp.run( bootReport ))   //application run
    .catch ( errors.handler )
/******************************************************************************/
/******************************************************************************
 * end entry point
 ******************************************************************************/
