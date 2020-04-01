/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * 
 * Application APICan - Feb 2020
 * -------------------------------------
 *  serviceProto.js : prototype class for service class
 *
 ******************************************************************************/
"use strict"

/*****************************************************************************/
const validator = require('validator')
/*****************************************************************************/

class DocumentationSet {

    constructor(docObj) {
        if ('body' in docObj && validator.isJSON(docObj.body)) {
            let swaggerInfo = JSON.parse(docObj.body)
            if ('x-api-store-tags' in swaggerInfo) {
                this.tags = swaggerInfo["x-api-store-tags"]
            }
        }
        Object.assign(this, docObj)
    }
    
}

module.exports = {
    DocumentationSet
}