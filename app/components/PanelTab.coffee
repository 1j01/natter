
class @PanelTab extends React.Component
	render: ->
		{hash, children} = @props
		current_hash = location.hash.slice(1)
		E "a.panel-tab.mdl-tabs__tab",
			class: "is-active": current_hash is hash
			href: "##{hash}"
			children
