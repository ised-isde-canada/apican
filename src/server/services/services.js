/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * Application APICan - 2020
 * -------------------------------------
 *  Module services.js
 *
 *  class definition and implementation for services 
 *
 ******************************************************************************/
"use strict"
const errors = require('@errors').errors
const DocumentationSet  = require('@server/services/documentationSet').DocumentationSet

class ServiceDocumentation {
    constructor(serviceID) {
        this.serviceID = serviceID
        this.fr = null
        this.en = null
    }
}

class ServiceProto {
    constructor({
        id,
        serviceProvider
    }) {
        this.id = id
        this.serviceProvider = serviceProvider
        this.features = new Map()
    }

    storeUpdateFeature({
        featureCategory, 
        featureID, 
        featureName
    }){
        if(! this.features.has( featureCategory )){
            this.features.set( featureCategory, [])
        }

        let category        = this.features.get( featureCategory )
        let storedFeature   = category.find(feature => feature.id === featureID)

        if( storedFeature && storedFeature.name === featureName){ //nothing to update

        } else if( storedFeature ) {
            storedFeature.name = featureName
        } else {
           category.push({
               id: featureID, 
               name: featureName
           }) 
        }
    }
}

class Service extends ServiceProto {

    constructor(serviceID, tenant) {
        super({
            id  : serviceID,
            serviceProvider : tenant
        })
        this.documentation      = new Map()
        this.publishable        = false
        this.public             = false
    }

    get tenant() {
        return this.serviceProvider
    }

    get bilingual() {
        return this.documentation.size === 2
    }
}

Service.prototype.addDocumentationSet = function(docObj, tenantUpdateReport) {

    let serviceReport = tenantUpdateReport.serviceReport(this.id)

    if (/\-fr$/i.test(docObj.system_name)) {
        //French documentation		
        serviceReport.languageUpdate.french = errors.codes.Ok
    } else if (/\-en$/i.test(docObj.system_name)) {
        //English documentation		
        serviceReport.languageUpdate.english = errors.codes.Ok
    } else {
        //neither English nor French documentation
        return
    }

    if( docObj.published){
        this.documentation.set(
            docObj.system_name.toLowerCase(), 
            new DocumentationSet(docObj))
        if(this.documentation.size === 2) this.publishable = true
    }

}

module.exports = {
    Service
}