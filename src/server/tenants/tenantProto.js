/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * Application APICan
 * -------------------------------------
 *  tenantProto.js : prototype class for Tenant class
 *
 ******************************************************************************/

"use strict"
/*****************************************************************************/
const validator = require('validator')
const errors = require('@errors').errors
const ServiceRegister = require('@services/serviceRegister').ServiceRegister
const alwaysResolve = require('@common/utils/alwaysResolve').alwaysResolve
/*****************************************************************************/
let planJsonObjectToserviceID = function(planInfo) {
    let serviceLink = planInfo.links.find(link => {
        return link.rel === "service"
    })
    let serviceID = /\d+$/.exec(serviceLink.href)
    return {
        serviceID: Number(serviceID[0]), //service id
        planID: planInfo.id
    }
}

class ServiceProvider {
    constructor({
        accessToken,
        id,
        name,
        adminDomain
    }) {
        this.accessToken = accessToken
        this.id = id
        this.name = name
        this.services = new ServiceRegister(this)
        this.adminDomain = adminDomain
        this.baseURL = `https://${this.adminDomain}/admin/api/`
        this.accountAdminBaseURL = {
            services: `https://${this.adminDomain}/admin/api/services.json?access_token=${this.accessToken}`,
            activeDocs: `${this.baseURL}active_docs.json?access_token=${this.accessToken}`,
            userPlans: email => `${this.baseURL}accounts/find?access_token=${this.accessToken}&email=${encodeURIComponent(email)}`
        }
    }
}


ServiceProvider.prototype.getServiceList = function(tenantUpdateReport = null) {

    let apiCall = [
        `https://${this.adminDomain}/admin/api/`,
        `services.json?access_token=${this.accessToken}`
    ].join('')

    let bad = null //tenants.codes.serviceUpdateError

    let good = function(body) {
        if (validator.isJSON(body)) {
            let apis = JSON.parse(body).services
            if (tenantUpdateReport) {
                tenantUpdateReport.fetches.serviceList = errors.codes.Ok
            }
            return apis
        }
        return bad
    }

    return alwaysResolve(apiCall, {
        good,
        bad
    })
}

module.exports = {
    ServiceProvider
}