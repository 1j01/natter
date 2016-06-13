
class @UserProfile extends React.Component
	render: ->
		{user} = @props
		E ".user-profile.user",
			# TODO: drag and drop image to upload new profile image
			# TODO: click avatar to upload new profile image
			E Avatar, name: user.displayName, url: user.photoURL, size: 48
			# TODO: edit user name
			if setUsername?
				E ".mdl-textfield.mdl-js-textfield", ref: "mdl-js-textfield",
					E "input.textfield__input", type: "text", id: "username", value: user.displayName
					E "label.textfield__label", for: "username", "Username"
			else
				E ".username", user.displayName
			
			# TODO: make sign out button less prominent?
			E "button.mdl-button.mdl-js-button",
				ref: "mdl-js-button"
				onClick: => signOut()
				"Sign out"
	
	componentDidMount: ->
		componentHandler.upgradeElement @refs["mdl-js-button"]
		if @refs["mdl-js-textfield"]?
			componentHandler.upgradeElement @refs["mdl-js-textfield"]
