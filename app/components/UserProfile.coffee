
{Textfield, Button} = ReactMDL

class @UserProfile extends React.Component
	render: ->
		{name, photoURL, setUsername, signOut} = @props
		E ".user-profile.user",
			# TODO: drag and drop image to upload new profile image
			# TODO: click avatar to upload new profile image
			E Avatar, {name, photoURL, size: 48}
			# TODO: click to edit name?
			# (unless the name is empty in which case it should always show the input with placeholder)
			if setUsername?
				# TODO: auto-sizing input
				E Textfield,
					label: "Username"
					value: name
					onChange: (e)=>
						setUsername(e.target.value)
			else
				E ".username", name
			
			E Button,
				onClick: signOut
				"Sign out"
