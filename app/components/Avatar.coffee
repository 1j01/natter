
class @Avatar extends React.Component
	render: ->
		{name, photoURL, size} = @props
		size ?= 64
		E ".avatar",
			if photoURL
				E "img", src: photoURL, width: size, height: size
			else
				E Avastar, {seed: name, size}
