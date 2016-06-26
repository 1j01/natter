
{Navigation, Spacer, Button, Textfield} = ReactMDL

# Should this just be called Sidebar?
# I can probably break it up better...

class @PanelTabs extends React.Component
	constructor: ->
		@state = search: ""
	render: ->
		{contacts, users} = @props
		{search} = @state
		
		# TODO: rank function as the only difference?
		# or maybe contacts should already be an array of users
		# and it should not only rank users but keep the matches
		if search
			find_match = (user)->
				names = user.name.split(" ")
				name_index = 0
				for name in names
					index = name.toLowerCase().indexOf(search.toLowerCase())
					if index is 0
						absolute_index = name_index + index
						return {rank: 2, startIndex: absolute_index, endIndex: absolute_index + search.length}
					name_index += name.length + 1
				# (name_index = 0)
				index = user.name.toLowerCase().indexOf(search.toLowerCase())
				if index >= 0
					return {rank: 1, startIndex: index, endIndex: index + search.length}
				return {rank: 0}
			
			matches = []
			for uid, user of users
				match = find_match(user)
				match.user = user
				matches.push(match) if match.rank > 0
			
			matches.sort (a, b)->
				match.rank - match.rank
			users_to_display =
				match.user for user in matches
		else
			users_to_display =
				user for uid, user of users when uid in contacts
			users_to_display.sort (a, b)->
				contacts.indexOf(a) - contacts.indexOf(b)
		
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
				for user, index in users_to_display
					match = matches?[index]
					# TODO: highlight search matches
					# ideally display (only) the match that ranks it the highest
					E PanelTab,
						hash: user.uid
						key: user.uid
						E Contact, name: user.name, photoURL: user.photoURL, highlightStartIndex: match?.startIndex, highlightEndIndex: match?.endIndex
			E Spacer
			E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
				"Send Feedback"
			E "a.panel-tab.feedback-panel-tab.mdl-button.mdl-js-button",
				"Settings"
