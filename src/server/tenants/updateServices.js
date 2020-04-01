"use strict"

const addServiceUpdateFeature = function(Tenant){

    Tenant.prototype.serviceListingUpdate = function( ){
        return this.getServiceList()
        .then( services => {
            return services
        })
    }
}

module.exports = {
    addServiceUpdateFeature
}