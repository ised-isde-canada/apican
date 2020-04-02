/***********************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * -------------------------------------
 *  Module tenantsManager / server side
 *
 *  - manages a store of tenants
 *  - replies to API requests userInfo.json and apiInfo.json
 *  - updates the tenant and service information on a schedule
 **********************************************************************************/
"use strict"

/**********************************************************************************/
const moment = require('moment')
const Tenant = require('@tenants/tenants').Tenant
/**********************************************************************************/
const updateTenantInformation = ( app, tenantsList = null ) => {
    let _tenants = app.tenants.list

    let tenantsToUpdate = tenantsList 
        ? tenantsList.map(tName => _tenants.find(t => t.name === tName))
        : /*all*/ _tenants

    return Promise.all(tenantsToUpdate.map(tenant => {
            return tenant.update()
        }))
}


const tenantsManager = function( app ) {

    app.tenants.list.forEach( t => {
        let tObj = new Tenant(t)
        app.tenants.register.set(t.name, tObj)
    })

    app.updateTenantInformation = tenantsList=> updateTenantInformation(app, tenantsList)
    return app
} 

const addTenantManagementModule = function( app ){
    return tenantsManager(app)
}
module.exports = {
   addTenantManagementModule 
}