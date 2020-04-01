"use strict"

const validator = require('validator')
const alwaysResolve = require('@common/utils/alwaysResolve').alwaysResolve
const errors = require('@errors').errors

const activeDocsInterface = function(Tenant){

    Tenant.prototype.getActiveDocsList = function(tenantUpdateReport = null) {
        let apiCall = this.accountAdminBaseURL.activeDocs
        let bad = null

        let processGoodResponse = function(body) {
            if (validator.isJSON(body)) {
                let apiDocs = JSON.parse(body).api_docs
                if (tenantUpdateReport) {
                    tenantUpdateReport.fetches.activeDocs = errors.codes.Ok
                }
                return apiDocs
            }
            return bad //couldn't parse response
       }

       return alwaysResolve(apiCall, {
            good: processGoodResponse,
            bad
       })
    }

   //if the document fetch operation resulted in an error, return here
   /*     if (updateReport.fetches.activeDocs !== errors.codes.Ok) return
     
       })
    }*/

   Tenant.prototype.updateActiveDocs = function( tenantUpdateReport){
       let that = this
       return new Promise((resolve, reject) => {
            this.getActiveDocsList( tenantUpdateReport )
            .then(activeDocs => {
                if(Array.isArray(activeDocs) && activeDocs.length > 0 ){
                    activeDocs.forEach( apiDocObject => {
                        if (apiDocObject.api_doc.published) {
                            that.services.updateServiceDocs( apiDocObject, tenantUpdateReport)
                        }
                    })
                    return resolve( tenantUpdateReport )
                }
                return resolve( tenantUpdateReport )
            })
        })
    }

}

module.exports = {
    activeDocsInterface
}


