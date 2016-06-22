
{Layout, Header, Spacer, Drawer, Navigation, Content} = ReactMDL

class @App extends React.Component
	constructor: ->
		@state = user: null, loading: yes
		
		firebase.auth().onAuthStateChanged (user)=>
			# timeout because otherwise any errors are swallowed thanks to Promises
			setTimeout =>
				@setState {user, loading: no}
	
	render: ->
		{contacts} = @props
		{user, loading} = @state
		
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
							contact = getContactByDisplayName(location.hash.replace(/#/, ""))
							if contact
								E ChatPanel, user: contact
							else
								E ".error",
									"That user no longer exists"
						else
							E ".welcome",
								"Welcome to Natter"
			else if loading
				E ".loading"
			else
				E SignInScreen
