
# {List, ListItem} = ReactMDL
{Navigation, Spacer} = ReactMDL

contacts = [
	{uid: "ds09fsg0709dfgd", displayName: "Eric Doughborg"}
	{uid: "sdgf7098tjdfg89", displayName: "Hanz Darntruliest"}
]

class @PanelTabs extends React.Component
	render: ->
		E ".panel-tabs",
			# E List,
			E Navigation,
				# E ".user-tabs",
					# E ListItem,
					# 	"User"
					# E ListItem,
					# 	"User"
					# for tab in @props.tabs
					# 	E PanelTab, tab
					for contact in contacts
						# console.log contact
						# E ListItem,
						# E "a.mdl-navigation__link",
							E PanelTab,
								hash: contact.displayName
								key: contact.displayName
								E Contact, user: contact
				# E ".special-tabs",
					# E ListItem, key: "send-feedback",
			E Spacer
			E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
				"Send Feedback"
					# E ListItem, key: "settings",
			E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
				"Settings"

	
	# componentDidMount: ->
	# 	componentHandler.upgradeElement @refs["mdl-js-tabs"]
