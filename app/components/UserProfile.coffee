
{Textfield, Button} = ReactMDL

class @UserProfile extends React.Component
	render: ->
		{user} = @props
		E ".user-profile.user",
			# TODO: drag and drop image to upload new profile image
			# TODO: click avatar to upload new profile image
			E Avatar, name: user.displayName, url: user.photoURL, size: 48
			# TODO: edit user name
			if setUsername?
				E Textfield,
					label: "Username"
					value: user.displayName
					onChange: (e)=> # TODO
			else
				E ".username", user.displayName
			
			E Button,
				onClick: => signOut()
				"Sign out"
