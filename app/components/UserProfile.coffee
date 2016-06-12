
class @UserProfile extends React.Component
	render: ->
		{user} = @props
		E ".user-profile",
			# TODO: drag and drop image to upload new profile image
			# TODO: click avatar to upload new profile image
			E Avatar, name: user.displayName, url: user.photoURL
			# TODO: edit user name
			if setUsername?
				E ".mdl-textfield.mdl-js-textfield", ref: "mdl-js-textfield",
					E "input.textfield__input", type: "text", id: "username", value: user.displayName
					E "label.textfield__label", for: "username", "Username"
			else
				E ".user-name", user.displayName
			
			# TODO: make sign out button less prominent?
			E "button.mdl-button.mdl-js-button.mdl-button--raised",
				ref: "mdl-js-button"
				onClick: => signOut()
				"Sign out"
	
	componentDidMount: ->
		componentHandler.upgradeElement @refs["mdl-js-button"]
		if @refs["mdl-js-textfield"]?
			componentHandler.upgradeElement @refs["mdl-js-textfield"]
