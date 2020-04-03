/*******************************************************************************
 * Franck Binard, ISED (FranckEinstein90)
 *
 * APICan application - 2020
 * -------------------------------------
 *  Canadian Gov. API Store middleware - client side
 *
 *  adminTools.js: manages admin tools 
 *
 ******************************************************************************/
"use strict"
/******************************************************************************/
const eventPane = ({
    name,
    frequency,
    last,
    next
}) => {
    return [
        `<tr>`,
        `<td>${name}</td>`,
        `<td>${frequency} mins</td>`,
        `<td>${last}</td>`,
        `<td>${next}</td>`,
        `</tr>`
    ].join(' ')
}


const eventScheduler = (function(){

	let _events = new Map()
    let _getEvents = () => {
        return new Promise((resolve, reject) => {

            $.get('/events', function(data) {
                return resolve(data)
            })

            .fail( err => {
                return reject(err) 
            })
        })
    }


	return {

		update : function(eventArray) {
            return _getEvents()
            .then( events => {
			    events.forEach(ev => {
					_events.set(ev.id, ev)
			    })
                return 'Ok'
		    })
        }, 

		showScheduler : function( ){
			 let eventRows = ""
			 _events.forEach((ev, _) =>{
				eventRows = eventRows += eventPane(ev) 
			 })
	         return [
					 `<div class="eventList" id="eventList">`,
                     `<table class='w3-table scheduledEvent'>`,
                     `<tr><th>Event Name</th><th>Frequency</th><th>Last</th><th>Next</th></tr>`,
					  eventRows, 
                     `</table>`,
                     '</div>'
			 		].join('')
		}
	}

})()


const schedulerContent = function() {
    debugger
    return schedulerModalContent()
        .then(modalContent => {
            return ({
                title: 'Scheduler',
                content: modalContent
            })
        })
        .catch(err => {
            throw err
        })
}


const addAdminTools = async function(clientApp) {

    clientApp.eventScheduler = eventScheduler

    clientApp.showScheduler = _ => clientApp.showModal({
	    title : 'events', 
	    content: eventScheduler.showScheduler()
    })

    $('#showScheduler').click(event => {
        event.preventDefault()
        eventScheduler.update()
        .then( _ => {
           clientApp.showScheduler() 
        })  
    })

    clientApp.featureSystem.add({
        label: 'eventScheduler', 
        state: 'implemented'
       })
}


module.exports = {
    addAdminTools
}
