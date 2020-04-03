"use strict"

const express = require('express')
//information on tenants passed to the front end
const tenantInfo  = app => app.tenants.list.map(t => {
   let totalServiceCount     = t.services.length()
   let bilingualServiceCount = t.services.length({
       bilingual : true
   })
   let services = t.services.listServices()
   return {
       name: t.name,
       id: t.id,
     //  lastUpdate  : tenantsManager.lastUpdate(t.name).format('H:m'), 
       totalServiceCount,  
       bilingualServiceCount,
       numVisibleServices: t.services.length({
           visibleOnly: 1
       })
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
   app.server.express.use('/services', app.services.router)
   app.server.express.use('/events', app.eventsRegistrar.router)
   //routing to the top level app
    let router = express.Router()     
    app.server.express.use('/', router)
    router.get('/', appRoot(app))
}

module.exports = {
  configureRoutes 
}
