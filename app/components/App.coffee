
class @App extends React.Component
	render: ->
		{user} = @props
		E ".app",
			if user?
				# <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
					# <div class="mdl-layout__drawer">
						# <span class="mdl-layout-title">Title</span>
						# <nav class="mdl-navigation">
							# <a class="mdl-navigation__link" href="">Link</a>
							# <a class="mdl-navigation__link" href="">Link</a>
							# <a class="mdl-navigation__link" href="">Link</a>
							# <a class="mdl-navigation__link" href="">Link</a>
						# </nav>
					# </div>
					# <main class="mdl-layout__content">
						# <div class="page-content"><!-- Your content goes here --></div>
					# </main>
				# </div>
				E ".mdl-layout.mdl-js-layout.mdl-layout--fixed-drawer",
					E ".mdl-layout__drawer",
						# E "span.mdl-layout-title", "Natter"
						E UserProfile, {user}
						E ".placeholder",
							"Tabs for users, settings, and feedback would go here"
					E ".mdl-layout__content",
						E ".page-content",
							E ".placeholder",
								"Panels would go here"

			else
				E SignInScreen
