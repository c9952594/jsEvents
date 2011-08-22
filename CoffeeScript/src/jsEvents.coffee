jsEvents = {}

class jsEvents.Observer
	constructor: (callbackFunction) ->
		throw "callbackFunction should be a function" if !(callbackFunction instanceof Function)
		@callback = callbackFunction

class jsEvents.Event
	constructor: ->
		@registeredObservers = []
	register: (observer) ->
		throw "observer should be class Observer" if !(observer instanceof jsEvents.Observer)
		@registeredObservers.push(observer)
	unregister: (observerToFind) ->
		throw "Observer required" if !(observerToFind instanceof jsEvents.Observer)
		newObserverList = []
		for observer in @registeredObservers
			newObserverList.push(observer) if (observer != observerToFind)
		@registeredObservers = newObserverList
	notify: (parameters) ->
		for observer in @registeredObservers
			break if (observer.callback(parameters))