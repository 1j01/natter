
{Button} = ReactMDL

class @SignInScreen extends React.Component
	render: ->
		{signIn} = @props
		E ".sign-in-screen",
			E "h1", "Natter"
			E Button,
				raised: yes, accent: yes
				onClick: signIn
				"Sign in with Google"
