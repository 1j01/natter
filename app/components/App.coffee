
{Layout, Header, Spacer, Drawer, Navigation, Content} = ReactMDL

class @App extends React.Component
	constructor: ->
		@state = user: null, loading: yes
		
		firebase.auth().onAuthStateChanged (user)=>
			# timeout because otherwise any errors are swallowed thanks to Promises
			setTimeout =>
				@setState {user, loading: no}
	
	render: ->
		{user, loading} = @state
		
		E ".app",
			if user?
				E Layout, fixedHeader: yes, fixedDrawer: yes,
					E Header, title: "Natter",
						E Spacer
						E UserProfile, {user}
					E Drawer,
						E PanelTabs
					E Content,
						E ".placeholder",
							"Panels would go here"
			else if loading
				E ".loading"
			else
				E SignInScreen
