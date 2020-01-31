/*******************************************************************************
 * Franck Binard, Innovation Science and Economic Development Canada (ISED)
 * franck.binard@canada.ca
 * 
 * Canadian Gov. API Store Management Software - written in 2020
 * Application APICan
 * Manages GoC API Store (https://api.canada.ca/)
 * -----------------------------------------------------------------------------
 *  appFeatures.js : features included or not in this release
 *
 ******************************************************************************/
"use strict"

/******************************************************************************/

/******************************************************************************/
class Feature {

    constructor({
        tag, 
        description, 
        included, 
        id 
    }){

    }
}

const appFeatures = (function(){

    let _appFeatures = new Map()
    
    return {
        list: _ => null, 
        add: _ => null, 
        includes: _ => null, 
        set: _ => null, 
        off: _ => null
    }
})()

module.exports = {
    appFeatures
}
 /*****************************************************************************/

