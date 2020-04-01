"use strict"

/*****************************************************************************/
const sqlite3 = require('sqlite3').verbose();
/*****************************************************************************/

const localDatabase = function( dbObject ){
    let _db = dbObject
    let valuesToSQL = values =>{
        let fields      = []
        let fieldValues = []
        let valArray    = Object.entries(values)
        valArray.forEach(field => {
            fields.push(`'${field[0]}'`)
            fieldValues.push(`'${field[1]}'`)
        })
        return fieldValues.join(',')
    }
    return {
        getAllTableRows: function({
            table, 
            where
        }){
            let whereStatement = where ? `WHERE ${where}` : ''
            return new Promise((resolve, reject) => {
                let SQLStatement = `SELECT * FROM ${table} ${whereStatement};`
                _db.all(SQLStatement, (err, rows)=>{
                    if(err){
                        return reject( err )
                    } else {
                        return resolve( rows ) 
                    }
                })
            })
        }, 
        removeFromTable: function({
            table, 
            where
        }){ 
            let whereStatement = where ? `WHERE ${where}` : ''
            return new Promise((resolve, reject)=>{
                let SQLStatement = `DELETE FROM ${table} ${whereStatement}`
                _db.run(SQLStatement, function(err){
                    if(err){
                        return reject( err )
                    } else {
                        return resolve('Ok')
                    }
                })
            })
        }, 
        insertInTable: function({ table, values }){
            let fields = []
            let fieldValues = []
            let valArray = Object.entries(values)
            valArray.forEach(field => {
                fields.push( `'${field[0]}'` )
                fieldValues.push( `'${field[1]}'` )
            })
            return new Promise((resolve, reject) => {
             let SQLStatement =  `INSERT INTO ${table} (${fields.join(',')}) VALUES (${fieldValues.join(',')});` 
                _db.run(SQLStatement, function( err ){
                    if( err ){
                        return reject(err)
                    } else {
                    return resolve( this.lastID )
                    }
                })
            })
        },

        updateTable: function({table, values, where}){
            return new Promise((resolve, reject) => {
                let SQLStatement = `UPDATE ${table} set ${values} WHERE ${where};`
                _db.run( SQLStatement, function( err ){
                    if( err ){
                        return reject( err )
                    } else {
                        return resolve( this.lastID)
                    }
                })
            })
        }
    }
}

const appDatabaseFeature = function( app ) {
    
    return new Promise((resolve, reject) => {
        let _db = new sqlite3.Database( app.metadata.localDatabaseName , err => {
            if (err) { 
                return reject( err )
            } else {
               app.healthCheck.localDatabase = true
               app.localDatabase = localDatabase(_db)
               return resolve( localDatabase(_db) )
            }
        })
    })
}


const mountLocalDatabase = function( app ){
    return appDatabaseFeature( app ) 
    .then (localDb => {
        app.localDb = localDb
        app.featureSystem.add({
            label: 'localDB', 
            state: 'implemented'
        })
        return app
    })
}
module.exports = {
   mountLocalDatabase
}