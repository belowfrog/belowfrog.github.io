// event
const bindEvent = (node, event, func) => {
  if (document.all){ 
  node.attachEvent(`on${event}`, func)//IE中 
  } else{ 
    node.addEventListener(event, func, false);//firefox 
  } 
}

const removeEvent = (node, event, func) => {
  if (document.all){ 
  node.detachEvent(`on${event}`, func)//IE中 
  } else{ 
    node.removeEventListener(event, func, false);//firefox 
  } 
}

export {
  bindEvent,
  removeEvent,
}