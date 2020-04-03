/*****************************************************************************/
"use strict"
/*****************************************************************************/

const formFeature = function( app ){
    
    let formIDs = new Map()

    return {

      form : function( formContent, submit){
        return [
            `<form class="w3-container w3-left-align">`, 
                formContent, 
                `<div class="w3-row" style='margin:15,15,15,15'>`, 
                    `<br/>`, 
                    `<button class="w3-btn w3-blue w3-block" id="${submit.ID}" >`, 
                        `${submit.label}`, 
                    `</button>`, 
                    `<br/>`, 
                `</div>`,
            `</form>`].join('')
        }
    }
}

const addFormFeature = function( app ){
    let forms = formFeature( app ) 
    app.ui.form = forms.form
}

module.exports = {
    addFormFeature
}
