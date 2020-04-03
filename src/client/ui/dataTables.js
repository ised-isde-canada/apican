"use strict"

const dataTables = function( app ){
      
   let _dataTables = new Map()  
   let _tableID = 0

   let _buildTable = (htmlID, fields) => {
      let bodyHtmlId = htmlID + 'content'
         $(`#${htmlID}`).append([
            '<thead><tr><th>', 
            fields.map(field => field.label).join('</th><th>'), 
            '</th></tr></thead>', 
            `<tbody id='${bodyHtmlId}'> </tbody>`].join(''))
   } 

   return {

      newTable : function({ htmlID, fields, options}){
            _buildTable(htmlID, fields)
            let dt = $(`#${htmlID}`).DataTable(options)
            _tableID += 1
            _dataTables.set(_tableID , {
               htmlID,
               dtObject: dt,
               fields
            })
            return _tableID 
      }, 

      empty : function( tableID ) {
         let dt = _dataTables.get(tableID).dtObject
         dt.clear().draw()
      }, 
      
      getRowData : function({ tableID, dataRow }){
         let table = _dataTables.get(tableID).dtObject
         return table.row(dataRow).data()
      },  

      addRow : function({tableID, info}){
         let table    = _dataTables.get(tableID)
         let tableRow = table.fields.map( field => {
            return (field.id in info) ? info[field.id] : 'N/A'
         })
         table.dtObject.row.add(tableRow).draw(false)
      }
   }
}


const addDataTableFeature = function( app ){
   app.ui.dataTables = dataTables(app)
   return app
}
module.exports = {
    addDataTableFeature
}

