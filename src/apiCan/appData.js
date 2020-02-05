"use strict"

/*****************************************************************************/
const config    = require('config')
/*****************************************************************************/
const appData = (function(){

    let _keycloakClientID       = config.get('keycloakClientID')
    let _keycloakClientSecret   = config.get('keycloakClientSecret')
    let _keycloakClientDomain   = config.get('keycloakClientDomain')
    let _settingsDBPath     = config.get('settingsDBPath')
    let _appSecret          = config.get('appSecret')
    
    return {
        settingsDBPath   : _settingsDBPath, 
        baseURL          : "http://localhost:3000/logout/callback", 
        appSecret        : _appSecret
    }

})()

module.exports = {
    appData
}