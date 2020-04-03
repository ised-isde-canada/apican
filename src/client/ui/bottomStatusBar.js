/*******************************************************************************
 * Franck Binard, ISED (FranckEinstein90)
 *
 * APICan application - Feb 2020
 * -------------------------------------
 *  Canadian Gov. API Store middleware - client side
 *
 *  ui feature for bottom status bar of client app
 ******************************************************************************/
"use strict"
/******************************************************************************/

/******************************************************************************/


const bottomStatusBar = function( app ){

    let msgs = {
        clientStatus: 'client loaded', 
        serverStatus: 'waiting for message', 
        queryStatus: 'N/A'
    } 

    let updateTicker = () => {
        let statusBarContent = [
            `client: ${msgs.clientStatus}`, 
            `server: ${msgs.serverStatus}`, 
            `query: ${msgs.queryStatus}`
        ].join(' | ')
        $('#bottomStatusBar').text(statusBarContent)
    }

    app.socket.on('updateBottomStatusInfo', function( data ) {
        if('serverStatus' in data){
            msgs.serverStatus = data.serverStatus
        }
        updateTicker()
    })

    updateTicker()
    return app
}


const addFeature = function( app ){
    return bottomStatusBar(app)
}

module.exports = {
    addFeature
}
