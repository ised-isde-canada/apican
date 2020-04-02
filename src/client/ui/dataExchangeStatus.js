"use strict"


const dataExchangeStatus = (function() {

    let dataLoading = false
    return {
        setLoading: function() {
            dataLoading = true
            document.getElementById('loadingIndicator').style.display = 'block'
        },
        setInactive: function() {
            dataLoading = false
            document.getElementById('loadingIndicator').style.display = 'none'
        }
    }

})()

const addDEStatusFeature = function( app ){
    app.ui.setLoading = dataExchangeStatus.setLoading
    app.ui.setInactive = dataExchangeStatus.setInactive
}

module.exports = {
    addDEStatusFeature
}
