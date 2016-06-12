
class @ChatPanel extends React.Component
	render: ->
		E ".chat-panel",
			E ChatLog
			E MessageInput
