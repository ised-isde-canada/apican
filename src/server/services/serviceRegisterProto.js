/*******************************************************************************
 * Franck Binard, ISED
 * Canadian Gov. API Store middleware
 * Application APICan - 2020
 * -------------------------------------
 *  class ServiceRegisterProto.js
 *
 *  prototype class definition and implementation for serviceRegister class
 *
 ******************************************************************************/

"use strict"

/*****************************************************************************/
const moment = require('moment')
/*****************************************************************************/

class ServiceRegisterProto {

    constructor() {
        this.ids = []
        this.register = new Map()
    }

    has( id ) {
        return this.register.has(id)
    }

    get length(){
        return this.register.size
    }
}

ServiceRegisterProto.prototype.set = function({
    id,
    value
}) {
    this.register.set(id, value)
    if (!this.ids.includes(id)) {
        this.ids.push(id)
    }
}

ServiceRegisterProto.prototype.get = function(id) {
    return this.register.get(id)
}

ServiceRegisterProto.prototype.mapIDs = function(callback) {
    return this.ids.map(callback)
}

ServiceRegisterProto.prototype.forEachID = function(callback) {
    this.ids.forEach(callback)
}

ServiceRegisterProto.prototype.forEach = function(callback) {
    this.register.forEach(callback)
}

module.exports = {
    ServiceRegisterProto
}