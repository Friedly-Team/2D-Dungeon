const doc = document;

function onClick(id, handler) {
  const el = doc.getElementById(id);
  el.onclick = handler;
}

function subscribe(id, obj) {
  const el = doc.getElementById(id)
  return new Proxy(obj, {
    set: (object, prop, val) => {
      object[prop] = val;
      if(prop === 'name') {
        el.innerText = val.toUpperCase();
      }
      return true;
    }
  });
}

export default { onClick, subscribe }