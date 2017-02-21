var db = (function() {
  let lsKey;
  let isInitiated = false;
  let data        = {}
  const listeners = [];

  const publicInterface = {
    init, add, get, remove, getAll, addListener
  }

  function init(key = 'db') {
    if(isInitiated == true) {
      return publicInterface;
    }
    isInitiated = true;
    lsKey = key;
  }

  function addListener(listener) {
    listeners.push(listener);
  }

  function add(input) {
    let id = _getID();
    data[id] = input;
    _notifyListeners();
    _export();
    return id;
  }

  function remove(id) {
    delete data[id];
    _export();
    _notifyListeners();
  }

  function get(id) {
    return data[id];
  }

  function getAll() {
    return Object.entries(data);
  }

  function _import() {
    data = JSON.parse(localStorage.getItem(lsKey) || []);
  }

  function _export() {
    localStorage.setItem(lsKey, JSON.stringify(data));
  }

  function _getID(length = 5) {
    return Math.random().toString(36).substr(2, length);
  }

  function _notifyListeners(event) {
    listeners.forEach(listener => listener(event));
  }

  return publicInterface;

})();
