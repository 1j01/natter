
class @Panel extends React.Component
	render: ->
		{hash, children} = @props
		E ".panel",
			children
