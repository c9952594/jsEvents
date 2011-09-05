module "jsEvents: Observer"

test "Constructor: Passed non-function -> Should throw an exception", ->
	# Assert
	raises ->
		# Act
		observer = new jsEvents.Observer("")

test "Constructor: Passed callback function -> Should set @callback", 1, ->
	# Arrange
	callback = ->
	# Assert
	observer = new jsEvents.Observer(callback)
	# Act
	subject = observer.callback
	equal(subject, callback)



module "jsEvents: Event"

test "Constructor: When constructed -> @registeredObservers should be []", 1, ->
	# Act
	event = new jsEvents.Event
	# Assert
	subject = event.registeredObservers
	deepEqual(subject, [])

test "register(): Passed Observer -> observer should be added to @registeredObservers", 1, ->
	# Arrange
	observer = new jsEvents.Observer(->)
	event = new jsEvents.Event()
	# Act
	event.register(observer)
	# Assert
	subject = event.registeredObservers[0]
	equal(subject, observer)

test "register(): Passed function -> Should create Observer", 1, ->
	# Arrange
	passValue = 5
	callBack = (value) ->
		# Assert
		equal value, passValue
	event = new jsEvents.Event();
	# Act
	observer = event.register(callBack)
	event.notify passValue


test "register(): Parameters valid -> Should return Observer", ->
	# Arrange
	observer = new jsEvents.Observer(->)
	event = new jsEvents.Event()
	# Act
	subject = event.register(observer)
	# Assert
	equal(subject, observer)

test "register(): Passed non-Observer -> Should throw an exception", ->
	# Arrange
	observer = ""
	event = new jsEvents.Event
	# Act
	raises ->
		# Assert
		event.register(observer)

test "unregister(): Passed Observer -> Should remove Observer from @registeredObservers", 1, ->
	# Arrange
	observer1 = new jsEvents.Observer(->)
	observer2 = new jsEvents.Observer(->)
	event = new jsEvents.Event
	event.register(observer1)
	event.register(observer2)
	# Act
	event.unregister(observer1)
	# Assert
	equal(event.registeredObservers.length, 1)

test "unregister(): Passed non-Observer -> Should throw an exception", ->
	# Arrange
	observer = ""
	event = new jsEvents.Event
	# Act
	raises ->
		# Assert
		event.unregister(observer)

test "notify(): When called -> Should callback the registered Observers", 2, ->
	# Arrange
	callback = ->
		# Assert
		ok(1)
	observer1 = new jsEvents.Observer(callback)
	observer2 = new jsEvents.Observer(callback)
	event = new jsEvents.Event
	event.register(observer1)
	event.register(observer2)
	# Act
	event.notify()
	
test "notify(): When passing parameter -> Observer should be called with parameter", ->
	# Arrange
	parameter = {a:"b", c:"d"}
	event = new jsEvents.Event
	observer = new jsEvents.Observer((param)->
		# Assert
		deepEqual(param, parameter)
	)
	event.register(observer)
	# Act
	event.notify(parameter)

test "notify(): First Observer returns true -> Second observer shouldn't be called", ->
	# Arrange
	observer = new jsEvents.Observer(-> true)
	observer2 = new jsEvents.Observer(-> ok(false, "Should have been stopped by first event"))
	event = new jsEvents.Event
	event.register(observer)
	event.register(observer2)
	# Act
	event.notify()