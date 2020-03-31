"use strict"

const getCompleteGroupDefinition = function(app, id) {

    let groupDefiniton = null 
    return app.localDatabase.getAllTableRows({
        table: 'groups', 
        where: `ID = ${id}`})

    .then( result => {
        if( Array.isArray( result ) && result.length > 0 ){
           return result[0]
        }
    })

    .then( group => {
        groupDefiniton = group
        return app.localDatabase.getAllTableRows({
            table: 'lnkGroupsProperties', 
            where: `[group]=${id}`
        })
    })

    .then( groupProperties =>{
        groupDefiniton.properties = groupProperties.map( rec => rec.property ) 
        return app.localDatabase.getAllTableRows({
            table: 'lnkGroupsTenants', 
            where: `[group]=${id}`
        })
    }) 

    .then( groupTenants =>{
        groupDefiniton.tenants = groupTenants.map( rec => rec.tenant)
        return groupDefiniton
    })
}

const getGroupDefinitions = function( app ){
       
    return new Promise((resolve, reject) => { //gets the groups definitions and properties from database
        app.localDatabase.getAllTableRows({
            table: 'groups', 
            where: null
        })
        .then( groupData => {
           return resolve( groupData ) 
        })
    })
}

module.exports = {
   getCompleteGroupDefinition,
   getGroupDefinitions
}