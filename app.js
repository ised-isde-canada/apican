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
		name			 		: 'apiCan', 
		root			 		: __dirname, 
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
require('@server/server').setAppServer( 	app	)
require('@server/engine').mountAppEngine( app	)	//returns a promise
.then(require('@server/db').mountLocalDatabase	)
.then(app => {
	app.updateTenantInformation()
	return app
})
.then( app => { //run the app

	app.say("******* App component status:")
	Object.keys(app.healthCheck).forEach( key=> {
		app.say(`${key}:${app.healthCheck[key]}`)
	})

	let Event = require('@common/time/events').Event

	app.tools.createNewClock("tenant info refresh", new Event({
		name		: 'tenant info refresh', 
		frequency	: 10, 
		run			: app.updateTenantInformation
	}))
	

	require('@server/router').configureRoutes( app )
	app.server.start()
	app.say(`${app.metadata.name} now running`)
})
/******************************************************************************/
/******************************************************************************
 * end entry point
 ******************************************************************************/
