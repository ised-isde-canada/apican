/*******************************************************************************
 * FranckEinstein90 alwaysResolve 2010
 *
 * ------------------------------------------------
 *  single function library alwaysResolve
 *
 *  When I use Promises.all for rest API calls, 
 *  I keep on bumping into use cases
 *  in which i need the promise to resolve 
 *  no matter what, because the flow depends on it
 *
 * ****************************************************************************/
"use strict"

/******************************************************************************/
const request = require('request')
const validator = require('validator')
/******************************************************************************/

const alwaysResolve = function (apiCall, options = {
        good,
        bad, 
        headers
    }) {

            let _callOptions = { }
            let bad     = (typeof options.bad   === 'function')? options.bad    : x => options.bad 
            let good    = (typeof options.good  === 'function')? options.good   : x => options.good

            _callOptions.url        = validator.isURL( apiCall ) ? apiCall : null
            _callOptions.headers    = 'headers' in options       ? options.headers : null

            return new Promise( resolve  => {

               if(_callOptions.url === null) return resolve( bad ('bad url'))

               request(_callOptions, (err, response, body) => {
                    if (err) {
                        return resolve( bad( err, response, body ) )
                   } else if ( response && 'statusCode' in response && response.statusCode === 200 ){
                        return resolve( good( body , response ))
                    } else {
                        return resolve( bad ( err, response, body))
                    }
               })
            })
        }

module.exports= {
    alwaysResolve
}