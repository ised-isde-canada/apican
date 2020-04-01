/*******************************************************************************
 * Franck Binard, ISED (FranckEinstein90)
 *
 * APICan Canada API Store control application - 2020
 * -----------------------------------------------------------------------------
 *  Canadian Gov. API Store middleware - client side
 *
 *  tenants.js: tenant related routines on client side 
 *
 ******************************************************************************/
"use strict"
/******************************************************************************/
const moment = require('moment')
/******************************************************************************/

const tenantModule = async function( app ){

    let _tenants = new Map()
    $('.tenant-card').each( function(){
        let tenantName = ($( this ).attr('id')).replace('TenantCard', '')
        _tenants.set(tenantName, null)
    })

    $('#btnRefreshTenants').click(function ( event ){           //sends cmd
        event.preventDefault()                                  //to server to
        $.get('/refreshTenants', {}, function( tenantData ) {   //refresh tenant
            tenantData.forEach( tenantInfo => {                 //info
                _tenants.set(tenantInfo.tenantName, tenantInfo)
            })
            tenantModule.updateTenantContainer()
        })
    })

    return {
        get tenants(){
            let tList = []
            _tenants.forEach((value, key)=>{
                tList.push(key)
            })
            return tList 
        }, 

        updateTenantContainer : function(){
            _tenants.forEach((tInfo, tName) => {
                let beginUpdateTime = moment(tInfo.beginUpdateTime)
                let endUpdateTime = moment(tInfo.endUpdateTime)
                $(`#${tName}TenantCard`).text(`${tName}: LastUpdate: ${endUpdateTime.format('H:mm')}`)
            })
        }

    }
}

const tenants = (function() {

    let $tenantSectionContainer = null
    let _tenants = new Map()

    let _configUI = function(){

      
    }

    return {
        configure : function( containerID ){
            $tenantSectionContainer = $(`#${containerID}`)
            $('.tenant-card').each( function(){
                let tenantName = ($( this ).attr('id')).replace('TenantCard', '')
                _tenants.set(tenantName, null)
            })
            _configUI()
        },

       
   }
})()


const addTenantCollection = async function({
    clientApp, 
    containerID
  }){
        return tenantModule( clientApp )
        .then( tenantModule =>{
            Object.defineProperty(clientApp, 'tenants', {get: function(){return tenantModule.tenants}})
            return clientApp
        })
}

module.exports = {
   addTenantCollection 
}
