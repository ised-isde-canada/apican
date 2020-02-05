"use strict"

/*****************************************************************************/
const Keycloak = require('keycloak-connect')
const express   = require('express')
const cors      = require('cors')
const session   = require('express-session')
/*****************************************************************************/
/*****************************************************************************/
const appMemStore  = require('@users/memStore').appMemStore
const appData   = require('@src/appData').appData
const appRoot   = require('@routes/appRoot').appRoot
const appStatus = require('@src/appStatus').appStatus
/*****************************************************************************/
const user = require('@user/user').user
/*****************************************************************************/
const whiteList = []

const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== 1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


const routingSystem = function({
    app
}) {

    let router = express.Router()
    app.use(session({
        secret: appData.appSecret, 
        resave: true, 
        saveUninitialized: false, 
        store: appMemStore 
    }))

    app.use(keycloak.middleware())

    app.use('/', router)
    
    router.get('/login', keycloak.protect(), function(req, res){
    router.get('/', keycloak.protect(), appRoot.render)

    router.get('/appStatus', keycloak.protect(), appStatus.getStatus)

    router.get('/tenants',              keycloak.protect(), tenantRoutes.getTenants)
    router.get('/refreshTenants',       keycloak.protect(), tenantRoutes.getRefreshTenants)
    router.get('/getTenantAccounts',    keycloak.protect(), tenantRoutes.getTenantAccounts)

    router.get('/serviceInspect', keycloak.protect(), serviceInspectRoutes.getServiceInfo)
    
    router.get('/schedule',     keycloak.protect(), scheduler.getSchedule)    //get an event
    router.post('/schedule',    keycloak.protect(), scheduler.postSchedule)  //schedule a new event

    router.get('/logs', keycloak.protect(), logs.getLogs)  //get ip logs
	    
    //get sets of users based on various criteria           
    router.get('/findUsers',    keycloak.protect(), userGroupRoutes.findUsers)
    router.get('/groupUsers',   keycloak.protect(), userGroupRoutes.getGroupUsers)
    router.get('/groups',       keycloak.protect(), userGroupRoutes.getGroupList)
    router.delete('/group',     keycloak.protect(), userGroupRoutes.deleteUserGroup)
    router.post('/newUserGroup',keycloak.protect(), userGroupRoutes.postNewUserGroup)
   

    //unprotected service routes (answers to apiJson, userinfoJson and support requests 
    router.get('/userinfo.json', apiStoreUserRoutes.getUserInfo)
    router.get('/api.json', apiStoreUserRoutes.getApi)
    router.post('/support', cors(corsOptions), apiStoreUserRoutes.postJiraRequest)


    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    })
}

module.exports = {
    routingSystem
}
