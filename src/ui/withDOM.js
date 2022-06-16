const doc = document;

function UI() {
  this.setEvent = (id, event, handler) => {
    const el = doc.getElementById(id);

    el[event] = handler;
    return this;
  }

  this.subscribe = (id, obj) => {
    const el = doc.getElementById(id);

    return new Proxy(obj, {
      set: (object, prop, val) => {
        object[prop] = val;
        if (prop === "name") {
          el.innerText = val.toUpperCase();
        }
        return true;
      },
    });
  }

  this.getElement = (id) => doc.getElementById(id);

  this.fromInputsToObject = (ids = [], linkObject, parse = Number) => {
    if(ids.length > 0) {
      ids.forEach(id => {
        linkObject[id] = parse(doc.getElementById(id).value);
      })
    }
  }

  return this;
}

export default UI;
