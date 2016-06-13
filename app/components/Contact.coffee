
class @Contact extends React.Component
	render: ->
		{user} = @props
		E ".contact.user",
			E Avatar, name: user.displayName, url: user.photoURL, size: 48
			E ".username", user.displayName
