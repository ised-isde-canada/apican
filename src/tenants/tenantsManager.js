/***********************************************************************************
 * Canadian Gov. API Store middleware
 * 2020
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
/**********************************************************************************/
const APICanData = require('@src/APICanData').APICanData
const t = require('@src/responses').tenants
const UserAccount = require('@src/accounts').accounts.UserAccount
const errors = require('@src/errors').errors
const db = require('@server/db').appDatabase
/**********************************************************************************/

const tenantsManager = (function() {

    let _tenants = []
    let _updateRegister = new Map()

    let _userInfoResponse = 
    let _userApiInfoResponse = 

    return {
        ready: function()

        getTenant: tenantName => tenants.find(t => t.name === tenantName),

        tenants: () => tenants,

        lastUpdate: tenantName => {
            //Returns the last update
        },

        update: async function(listToUpdate = null) {
            //Called by cron job, updates all 
            //tenant information in memory

        },

        getApiInfo: function({
            userEmail,
            language, 
            tenantDomain
        }) {

        },

        getUserInfo: async function({
            userEmail,
            language
        }) {

        }
    }
})()

module.exports = {
    tenantsManager
}
