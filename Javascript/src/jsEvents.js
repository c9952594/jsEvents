var jsEvents;
jsEvents = {};
jsEvents.Observer = (function() {
  function Observer(callbackFunction) {
    if (!(callbackFunction instanceof Function)) {
      throw "callbackFunction should be a function";
    }
    this.callback = callbackFunction;
  }
  return Observer;
})();
jsEvents.Event = (function() {
  function Event() {
    this.registeredObservers = [];
  }
  Event.prototype.register = function(observer) {
    if (observer instanceof Function) {
      observer = new jsEvents.Observer(observer);
    }
    if (!(observer instanceof jsEvents.Observer)) {
      throw "observer should be class Observer or Function";
    }
    this.registeredObservers.push(observer);
    return observer;
  };
  Event.prototype.unregister = function(observerToFind) {
    var newObserverList, observer, _i, _len, _ref;
    if (!(observerToFind instanceof jsEvents.Observer)) {
      throw "Observer required";
    }
    newObserverList = [];
    _ref = this.registeredObservers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      observer = _ref[_i];
      if (observer !== observerToFind) {
        newObserverList.push(observer);
      }
    }
    return this.registeredObservers = newObserverList;
  };
  Event.prototype.notify = function(parameters) {
    var observer, _i, _len, _ref, _results;
    _ref = this.registeredObservers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      observer = _ref[_i];
      if (observer.callback(parameters)) {
        break;
      }
    }
    return _results;
  };
  return Event;
})();