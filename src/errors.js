/***********************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * -------------------------------------
 *  Module errors / server side
 *
 *  includes error handlers and reporting objects 
 **********************************************************/

"use strict"


const moment = require('moment')
const errors = (function() {

    class UpdateReport {
        constructor() {
            this.beginUpdateTime = moment()
            this.updateSuccess = errors.codes.NotOk
            this.fetches = {}
            this.endUpdateTime = null
        }
    }


    return {
        codes: {
            ServiceDefinitionUpdate: "Service Definition Update",
            EnglishDoc: "English Document Update",
            FrenchDoc: "French Document Update",
            NotOk: "Not Ok",
            Ok: "Ok"
        },

        AppError: class extends Error {
            constructor(args) {
                super(args)
                this.name = "ISEDMidWare Error"
            }
        },

        TenantUpdateReport: class extends UpdateReport {

            constructor(tenantName) {
                super()
                this.tenantName = tenantName

                //success of fetching list of service for tenant
                this.fetches.serviceList = errors.codes.NotOk
                this.fetches.activeDocs = errors.codes.NotOk

                //report on this tenant's service updates
                this.servicesUpdateReports = []
            }
        },

        ServiceUpdateReport: class extends UpdateReport {

            constructor(tenantName, serviceID) {
                super()
                this.id = `${tenantName}_${serviceID}`
                this.languageUpdate = {
                    french: errors.codes.NotOk,
                    english: errors.codes.NotOk
                }
                this.featuresUpdate = errors.codes.NotOk
            }

        },

        log: function(errDescription) {

        },

        errorHandler: function(err) {
            console.log('went to error handler')
        }
    }

})()

errors.TenantUpdateReport.prototype.updateOk = function() {
    //returns true if all necessary fields of the update turned out ok
    return (
        this.fetches.serviceList === errors.codes.Ok &&
        this.fetches.activeDocs === errors.codes.Ok)

}

errors.TenantUpdateReport.prototype.PropertyOk = function(serviceID, propertyName) {
    if (this.updatedServices.has(serviceID)) {
        let updateServiceReport = this.updatedServices.get(serviceID)
        if (propertyName in updateServiceReport) {
            if (updateServiceReport[propertyName] === errors.codes.Ok) return true
        }
    }
    return false
}

errors.TenantUpdateReport.prototype.englishDocOk = function(serviceID) {
    return this.PropertyOk(serviceID, errors.codes.EnglishDoc)
}

errors.TenantUpdateReport.prototype.filterAllOk = function() {
    //returns an array of services filtered as: 
    //EnglishDoc OK, FrenchDoc OK,
    let servicesToDisplay = []
    this.updatedServices.forEach(
        (serviceReport, serviceID) => {
            if (
                this.PropertyOk(serviceID, errors.codes.ServiceDefinitionUpdate) &&
                this.PropertyOk(serviceID, errors.codes.EnglishDoc) &&
                this.PropertyOk(serviceID, errors.codes.FrenchDoc)
            ) {
                servicesToDisplay.push(serviceID)
            }
        })
    return servicesToDisplay
}

errors.TenantUpdateReport.prototype.serviceReport = function(serviceID) {

    //if there wasn't already an update report for that 
    //service, create a new one
    let serviceReport = this.servicesUpdateReports.find(r => r.id === `${this.tenantName}_${serviceID}`)
    if (!serviceReport) {
        serviceReport = new errors.ServiceUpdateReport(this.tenantName, serviceID)
        this.servicesUpdateReports.push(serviceReport)
    }
    return serviceReport
}

module.exports = {
    errors
}