module("jsEvents: Observer");
test("Constructor: Passed non-function -> Should throw an exception", function() {
  return raises(function() {
    var observer;
    return observer = new jsEvents.Observer("");
  });
});
test("Constructor: Passed callback function -> Should set @callback", 1, function() {
  var callback, observer, subject;
  callback = function() {};
  observer = new jsEvents.Observer(callback);
  subject = observer.callback;
  return equal(subject, callback);
});
module("jsEvents: Event");
test("Constructor: When constructed -> @registeredObservers should be []", 1, function() {
  var event, subject;
  event = new jsEvents.Event;
  subject = event.registeredObservers;
  return deepEqual(subject, []);
});
test("register(): Passed Observer -> observer should be added to @registeredObservers", 1, function() {
  var event, observer, subject;
  observer = new jsEvents.Observer(function() {});
  event = new jsEvents.Event();
  event.register(observer);
  subject = event.registeredObservers[0];
  return equal(subject, observer);
});
test("register(): Passed function -> Should create Observer", 1, function() {
  var callBack, event, observer, passValue;
  passValue = 5;
  callBack = function(value) {
    return equal(value, passValue);
  };
  event = new jsEvents.Event();
  observer = event.register(callBack);
  return event.notify(passValue);
});
test("register(): Parameters valid -> Should return Observer", function() {
  var event, observer, subject;
  observer = new jsEvents.Observer(function() {});
  event = new jsEvents.Event();
  subject = event.register(observer);
  return equal(subject, observer);
});
test("register(): Passed non-Observer -> Should throw an exception", function() {
  var event, observer;
  observer = "";
  event = new jsEvents.Event;
  return raises(function() {
    return event.register(observer);
  });
});
test("unregister(): Passed Observer -> Should remove Observer from @registeredObservers", 1, function() {
  var event, observer1, observer2;
  observer1 = new jsEvents.Observer(function() {});
  observer2 = new jsEvents.Observer(function() {});
  event = new jsEvents.Event;
  event.register(observer1);
  event.register(observer2);
  event.unregister(observer1);
  return equal(event.registeredObservers.length, 1);
});
test("unregister(): Passed non-Observer -> Should throw an exception", function() {
  var event, observer;
  observer = "";
  event = new jsEvents.Event;
  return raises(function() {
    return event.unregister(observer);
  });
});
test("notify(): When called -> Should callback the registered Observers", 2, function() {
  var callback, event, observer1, observer2;
  callback = function() {
    return ok(1);
  };
  observer1 = new jsEvents.Observer(callback);
  observer2 = new jsEvents.Observer(callback);
  event = new jsEvents.Event;
  event.register(observer1);
  event.register(observer2);
  return event.notify();
});
test("notify(): When passing parameter -> Observer should be called with parameter", function() {
  var event, observer, parameter;
  parameter = {
    a: "b",
    c: "d"
  };
  event = new jsEvents.Event;
  observer = new jsEvents.Observer(function(param) {
    return deepEqual(param, parameter);
  });
  event.register(observer);
  return event.notify(parameter);
});
test("notify(): First Observer returns true -> Second observer shouldn't be called", function() {
  var event, observer, observer2;
  observer = new jsEvents.Observer(function() {
    return true;
  });
  observer2 = new jsEvents.Observer(function() {
    return ok(false, "Should have been stopped by first event");
  });
  event = new jsEvents.Event;
  event.register(observer);
  event.register(observer2);
  return event.notify();
});