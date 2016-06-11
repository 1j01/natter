
class @Avatar extends React.Component
	render: ->
		{name, url, size} = @props
		size ?= 64
		E ".avatar",
			if url
				E "img", src: url, width: size, height: size
			else
				E Avastar, {seed: name, size}
