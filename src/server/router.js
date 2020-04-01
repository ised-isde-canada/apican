"use strict"

const express = require('express')
//information on tenants passed to the front end
const tenantInfo  = app => app.tenants.list.map(t => {

   return {
       name: t.name,
       id: t.id

      }
   })


const appRoot = function (app){
   return (req, res, next) =>{
      let pageData = {
         title: app.metadata.name,
         tenants: tenantInfo( app ) 
      }
      res.render('index', pageData)
   } 
}

const configureRoutes = function( app ) {

   app.server.express.use('/userGroups', app.userGroups.router)
   //routing to the top level app
    let router = express.Router()    
    app.server.express.use('/', router)
    router.get('/', appRoot(app))
}

module.exports = {
  configureRoutes 
}
