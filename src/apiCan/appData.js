/*****************************************************************************
*
*
******************************************************************************/
"use strict"

/*****************************************************************************/
const config    = require('config')
/*****************************************************************************/
const appData = (function(){

    let _keycloakClientID           = config.get('keycloakClientID')
    let _keycloakClientSecret       = config.get('keycloakClientSecret')
    let _keycloakClientDomain       = config.get('keycloakClientDomain')
    let _settingsDBPath             = config.get('settingsDBPath')
    let _appSecret                  = config.get('appSecret')
    let _appBaseURL                 = config.get('appBaseURL')
    
    return {
        settingsDBPath   : _settingsDBPath, 
        
        appBaseURL          : _baseURL, 
        appSecret           : _appSecret, 
        
        keycloakClientID        : _keycloakClientID, 
        keycloakClientSecret    : _keycloakClientSecret, 
        keycloakClientDomain    : _keycloakClientDomain
    }

})()

module.exports = {
    appData
}
