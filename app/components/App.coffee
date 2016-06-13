
class @App extends React.Component
	constructor: ->
		@state = user: null, loading: yes
		
		firebase.auth().onAuthStateChanged (user)=>
			# timeout because otherwise any errors are swallowed thanks to Promises
			setTimeout =>
				# console.log user
				@setState {user, loading: no}
	
	render: ->
		{user, loading} = @state
		# console.log @state
		E ".app",
			if user?
				E ".mdl-layout.mdl-js-layout.mdl-layout--fixed-drawer.mdl-layout--fixed-header",
					ref: "mdl-js-layout"
					style: color: "red"
					E "header.mdl-layout__header",
						E ".mdl-layout__header-row",
							E ".mdl-layout-spacer"
							E UserProfile, {user}
					E ".mdl-layout__drawer",
						# E PanelTabs, [user, user, displayName: "Eric Doughborg"]
						# E ".user-tabs",
						# 	E "a.panel-tab.mdl-button.mdl-js-button.mdl-button--raised"
						# 	E "a.panel-tab.mdl-button.mdl-js-button.mdl-button--raised"
						# E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
						# 	"Send Feedback"
						# E PanelTabs
						E ".mdl-navigation",
							E "a.mdl-navigation__link",
								E Contact, user: displayName: "Eric Doughborg"
							E "a.mdl-navigation__link",
								E Contact, user: displayName: "Hanz Darntruliest"
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
	
	componentDidMount: -> @upgradeElements()
	componentDidUpdate: -> @upgradeElements()
	upgradeElements: ->
		# this would break unmounting because mdl-js-layout gets surrounded by a container
		# need to use https://github.com/tleunen/react-mdl
		# if @refs["mdl-js-layout"]?
		# 	componentHandler.upgradeElement @refs["mdl-js-layout"]
