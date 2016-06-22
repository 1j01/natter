
@signIn = ->
	provider = new firebase.auth.GoogleAuthProvider()
	# provider.addScope("https://www.googleapis.com/auth/plus.login")
	firebase.auth().signInWithPopup(provider)
		.then (result)->
			token = result.credential.accessToken
		.catch (error)->
			{email, credential, message, code} = error
			if code is "auth/account-exists-with-different-credential"
				alert("You have already signed up with a different auth provider for that email.")
				# If you are using multiple auth providers on your app you should handle linking
				# the user's accounts here.
			else
				console.error(error)

@signOut = ->
	firebase.auth().signOut()
	location.hash = ""

contacts = [
	{uid: "ds09fsg0709dfgd", displayName: "Eric Doughborg"}
	{uid: "sdgf7098tjdfg89", displayName: "Hanz Darntruliest"}
]

do render = ->
	ReactDOM.render (E App, {contacts}), document.getElementById("app")

addEventListener "hashchange", render
