/*******************************************************************************
 * Canadian Gov. API Store Management Software - written in 2020
 * Application APICan
 * Manages GoC API Store (https://api.canada.ca/)
 * 
 * 2020 - Franck Binard, Innovation Science and Economic Development Canada (ISED)
 *      - Don Vo, Innovation Science and Economic Development Canada (ISED)
 * -----------------------------------------------------------------------------
 *  clock.js : sets the clocks that run various app events 
 *
 *****************************************************************************/
"use strict"
/*****************************************************************************/
const Event = require('@common/time/events').Event


const updateTenantInformation = function( app ){

   app.server.io.emit('updateBottomStatusInfo', {
      serverStatus: `updating tenant information` 
   })
   app.updateTenantInformation()

   app.server.io.emit('updateBottomStatusInfo', {
      serverStatus: `finished updating tenant information` 
   })
 
}
/* clock that updates various 
   information related to tenants  */
const setTenantUpdateClock = function( app ){
   app.tools.createNewClock("tenant info refresh", 
   [  new Event({
		   name		   : 'tenant info refresh', 
		   frequency	: 10, 
		   run			: _ => updateTenantInformation( app )
      })
   ])
}

/* clock that ticks every minute 
   displaying app status         */
const setAliveClock = function( app ){

   let showLife = function(){
      app.processStats.update() 
      .then( _ => {

         app.server.io.emit('updateBottomStatusInfo', {
            serverStatus: `app alive time: ${app.processStats.elapsed}` 
         })

         app.say([
            `time: ${app.processStats.elapsed}`,
            `memory: ${app.processStats.memory}`,
            `cpu: ${app.processStats.cpu}`
            ].join("\n"))
      })
   }

   app.tools.createNewClock("app status", 
   [  new Event({
         name      : 'app status', 
         frequency : 1, 
         run       : showLife 
      })
   ])
}

const setClocks = function( app ){
   setTenantUpdateClock( app )
   setAliveClock(app)
}
	
module.exports = {
   setClocks
}