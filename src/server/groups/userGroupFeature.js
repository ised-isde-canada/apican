/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * -------------------------------------
 *  /server/users/groups.js
 *
 * User Group Structure 
 ******************************************************************************/
"use strict"
/*****************************************************************************/
const _ = require('underscore')
/*****************************************************************************/

const configureUserGroupRouter = function (app ){

    let groupRouter = require('express').Router()
    app.userGroups.router = groupRouter

    groupRouter.get('/', (req, res, next)=>{
        if('query' in req && 'id' in req.query){ //return a complete groupDefinition
            return app.userGroups.getCompleteGroupDefinition(req.query.id, app.localDb)
            .then( result => {
                    result.tenants = _.intersection(
                        result.tenants, 
                        app.tenants.list.map(tenant => tenant.name))
                    res.send(result)
            })
        }
        return app.userGroups.getGroupDefinitions()
        .then( result => res.send(result) )
    })  
    
    groupRouter.post('/', (req, res, next)  => {


    })

    groupRouter.delete('/', (req, res, next)=>{
        let groupID = req.body.id
        return app.userGroups.deleteUserGroup(groupID)
        .then(_ => {
            res.send({ok: 1})
        })
    })  

    groupRouter.get('/users', (req, res, next)  => {

    })
}


const addFeature = function( app ){
    app.userGroups = {

    } 

    app.userGroups.getGroupDefinitions = x => {
        return require('@server/groups/getDefinitions').getGroupDefinitions( app )
    }

    configureUserGroupRouter( app )
    return app 
}


module.exports = {
    addFeature
}