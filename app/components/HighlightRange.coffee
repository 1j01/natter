# # Here we store each child
# titleChildren = []
# segments.forEach (segment, i)=>
#     # Here we add the first segment
#     titleChildren.push E "span.segment", segment
#     # If last segment then don't add the highlight part
#     return if segments.length is i + 1
#     # Here we add the highlighted part
#     titleChildren.push E "span.segment.highlight", replacements[i]

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

