/*******************************************************************************
 * Franck Binard, ISED (FranckEinstein90)
 *
 * APICan application - Feb 2020
 * -------------------------------------
 *  Canadian Gov. API Store middleware - client side
 *
 *  ui.js: entry point 
 *
 ******************************************************************************/
"use strict"
/******************************************************************************/
/******************************************************************************/


let _initStaticUI = function(){
    $('#appStatus').click(function( event ) {
        this.classList.toggle("active")
        let statusDetailPaneHeight = $('#appStatusDetail').css('maxHeight')	
        if( statusDetailPaneHeight === '0px' ){
            let scrollHeight = $('#appStatusDetail').css('scrollHeight')
            $('#appStatusDetail').css('maxHeight', '80px')
        } else {
            $('#appStatusDetail').css('maxHeight', '0px')
        }
    }) 
}

const uiFeature = function( app ){

    let formInputField = function({
            label, 
            inputField
        }){  //creates an input field
             return [   
                `<label class="groupCreationLabel"><b>${label}</b></label>`, 
                inputField
             ].join('')
    }

    return {


        addUiTrigger: function({ triggerID, action }){
          let triggers = null
          if(!Array.isArray(triggerID)){
            triggers = [triggerID]
          } else {
            triggers = triggerID
          }		    
          triggers.forEach( triggerID => $(`#${triggerID}`).click( action ))
        }, 

		hidden : function({
				htmlID, 
				value
		  }){
				return `<input type='hidden' id="${htmlID}" name="${htmlID}" value="${value}">`
		  },

		textArea  : function({
				label, 
				htmlID, 
				value
		  }){
				let textAreaField = formInputField({
				 	 label, 
					 inputField: [ `<textarea rows='4' cols='50' class="w3-input w3-border" `, 
						  			`id="${htmlID}">${value}</textArea>`
						  			 ].join('')
				})
				return textAreaField
		  }, 

        textField : function({
            label, 
            htmlID, 
            value
        }){
            let textField = formInputField({ 
                label, 
                inputField: `<input class="w3-input w3-border" id="${htmlID}" value="${value || ''}" type="text">`
           })
            return textField
        }, 

        checkBox: function({
            label, 
            htmlID, 
            checked
        }){
            return [
                `<input class="w3-check" id='${htmlID}' type="checkbox" `, 
                `${checked?'checked="${checked}"':''}>`, 
                `<label class="groupCreationLabel">${label}</label>`
            ].join('')
        }
   }
}

const addUiComponent = function(app) {

    app.featureSystem.addComponent({label: 'ui', methods: uiFeature(app)})
    _initStaticUI()

    app.showVisibleAPITable = function(tenant, event) {
       $('.tenantsVisibleAPI').hide()
       let apiPaneID = tenant + 'VisibleAPI'
       $('#' + apiPaneID).show()
    }

    app.ui.scrollToSection = function(sectionID) {
            let hash = $('#' + sectionID)
            $('html, body').animate({
                scrollTop: hash.offset().top
            }, 800, _ => window.location.hash = hash)
        }
    require('./bottomStatusBar').addFeature( app )
    require('./dataExchangeStatus').addDEStatusFeature( app )
    return app
}

module.exports = {
   addUiComponent 
}
