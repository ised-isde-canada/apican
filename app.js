#!/usr/bin/env node

/*******************************************************************************
 * Canadian Gov. API Store Management Software - written in 2020
 * Application APICan
 * Manages GoC API Store (https://api.canada.ca/)
 * 
 * 2020 - Franck Binard, Innovation Science and Economic Development Canada (ISED)
 *      - Don Vo, Innovation Science and Economic Development Canada (ISED)
 * -----------------------------------------------------------------------------
 *  app.js : application entry point, doesn't export anything
 *
 *****************************************************************************/
"use strict"
/*****************************************************************************/
require('module-alias/register')    //uses aliases to express paths to modules in src
const path = require('path')
/*****************************************************************************/
const app = { 

	metadata : {
		name	: 'apiCan', 
		root	: __dirname, 
		staticFolderPath 	:  path.join(__dirname, 'public') ,
		localDatabaseName	: 'settings.db', 
	},

	healthCheck : {
		localDatabase : false
	}
}

require('@common/features').addFeatureSystem( app )
require('@server/appData').getAppData( app )
require('@tenants/tenantsManager').addTenantManagementModule( app )
require('@common/time/chronos').addTimerFeature( app )
require('@server/groups/userGroupFeature').addFeature( app )
require('@server/server').setAppServer( app )
require('@server/services/serviceRouter').addServiceModule( app )
require('@server/engine').mountAppEngine( app )	//returns a promise

.then( require( '@server/db').mountLocalDatabase )
.then( require( '@server/process').addProcessStatsFeature )
.then( require('@common/time/moduleEventsRegister').addModule( app ))
.then( _ => {
	return app.updateTenantInformation()
	/*	updates the primary information for each tenants
		and the services the offer								*/
})
.then( _ => { //run the app

	app.say("******* App component status:")
	Object.keys(app.healthCheck).forEach( key=> {
		app.say(`${key}:${app.healthCheck[key]}`)
	})

	require('@server/clocks').setClocks( app )
	require('@server/router').configureRoutes( app )
	app.clocks.forEach(clock => clock.start())
	app.server.start()
	app.say(`${app.metadata.name} now running`)
})
/******************************************************************************/
/******************************************************************************
 * end entry point
 ******************************************************************************/
