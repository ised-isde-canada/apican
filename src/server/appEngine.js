"use strict"

/*****************************************************************************/
/*****************************************************************************/


let out = function ( msg ){
    console.log(msg)
}

const configureAppEngine = async function( app ){

    //add an std output 
    app.addFeature({ label: 'stdout', implemented: true, method: out })
    //add express framework 
    require('@express').addFeature(app                  )
    require('@server/viewSystem').addViewEngine( app    )
    //add http server 
    require('@server/http').addFeature(app              )

    app.routers = []
    app.addFeature({label: 'routers'})
    require('@appRoot').defaultWebInterface( app )
     

    return {

        run : function() {
            if(app.implements('routers')){
                app.routers.forEach(router => { app.express.use(router) })
            }
            if(app.implements('server')) app.server.start()
            if(app.implements('states')) app.changeState('running')
            app.stdout('now running')

        }, 

        get stats() {

        }
    }
}

const addAppEngine = function( app ){

    return  configureAppEngine( app )
            .then( appEngine => {
                app.run = appEngine.run 
                app.addFeature({ label: "appEngine" })
                return app 
            })
}

module.exports = {
    addAppEngine        
} 
