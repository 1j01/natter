
class @HighlightRange extends React.Component
    render: ->
        {text, startIndex, endIndex} = @props
        
        before = text.slice(0, startIndex)
        highlight = text.slice(startIndex, endIndex)
        after = text.slice(endIndex)
        
        E "span.highlight-range-container",
            before
            E "span.highlight", highlight
            after

