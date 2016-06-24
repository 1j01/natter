
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
			user: null # You sir!
			# fUser: null # Eff you, sir!
			# fContacts: null # I'll wear glasses instead.
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
				# @setState {user, fUser, fContacts, loadingAuthState: no}
				contacts = []
				# fContacts.on "child_added", (snap)=>
				# 	contacts.push(snap.val())
				# 	console.log snap
				
				fUser?.on "value", (snapshot)=>
					unless snapshot.val()
						fUser.set
							uid: user.uid
							name: user.displayName ? ""
							photoURL: user.photoURL
				fUsers?.on "value", (snapshot)=>
					# console.log snapshot#, snapshot.val()
					users = snapshot.val()
					@setState {users}
				fContacts?.on "value", (snapshot)=>
					contacts = snapshotToArray(snapshot)
					@setState {contacts}
				
				@setState {user, contacts, loadingAuthState: no, fUser, fUsers, fContacts}
	
	render: ->
		{user, contacts, users, loadingAuthState} = @state
		
		# getContactByDisplayName = (displayName)->
		# 	for contact in contacts when contact.displayName is displayName
		# 		return contact
		
		# getContact = (uid)->
		# 	for contact in contacts when contact.uid is uid
		# 		return contact
		
		addContact = =>
			
		
		E ".app",
			if user?
				E Layout, fixedHeader: yes, fixedDrawer: yes,
					E Header, title: "Natter",
						E Spacer
						E UserProfile, {user}
					E Drawer,
						E PanelTabs, {contacts, users, addContact}
					E Content,
						if location.hash
							contact_uid = location.hash.replace(/#/, "")
							# contact = getContact(contact_uid)
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
				E SignInScreen
