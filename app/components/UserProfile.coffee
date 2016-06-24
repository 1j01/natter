
{Textfield, Button} = ReactMDL

class @UserProfile extends React.Component
	render: ->
		{name, photoURL, setUsername, signOut} = @props
		E ".user-profile.user",
			# TODO: drag and drop image to upload new profile image
			# TODO: click avatar to upload new profile image
			E Avatar, {name, photoURL, size: 48}
			# TODO: edit user name
			if setUsername?
				E Textfield,
					label: "Username"
					value: name
					onChange: (e)=> # TODO
			else
				E ".username", name
			
			E Button,
				onClick: signOut
				"Sign out"
