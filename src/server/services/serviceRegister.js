/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * Application APICan - 2020
 * -------------------------------------
 *  class ServiceRegister.js
 *
 *  class definition and implementation for service registers
 *
 ******************************************************************************/

"use strict"

/*****************************************************************************/
const moment = require('moment')
/*****************************************************************************/
const ServiceRegisterProto = require('@services/serviceRegisterProto').ServiceRegisterProto
const Service = require('@server/services/services').Service
const errors = require('@errors').errors
/*****************************************************************************/

class ServiceRegister extends ServiceRegisterProto {

    constructor(tenant) { 
        super() 
        this.tenant = tenant 
    }

    set({ id, tenant }) {
        super.set({
            id,
            value: new services.Service(id, tenant)
        })
    }

    length( options ){

        if( options ){
            if('bilingual' in options) {
                let numBilingual = 0
                this.forEach( service => {
                    numBilingual += service.publishable ? 1 : 0
                })
                return numBilingual
            }
        }
        return super.length
    }
}

ServiceRegister.prototype.listServices = function() {
    //returns a list of service description in an array

    let result = []

    this.forEach((service, serviceID) => {
        let serviceFeatures = []
        service.features.forEach((featureInfo, category)=> {
           serviceFeatures.push({
               category, 
               featureInfo
           })
        })
        result.push({
            name: service.name,
            id: serviceID,
            tenant: service.tenant.name, 
            publishable: service.publishable,
            public: service.public, 
            created: moment(service.created_at).format('YY/M/D'),
            updated: moment(service.updated_at).format('YY/M/D'),
            state: service.state, 
        })
    })

    return result
}

ServiceRegister.prototype.updateServiceDocs = function(docObj, updateReport) {

    let serviceID = docObj.api_doc.service_id

    if (!this.register.has(serviceID)) {
        //register service if it isn't yet
        this.register.set( serviceID, new Service(serviceID, this.tenant))
        this.ids.push(serviceID)
    }

    let service = this.register.get(serviceID)
    return service.addDocumentationSet(docObj.api_doc, updateReport)
}

ServiceRegister.prototype.updateServiceDefinition =
    function(serviceDefinitionObject, updateReport) {
        //receives the result of a service definition fetch
        //and updates or create a new service object 
        //in this tenant service register
        let serviceID           = serviceDefinitionObject.id
        let serviceObject       = null
        let serviceUpdateReport = null

        if (! this.has(serviceID) ) { //this service is not registered
            serviceObject = new Service(serviceID, this.tenant)
            this.register.set(serviceID, serviceObject)
        } //now it is

        serviceObject = this.get( serviceID )
        serviceObject.updateDefinition(serviceDefinitionObject)

        serviceUpdateReport = updateReport.serviceReport( serviceID)
        serviceUpdateReport.serviceDefinitionUpdate = errors.codes.Ok
    }


module.exports = {
    ServiceRegister
}