"use strict"

const express = require('express')

const appRoot = function (app){
   return (req, res, next) =>{
      console.log( app )
      let pageData = {
       title: app.metadata.name,
       tenants: app.tenants.list 
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