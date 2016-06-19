
class @PanelTab extends React.Component
	render: ->
		{hash, children} = @props
		current_hash = location.hash.slice(1)
		E "a.mdl-navigation__link.panel-tab",
			class: "is-active": current_hash is hash
			href: "##{hash}"
			children
