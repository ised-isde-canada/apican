******************************************************************************
 *
 * - sets up database
 * - gets config variables and what nots
 * - says everything a go, app is booting
 *
 * ***************************************************************************/
"use strict"

/*****************************************************************************/
const sqlite3 = require('sqlite3').verbose()
/*****************************************************************************/
const appData = require('@apiCan/appData').appData
/*****************************************************************************/
const db = (function(){

    let _db = null

    return {

        ready: function( ){
            return new Promise(( resolve, reject) => {
                _db = new sqlite3.Database(
                    appData.settingsDBPath, 
                    err => {
                        if ( err ) {
                            reject( err )
                        } else {
                            return resolve(true)
                        }
                    })
            })
        }, 
       
         
        createRecord: function({
            table, 
            values  //values is just an object, keys are field names, values are ...values
        }){

            let fields = []
            let fieldValues = []
            let valArray = Object.entries(values)
            valArray.forEach(field => {
                fields.push( `'${field[0]}'` )
                fieldValues.push( `'${field[1]}'` )
            })

            return new Promise((resolve, reject) => {
                let SQLStatement =  `INSERT INTO ${table} (${fields.join(',')}) VALUES (${fieldValues.join(',')});` 
                _db.run(SQLStatement, function( err, state ){
                    if( err ){
                        return reject(err)
                    } else {
                        return resolve(this.lastID)
                    }
                })
            })
        }, 

        getRecord: function({
            table, 
            select
        }){
            return new Promise((resolve, reject)=>{
                let SQLStatement = `SELECT * FROM ${table} WHERE ${select};`
                _db.all(SQLStatement, (err, rows)=>{
                    if( err ){
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                })
            })
        }
    }

})()


module.exports = {
    db
}

