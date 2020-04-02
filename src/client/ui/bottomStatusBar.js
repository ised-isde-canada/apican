/*******************************************************************************
 * Franck Binard, ISED (FranckEinstein90)
 *
 * APICan application - Feb 2020
 * -------------------------------------
 *  Canadian Gov. API Store middleware - client side
 *
 *  ui feature
 *
 ******************************************************************************/
"use strict"
/******************************************************************************/

/******************************************************************************/


const addFeature = function( app ){
    app.socket.on('updateBottomStatusInfo', function(data) {
        $('#bottomStatusBar').text(data.message)
    })
    return app 
}

module.exports = {
    addFeature
}
