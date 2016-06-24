
{Navigation, Spacer, Button, Textfield} = ReactMDL

# Should this just be called Sidebar?
# I can probably break it up better...

class @PanelTabs extends React.Component
	constructor: ->
		@state = search: ""
	render: ->
		{contacts, users, addContact} = @props
		{search} = @state
		
		# TODO: rank function as the only difference?
		if search
			rank = (user)->
				names = user.name.split(" ")
				for name in names
					if name.toLowerCase().indexOf(search.toLowerCase()) is 0
						return 2
				if user.name.toLowerCase().indexOf(search.toLowerCase()) > -1
					return 1
				return 0
				
			users_to_display =
				user for uid, user of users when rank(user) > 0
			users_to_display.sort (a, b)->
				rank(a) - rank(b)
		else
			# users_to_display = contacts
			users_to_display =
				user for uid, user of users when uid in contacts
			users_to_display.sort (a, b)->
				contacts.indexOf(a) - contacts.indexOf(b)
		
		# console.log {search, users, contacts, users_to_display}
		
		E ".panel-tabs",
			# TODO: use Textfield
			# https://github.com/tleunen/react-mdl/issues/335
			# E Textfield,
			# 	label: "Search"
			# 	value: ""
			# 	onChange: (e)=>
			E "input.search",
				placeholder: "Find contacts"
				value: search
				onChange: (e)=>
					@setState search: e.target.value
			
			E Navigation,
				for user in users_to_display
					# TODO: highlight search matches
					# ideally display (only) the match that ranks it the highest
					E PanelTab,
						hash: user.uid
						key: user.name
						E Contact, name: user.name, photoURL: user.photoURL
			# E Button,
			# 	onClick: =>
			# 		addContact()
			# 	"Add Contact"
			E Spacer
			E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
				"Send Feedback"
			E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
				"Settings"
