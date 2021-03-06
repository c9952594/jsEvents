USAGE:

CoffeeScript:
=============
###
First create an event
###

event = new jsEvents.Event


###
Register a function. This will return an observer object.
You can use this to unregister the event or register for more events to the same observer
###

observer1 = event.register (name) ->
   alert name


###
Or you can create and register the observer yourself.
This could be useful if you want to register to many events.
###

observer2 = new jsEvents.Observer (name) ->
   alert name + " Smith"
event.register observer2


###
Kick off the event
###

event.notify "Craig"


###
Unregister one of the events
###

event.unregister observer1
event.notify "Another"



Javascript:
===========
/* First create an event */
event = new jsEvents.Event;


/* Register a function. This will return an observer object.
   You can use this to unregister the event or register for more events to the same observer */
observer1 = event.register(function(name) {
  return alert(name);
});


/* Or you can create and register the observer yourself.
   This could be useful if you want to register to many events. */
observer2 = new jsEvents.Observer(function(name) {
  return alert(name + " Smith");
});
event.register(observer2);


/* Kick off the event */
event.notify("Craig");


/* Unregister one of the events */
event.unregister(observer1);
event.notify("Another");
