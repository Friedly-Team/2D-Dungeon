const doc = document;

function onClick(id, handler) {
  const el = doc.getElementById(id);
  el.onclick = handler;
}

export default { onClick }