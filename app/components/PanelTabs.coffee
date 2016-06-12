
class @PanelTabs extends React.Component
	render: ->
		# E ".panel-tabs.mdl-navigation.mdl-tabs.mdl-js-tabs.mdl-js-ripple-effect",
		# 	ref: "mdl-js-tabs"
		# 	# E "a.mdl-tabs__tab.is-active", href: "#@A", "A"
		# 	# E "a.mdl-tabs__tab", href: "#@B", "B"
		# 	# E "a.mdl-tabs__tab", href: "#@C", "C"
		# 	# E "a.mdl-tabs__tab", href: "#@D", "D"
		# 	E PanelTab, hash: "A", "A"
		# 	E PanelTab, hash: "B", "B"
		# 	E PanelTab, hash: "C", "C"
		# 	E PanelTab, hash: "D", "D"
		E ".panel-tabs",
			E ".user-tabs",
				E "a.panel-tab.mdl-button.mdl-js-button.mdl-button--raised",
					"User"
				E "a.panel-tab.mdl-button.mdl-js-button.mdl-button--raised",
					"User"
				# for tab in @props.tabs
				# 	E PanelTab, tab
			E ".special-tabs",
				E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
					"Send Feedback"
				E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
					"Settings"

	
	# componentDidMount: ->
	# 	componentHandler.upgradeElement @refs["mdl-js-tabs"]
