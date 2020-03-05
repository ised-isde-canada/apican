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
/*****************************************************************************/
const app = {
	name: 'apiCan', 
	root: __dirname
}
require('@features').addFeatureSystem( app )
/******************************************************************************/
.then( require('@appEngine').addAppEngine     )//app mechanics
.finally ( _ => app.run() )
/******************************************************************************
 * end entry point
 ******************************************************************************/
