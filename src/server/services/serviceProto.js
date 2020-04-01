/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * 
 * Application APICan - Feb 2020
 * -------------------------------------
 *  serviceProto.js : prototype class for service class
 *
 ******************************************************************************/
"use strict"

/*****************************************************************************/
const validator = require('validator')
/*****************************************************************************/
const errors = require('@errors').errors
const alwaysResolve = require('@common/utils/alwaysResolve').alwaysResolve
/*****************************************************************************/


module.exports = {
    ServiceProto
}