
const listeners = {}
export default {

    registerEvent: (event) => {
      if (listeners[event]) {
        console.error(`Event ${event} has already been registered`)
        return;  
      } 
      console.log(`registered ${event}`)
      listeners[event] = [];
    },
  
    triggerEvent: (event, data) => {
      if (!listeners[event]) {
        console.error(`Event ${event} does not exist!`);
        return;
      }
      listeners[event].forEach(listenerCallback => {
        listenerCallback(data);
      });
    },
  
    registerListener: (event, callback) => {
      if (!listeners[event]) {
       listeners[event] = [callback]
      } else {
        listeners[event].push(callback);
      }
      return callback;
    },
  
    removeListener: (event, callback) => {
      if (!listeners[event]) {
        console.error(`Cannot register listener: Event ${event} does not exist`);
        return;
      }
      const index = listeners[event].indexOf(callback);
      if (index > -1) {
        listeners[event].splice(index, 1);
      } else {
        console.error(`Callback function ${callback} was not registered to event ${event}`);
      }
    }
  }