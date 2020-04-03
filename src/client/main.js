/*******************************************************************************
 * Franck Binard, ISED (FranckEinstein90)
 *
 * APICan application - 2020
 * -------------------------------------
 *  Canadian Gov. API Store middleware - client side
 *
 *  main.js: entry point 
 ******************************************************************************/
"use strict"
/******************************************************************************/

/******************************************************************************/


$(function() {
    
    let apiCanClient = {
        tenants     : null, 
        adminTools  : null,
        handleError : null, 
        server      : {

        }, 
        ui                  : null
      
    }
    apiCanClient.socket = io()
    require('../common/features').addFeatureSystem( apiCanClient )
    require('./tenants').addTenantCollection({
        clientApp: apiCanClient, 
        containerID: 'tenantCards'
    })

    .then( app => {  
        app.featureSystem.addComponent({
            label: 'userGroupManagement'
        })
        require('./ui/main').addUiComponent( app )
        require('./events/main').addAdminTools( app )

    })    
  

})
