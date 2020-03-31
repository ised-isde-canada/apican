/**************************************************************************** */
const uuidv4  = require('uuid/v4')
/******************************************************************************/

class Event {
  constructor({
      name, 
      frequency,
      run 
  }){
    this.id         = uuidv4()
    this.name       = name
    this.frequency  = frequency
    this.last       = 0
    this.next       = frequency
    this.run        = run 
  }
}

module.exports = {
  Event
}