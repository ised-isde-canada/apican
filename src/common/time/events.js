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

Event.prototype.tick = function(){
  this.last += 1
  this.next = this.frequency - this.last
  if(this.next === 0){
    this.run()
    this.last = 0
    this.next = this.frequency
  }
}

module.exports = {
  Event
}