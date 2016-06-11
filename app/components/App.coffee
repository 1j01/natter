
class @App extends React.Component
	render: ->
		{user} = @props
		E ".app",
			if user?
				E "dfg",
					E UserProfile, {user}
			else
				E SignInScreen
