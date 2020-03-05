"use strict"

/*****************************************************************************/
const validator = require('validator')
const errors = require('@errors').errors
const alwaysResolve = require('@utils/alwaysResolve').alwaysResolve
const ServiceRegister = require('@src/services/serviceRegister').ServiceRegister
/*****************************************************************************/

class TenantProto {
    constructor({
        accessToken,
        id,
        name,
        adminDomain
    }) {
        this.accessToken = accessToken
        this.id = id
        this.name = name
        this.adminDomain = adminDomain
        this.services = new ServiceRegister(this)
    }
}

TenantProto.prototype.getServiceList = function(tenantUpdateReport = null) {

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
    TenantProto
}
