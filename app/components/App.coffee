
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
				E ".mdl-layout.mdl-js-layout.mdl-layout--fixed-drawer",
					E ".mdl-layout__drawer",
						E UserProfile, {user}
						# E PanelTabs, [user, user, displayName: "Eric Doughborg"]
						# E ".user-tabs",
						# 	E "a.panel-tab.mdl-button.mdl-js-button.mdl-button--raised"
						# 	E "a.panel-tab.mdl-button.mdl-js-button.mdl-button--raised"
						# E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
						# 	"Send Feedback"
						E PanelTabs
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
