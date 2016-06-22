
{Navigation, Spacer} = ReactMDL

class @PanelTabs extends React.Component
	render: ->
		{contacts} = @props
		E ".panel-tabs",
			E Navigation,
				for contact in contacts
					E PanelTab,
						hash: contact.displayName
						key: contact.displayName
						E Contact, user: contact
			E Spacer
			E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
				"Send Feedback"
			E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
				"Settings"
