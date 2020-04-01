"use strict"
const errors = require('@errors').errors


const addServiceUpdateFeature = function(Tenant){

   Tenant.prototype.updateServiceDefinitions = async function({ fetchedServices, updateReport}) {
     //if the service list update generated an error, return here
     if (updateReport.fetches.serviceList !== errors.codes.Ok) {
        return updateReport
     }

     let currentServiceIDs = fetchedServices.map( //flag services to remove
        service => service.service.id
     )

    this.services.forEach((_, serviceID) => {
        if (!currentServiceIDs.includes(serviceID)) { //found one shouldn't be in here
            if (!'servicesToRemove' in updateReport) updateReport.servicesToRemove = []
            updateReport.servicesToRemove.push(serviceID)
        }
        })

        log(`updating ${fetchedServices.length} service definitions for ${this.name}`)
        fetchedServices.forEach( service => this.services.updateServiceDefinition(service.service, updateReport))
        return updateReport
    }



    Tenant.prototype.serviceListingUpdate = function( tenantUpdateReport ){
        return this.getServiceList()
        .then( services => {
               return this.updateServiceDefinitions({
                    fetchedServices: services,
                    updateReport: tenantUpdateReport
                })
           })
    }


    Tenant.prototype.update =  function(){

        let tenantUpdateReport = new errors.TenantUpdateReport(this.name)
        return Promise.all([ 
            this.serviceListingUpdate(tenantUpdateReport), 
            this.updateActiveDocs( tenantUpdateReport )  ])

        .then( updateResult  => {
            debugger
        })
    }
}

module.exports = {
    addServiceUpdateFeature
}
