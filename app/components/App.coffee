
{Layout, Header, Spacer, Drawer, Navigation, Content, ProgressBar} = ReactMDL

snapshotToArray = (snapshot)->
	arr = []
	snapshot.forEach (childSnapshot)->
		val = childSnapshot.val()
		if isObject(val)
			val.key = childSnapshot.key()
		arr.push(val)
	arr

isObject = (obj)->
	Object.prototype.toString.call(obj) is '[object Object]'

class @App extends React.Component
	constructor: ->
		@state =
			user: null
			contacts: []
			users: {}
			loadingAuthState: yes
		
		firebase.auth().onAuthStateChanged (user)=>
			# timeout because otherwise any errors are swallowed thanks to Promises
			setTimeout =>
				# TODO: remove event listeners better
				@state.fUser?.off()
				@state.fUsers?.off()
				@state.fContacts?.off()
				
				{fRoot} = @props
				fUsers = fRoot.child("users")
				fUser = if user then fUsers.child(user.uid)
				fContacts = if user then fRoot.child("user-contacts").child(user.uid)
				contacts = []
				fUser?.on "value", (snapshot)=>
					if snapshot.val()
						@setState user: snapshot.val()
					else
						fUser.set
							uid: user.uid
							name: user.displayName ? ""
							photoURL: user.photoURL
				fUsers?.on "value", (snapshot)=>
					@setState users: snapshot.val()
				fContacts?.on "value", (snapshot)=>
					@setState contacts: snapshotToArray(snapshot)
				
				@setState {user, contacts, loadingAuthState: no, fUser, fUsers, fContacts}
	
	render: ->
		{signIn, signOut} = @props
		{user, contacts, users, loadingAuthState} = @state
		
		E ".app",
			if user?
				{name, photoURL} = user
				setUsername = null#->
				E Layout, fixedHeader: yes, fixedDrawer: yes,
					E Header, title: "Natter",
						E Spacer
						E UserProfile, {name, photoURL, setUsername, signOut}
					E Drawer,
						E PanelTabs, {contacts, users}
					E Content,
						if location.hash
							contact_uid = location.hash.replace(/#/, "")
							contact = users[contact_uid]
							if contact
								E ChatPanel, user: contact
							else
								E ".error.placeholder",
									"That user no longer exists"
									# "Contact removed"
									# "Invite #{contact_name}"
									# "Add #{contact_name} as a contact"
									# location.hash = ""
						else
							E ".welcome.placeholder",
								"Welcome to Natter"
			else if loadingAuthState
				E ProgressBar, indeterminate: yes
			else
				E SignInScreen, {signIn}
