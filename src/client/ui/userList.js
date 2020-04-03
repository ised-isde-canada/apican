"use strict"


const addUserListFeature = function( app ){

    let tableID = app.ui.dataTables.newTable({
            htmlID: 'groupMembersTable', 
            fields: [
                { id: 'username', label: 'User' }, 
                { id: 'email', label: 'email'  },
                { id: 'created_at', label: 'Creation Date'}, 
                { id: 'keyCloackAccount', label: 'keyCloak'}, 
                { id: 'twoFactorAuth', label: 'twoFactorAuth'}
            ],
            options: {}
    })

    app.ui.userDisplayUI = { 
        empty : _ => app.ui.dataTables.empty( tableID )
    }

    app.ui.userDisplayUI.addRow = function(user){
        app.ui.dataTables.addRow({
            tableID, 
            info: user
        })
    }
}
module.exports = {
    addUserListFeature
}
