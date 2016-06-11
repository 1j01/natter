
$ ->
	
	$body = $("body")
	$app = $("#app")
	
	# create messages
	$serverDown = $('<div id="server-down">The server is down!</div>')
	$bye = $('<div id="bye">Bye!</div>')
	$disconnected = $("<div id='disconnected'> - disconnected - </div>")
	$body.prepend($bye, $serverDown)
	
	# state handling functions that just trigger visuals
	_serverDown = ->
		setTimeout ->
			$body.addClass("server-down")
		, 100
	
	_loaded = ->
		$body.addClass("loaded")
		$body.removeClass("not-loaded")
	
	_loggedIn = ->
		$body.addClass("logged-in")
		$body.removeClass("not-logged-in")
	
	_loggedOut = ->
		$body.addClass("logged-out")
		$body.addClass("not-logged-in")
		$body.removeClass("logged-in")
	
	
	$login = $("#login")
	$email = $("#email")
	$err = $("#login-message")
	$login.on "submit", (e)->
		e.preventDefault()
		login($email.val())
	
	am = new AudioMan
		"recieve-message": "/res/bop.ogg"
		"send-message": "/res/bop1.ogg"
	
	
	chats = {}
	
	# # # # # # # # # # # # # # # # # # # # 
	$panelsArea = $("<div id='panels-area'/>")
	
	# The sidebar shows user info/logout and a tabstack of users
	$sidebar = $("<div id='sidebar'/>")
	$sbtoggler = $("<div id='sidebar-toggle'/>")
	
	$you = $("<div id='you'/>")
	$greeting = $("<div id='greetings'>Greetings!</div>").appendTo($you)
	$logout = $("<button id='logout'>Log out</button>").appendTo($you)
	$settingsButton = $("<div id='settings-button'><img src='/res/gear.svg' width='15' height='15'/></div>")
	# $logout.on("click", logout)
	$tabstack = $("<div id='chat-panel-tabs'/>")
	
	$sidebar.append($sbtoggler, $you, $tabstack, $settingsButton)
	
	$app.append($sidebar, $panelsArea)
	# # # # # # # # # # # # # # # # # # # # 
	
	sortTabs = ->
		# for(i1=0,i2=1i2<
		$tabstack.empty().append($tabs)
	
	
	login = (email)->
		$.post "login", {user: email}, ->
			console.log "Hey!"
			_loggedIn()
	
	# creating = false
	logout = ->
		# visually log out immediately
		_loggedOut()
		
		# send log out message
		socket.emit("logout")
		console.log("logout")
	
	socket.on "disconnect", (what)->
		$body.addClass("disconnected")
		$disconnected.appendTo($body)
	
	socket.on "connect", ->
		$disconnected.remove()
	
	socket.on "login-failed", (data)->
		#if data.message.match(/doesn't exist/))
		#	creating = true
		#else if(data.message.match(/exists/))
		#	creating = false
		#
		#console.log(data.message,creating)
		$err.text(data.message)
		console.log("login failed:", data.message)
	
	socket.on "logged-out", (data)->
		_loggedOut()
	
	socket.on "logged-in", (my)->
		_loggedIn()
		$err.empty()
		$greeting.text("Hello, "+my.uname)
		# console.log("my settings:", my.settings)
	
	socket.on "someone-logged-in", (u)->
		$panel = chats[u.uname] || $ChatPanel(u, socket)
		$tab = $ChatPanelTab(u, $panel)
		chats[u.uname] = $tab.$panel
		sortTabs()
	
	###socket.on "someone-logged-out", (u)->
		$.each tabs, (i,$tab)->
			if $tab.user?.uname is u.uname
				# $tab.()
		
		# delete chats[u.uname]
		sortTabs()
	###
	socket.on "users", (users)->
		$tabs.remove()
		$tabs = $()
		for u, i in users
			$tab = $ChatPanelTab(u, $ChatPanel(u, socket))
			chats[u.uname] = $tab.$panel
		
		sortTabs()
	
	socket.on "im", (data)->
		#recieved a message
		if chats[data.from]
			chats[data.from].log(data.message)
		else
			console.log(data)
		
	
	socket.on "eval", (js)->
		console.log "eval:", js
		try
			eval js
		catch e
			console.warn e
	
	$sidebar.find("#logout").click logout


# old Date(1386472965769)