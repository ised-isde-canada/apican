/*******************************************************************************
 * Canadian Gov. API Store Management Software - written in 2020
 * Application APICan
 * Manages GoC API Store (https://api.canada.ca/)
 * 
 * 2020 - Franck Binard, Innovation Science and Economic Development Canada (ISED)
 *      - Don Vo, Innovation Science and Economic Development Canada (ISED)
 * -----------------------------------------------------------------------------
 *  eventRegister.js 
 *
 *****************************************************************************/
"use strict"
/*****************************************************************************/

const eventRegistrar = (function(){

   let _events = new Map() 
   let _eventsRouter = require('express').Router()
   _eventsRouter.get('/', (req, res) => {
      let resultArray = []
      _events.forEach( event => {
         resultArray.push({
            id: event.id, 
            frequency: event.frequency, 
            last: event.last, 
            name: event.name, 
            next: event.next
         })
      })
      res.send(resultArray)
   })

   return {
      router : _eventsRouter, 
      register : function(event){
         _events.set(event.id, event)
      }
   }
})()

const addModule = function( app ){
   return new Promise((resolve, reject)=>{
      app.eventsRegistrar = eventRegistrar
      app.healthCheck['Event Registrar'] = true
      return resolve( app )
   })
}

module.exports = {
   addModule
}