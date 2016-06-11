
class @Message extends React.Component
	render: ->
		{message} = @props
		E ".message-row", E ".message.bubble", message
