
class @Avastar extends React.Component
	render: ->
		E "canvas.avastar"
	
	componentDidMount: -> @draw()
	componentDidUpdate: -> @draw()
	shouldComponentUpdate: (newProps)->
		newProps.seed isnt @props.seed or
		newProps.sides isnt @props.sides or
		newProps.size isnt @props.size
	
	draw: ->
		{seed, sides, size} = @props
		size ?= 64
		canvas = ReactDOM.findDOMNode(@)
		canvas.width = canvas.height = size
		ctx = canvas.getContext("2d")
		drawAvastar ctx, seed, size, sides
	
