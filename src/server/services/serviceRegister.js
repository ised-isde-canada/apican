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


module.exports = {
    ServiceRegister
}