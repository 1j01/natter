
class @UserProfile extends React.Component
	render: ->
		{user} = @props
		E ".user-profile",
			# TODO: drag and drop image to upload new profile image
			# TODO: click avatar to upload new profile image
			E Avatar, name: user.displayName, url: user.photoURL
			# TODO: edit user name
			E ".user-name", user.displayName
			# <div class="mdl-textfield mdl-js-textfield">
			# 	<input class="mdl-textfield__input" type="text" id="user-name">
			# 	<label class="mdl-textfield__label" for="user-name">Username</label>
			# </div>
			# TODO: sign out button
