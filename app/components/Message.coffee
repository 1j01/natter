
class @Message extends React.Component
	render: ->
		{message} = @props
		E ".message", E ".bubble", message
