
class @UserProfile extends React.Component
	render: ->
		{user} = @props
		name = user.displayName
		E ".user-profile",
			E Avastar, seed: name, size: 128
			E ".user-name", name
			# <div class="mdl-textfield mdl-js-textfield">
			# 	<input class="mdl-textfield__input" type="text" id="user-name">
			# 	<label class="mdl-textfield__label" for="user-name">Username</label>
			# </div>
