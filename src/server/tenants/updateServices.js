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

     this.services.forEach(( _, serviceID) => {
        if (!currentServiceIDs.includes(serviceID)) { //found one shouldn't be in here
            if (!'servicesToRemove' in updateReport) updateReport.servicesToRemove = []
            updateReport.servicesToRemove.push(serviceID)
        }
        })

        console.log(`updating ${fetchedServices.length} service definitions for ${this.name}`)
        fetchedServices.forEach( service => {
            return this.services.updateServiceDefinition(service.service, updateReport)
        })
        return updateReport
    }

    Tenant.prototype.validateAPIs = async function(tenantUpdateReport) {
        //At this stage, we've fetched the list of services from this tenant and
        //its set of documentation
        //if either the service list fetch or the active doc fetch returned errors 
        if (tenantUpdateReport.fetches.serviceList !== errors.codes.Ok ||
            tenantUpdateReport.fetches.activeDocs !== errors.codes.Ok) {
            //report a failed update
            return tenantUpdateReport //update Failed
        }
    
        //extract the services that have billingual documentation
        //these are the only one worth fetching the features for
        let billingualServicesReports = []
        tenantUpdateReport.servicesUpdateReports.forEach(
            serviceUpdateReport => {
                if (serviceUpdateReport.languageUpdate.french === errors.codes.Ok &&
                    serviceUpdateReport.languageUpdate.english === errors.codes.Ok) {
                    billingualServicesReports.push(serviceUpdateReport)
                } else {
                    serviceUpdateReport.updateSuccess = errors.codes.Ok
                }
            })
    
        return tenantUpdateReport
    }

    Tenant.prototype.serviceListingUpdate = function( tenantUpdateReport ){
        return this.getServiceList( tenantUpdateReport )
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
            this.validateAPIs(tenantUpdateReport)
            return tenantUpdateReport
        })

    }
}

module.exports = {
    addServiceUpdateFeature
}
