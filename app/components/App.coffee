
{Layout, Header, Spacer, Drawer, Navigation, Content, ProgressBar} = ReactMDL

class @App extends React.Component
	constructor: ->
		@state =
			user: null # You sir!
			fUser: null # Eff you, sir!
			loadingAuthState: yes
		
		firebase.auth().onAuthStateChanged (user)=>
			# timeout because otherwise any errors are swallowed thanks to Promises
			setTimeout =>
				{fRoot} = @props
				fUser = if user then fRoot.child("users").child(user.uid)
				@setState {user, fUser, loadingAuthState: no}
	
	render: ->
		{contacts} = @props
		{user, loadingAuthState} = @state
		
		getContactByDisplayName = (displayName)->
			for contact in contacts when contact.displayName is displayName
				return contact
		
		E ".app",
			if user?
				E Layout, fixedHeader: yes, fixedDrawer: yes,
					E Header, title: "Natter",
						E Spacer
						E UserProfile, {user}
					E Drawer,
						E PanelTabs, {contacts}
					E Content,
						if location.hash
							contact_name = location.hash.replace(/#/, "")
							contact = getContactByDisplayName(contact_name)
							if contact
								E ChatPanel, user: contact
							else
								E ".error",
									"That user no longer exists"
									# "Contact removed"
									# "Invite #{contact_name}"
									# "Add #{contact_name} as a contact"
									# location.hash = ""
						else
							E ".welcome",
								"Welcome to Natter"
			else if loadingAuthState
				E ProgressBar, indeterminate: yes
			else
				E SignInScreen
