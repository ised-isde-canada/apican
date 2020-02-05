"use strict"

/*****************************************************************************/
const express = require('express')
const cookieParser = require('cookie-parser')
const favicon = require('express-favicon')
const path = require('path')
/*****************************************************************************/

const expressStack = function({
    root,
    staticFolder,
    faviconPath

}) {

    let app = express()
    require('@viewSystem/viewSystem').viewSystem({
        app,
        root,
        layoutsDir:  path.join(root,'views','layouts/'),
        partialsDir: path.join(root,'views','partials/')
    })

    app.use(cookieParser());
    app.use(express.json())
    app.use(express.urlencoded({
        extended: false
    }))
    app.use(express.static(staticFolder))
    app.use(favicon(faviconPath))


    return app
}

module.exports = {
    expressStack
}
