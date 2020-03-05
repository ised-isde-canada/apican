/******************************************************************************
 * by franckEinstein90
 * ***************************************************************************/
"use strict"

const appRoot = function( app ){

    let router =  require('express').Router()
    router.get('/', function(req, res){
        let pageData = {
            title: app.name,
            subTitle: '', 
            author: "Franck Binard and Don Vo for ISED", 
            description: "Canada API Store Integration and middleware" 
        }    
        res.render('default', pageData)
    })
    app.routers.push(router)
    return app

}


let defaultWebInterface = function( app ){
    return appRoot( app )
}

module.exports = {
   defaultWebInterface 
}