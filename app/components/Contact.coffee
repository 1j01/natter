
class @Contact extends React.Component
	render: ->
		{name, photoURL} = @props
		E ".contact.user",
			E Avatar, {name, photoURL}, size: 48
			E ".username", name
