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
/*****************************************************************************/

class ServiceRegister extends ServiceRegisterProto {
    constructor(tenant) {
        super()
        this.tenant = tenant
    }

    set({
        id,
        tenant
    }) {
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


module.exports = {
    ServiceRegister
}