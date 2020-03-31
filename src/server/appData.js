/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * Application APICan
 * -------------------------------------
 *  APICanData
 *
 *  Handles and manages critical app data 
 *
 ******************************************************************************/
"use strict"

/*****************************************************************************/
const config = require('config')
const expect = require('chai').expect
/*****************************************************************************/

const normalizePort = function( val){
    let port = parseInt(val, 10)
    if( isNaN (port))   return val    
    if( port >= 0 )     return port
    return false
}
const getMasterConfigInfo = function() {
    let tenantsConfigurationInfo = config.get('master')
    expect(tenantsConfigurationInfo).to.exist
    expect(typeof tenantsConfigurationInfo).to.eql('object')
    return tenantsConfigurationInfo
}

const getJiraAuthCredentials = function() {
    return {
        password: config.get('jiraRequestPassword'),
        username: config.get('jiraRequestUserName')
    }
}

const _getKeycloakCredentials = function(env) {
    return {
        keycloakURL     : config.get('keycloakURL'),
        keycloakClient: config.get('keycloakClient'),
        keycloakSecret: config.get('keycloakSecret')
    }
}

const APICanData = function( app ) {
    //processes the configuration data stored in 
    //the default.json file
    app.tenants.register = new Map()
    let _appConfigurationData = getMasterConfigInfo()
    _appConfigurationData.tenants.forEach(t => {
        if(t.visible) app.tenants.register.set(t.name, t)
    })
    let _configurationEnv = _appConfigurationData.env

    let _jiraAuthCredentials = null 
    try {
        _jiraAuthCredentials = getJiraAuthCredentials()
    } catch {
        _jiraAuthCredentials = null 
    }
    let _keycloakCredentials = null
    try { 
        _keycloakCredentials = _getKeycloakCredentials( )
    } catch {
        _keycloakCredentials = null
    }
    let _APIStoreUserName = null
    try { 
        _APIStoreUserName = config.get('APIStoreUserName')
    } catch{
        _APIStoreUserName = null
    }

   
    return {

        port: normalizePort( process.env.PORT || 3000 ), 

        env: _appConfigurationData,

        apiStoreUserName: _APIStoreUserName,

        jiraAuthCredentials: _jiraAuthCredentials,

        keycloakCredentials: _keycloakCredentials,

    }

}

const getAppData = function( app ){
    app.featureSystem.addComponent({
        label: 'tenants'
    })
    return new Promise((resolve)=> {
        app.featureSystem.addComponent({
            label: 'data', 
            methods: APICanData(app)
        })
        Object.defineProperty(app.tenants, 'list', { get: function() {
            let tenantObjects = []
            app.tenants.register.forEach(val => tenantObjects.push(val))
            return tenantObjects
        }})
        return resolve(app)
    })
}

module.exports = {
    getAppData
}
