
class @SignInScreen extends React.Component
	render: ->
		E ".sign-in-screen",
			E "h1", "Natter"
			E "button.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored",
				onClick: => signIn()
				"Sign in with Google"
