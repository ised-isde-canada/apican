#!/usr/bin/env node

/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store Management Software 2020
 *
 * Application APICan
 * -------------------------------------
 *  app.js : entry point
 *
 * server code compile with browserify into public/javascripts/bundle.js
 * view system is handlebars (see src/server/viewEngine.js)
 *
 ******************************************************************************/

"use strict"

/*****************************************************************************/

require('module-alias/register')
const winston = require('winston')
const appLogger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'info.log'
        })
    ]
});

const createError = require('http-errors')
const Keycloak = require('keycloak-connect')
const session = require('express-session')

const path = require('path')

const appStatus = require('@server/appStatus').appStatus
const tenantsManager = require('@services/tenantsManager').tenantsManager
const scheduler = require('@src/cron/timer.js').scheduler
const appEvents = require('@server/appEvents').appEvents

const db = require('@server/db').appDatabase

const APICan = require('@src/APICan').APICan


const users = require('@users/users').users
const groups = require('@users/groups').groups

db.configure({
        filePath: './settings.db'
    }) //access the database
    .then(APICan.configure) //configure the application engine
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
