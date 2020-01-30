#!/usr/bin/env node

/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store Management Software 2020
 *
 * Application APICan
 * -------------------------------------
 *  app.js : application entry point
 *
 * server code compile with browserify into public/javascripts/bundle.js
 * view system is handlebars (see src/server/viewEngine.js)
 *
 ******************************************************************************/

"use strict"

/*****************************************************************************/

require('module-alias/register')

const security = require('@src/security').security
const appStatus = require('@src/appStatus').appStatus                    //boot configuration data
const db = require('@server/db').appDatabase
const apiCanApp = require('@src/apiCanApp').apiCanApp( appStatus )

db.configure({
        filePath: './settings.db'
    }) //access the database
    .then(bootReport => APICanApp.configure (bootReport)) //configure the application engine
    .then(users.onReady)
    .then(groups.onReady)
    .then(appStatus.enableKeyCloak())
    .then(tenantsManager.configure)
    .then(tenantsManager.updateTenantInformation)
    .then(correctFetchErrors)
    .then(setTimerRefresh)

const memoryStore = new session.MemoryStore()
//const keycloak = new Keycloak({store: memoryStore })

//express app stack setup
const app = require('@server/expressStack').expressStack({
    root: __dirname,
    staticFolder: path.join(__dirname, 'public'),
    faviconPath: __dirname + '/public/LOGO139x139.png'
})

const routingSystem = require('@server/routingSystem').routingSystem({
    app
})

const server = require('@server/httpServer').httpServer({
    app,
    defaultPort: '3000'
})

const io = require('socket.io')(server.server())
const messages = require('@server/messages').messages
messages.init(io)
