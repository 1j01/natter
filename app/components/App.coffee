
class @App extends React.Component
	constructor: ->
		@state = user: null, loading: yes
		
		firebase.auth().onAuthStateChanged (user)=>
			# console.log "user", user
			@setState {user, loading: no}
	
	render: ->
		{user, loading} = @state
		E ".app",
			if user?
				E ".mdl-layout.mdl-js-layout.mdl-layout--fixed-drawer",
					E ".mdl-layout__drawer",
						E UserProfile, {user}
						E ".placeholder",
							"Tabs for users, settings, and feedback would go here"
					E ".mdl-layout__content",
						E ".page-content",
							E ".placeholder",
								"Panels would go here"

			else if loading
				E ""
			else
				E SignInScreen
