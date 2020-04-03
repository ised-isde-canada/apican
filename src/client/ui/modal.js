"use strict"


const showModal = ({

    title, 
    content

  }) =>{

    $('#modalTitle').text( title )
    $('#modalContent').html( content )
    document.getElementById('modalWindow').style.display = 'block'
}

const hideModal = () =>{
    $('#modalTitle').text( "" )
    $('#modalContent').html( "" )
    document.getElementById('modalWindow').style.display = 'hidden'
}

const userInfo = msg => {
     $('#userInfo').html( msg )
     document.getElementById('userInfoModal').style.display = 'block'
}    


const addModalFeature = function( app ){

    app.featureSystem.add({
        label : 'showModal', 
        method: showModal
    })

    app.ui.modal = showModal, 
    app.ui.hideModal =  hideModal
    app.ui.userInfo = userInfo

    return app
}

module.exports = {
    addModalFeature
}
