
class @Contact extends React.Component
	render: ->
		{name, photoURL, highlightStartIndex, highlightEndIndex} = @props
		E ".contact.user",
			E Avatar, {name, photoURL, size: 48}
			E ".username",
				if highlightStartIndex? and highlightEndIndex
					E HighlightRange, text: name, startIndex: highlightStartIndex, endIndex: highlightEndIndex
				else
					name
