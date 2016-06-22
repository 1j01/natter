
class @ChatLog extends React.Component
	render: ->
		E ".chat-log",
			E Message, message: "Hello World!"
			E Message, message: "Sample Message"
			E Message, message: "Sample Text"
			E Message, message: "See you later!"
