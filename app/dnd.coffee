
requestFileSystem = window.requestFileSystem ? window.webkitRequestFileSystem
BlobBuilder = window.WebKitBlobBuilder ? window.MozBlobBuilder
URL = window.URL ? window.webkitURL

$ ->
	DnD $("body")
	
	$("body")
		.on "dragenter dragover dragexit", (e)->
			console.log e.originalEvent.dataTransfer?.hasfiles
			# console.log e.type, e.originalEvent.dataTransfer.files
			
		.on "drop", (e)->
			if e.originalEvent.dataTransfer?.files?.length
				stopEvent e


$.fn.dnd = ->
	console.log "dnd? you want DND? huh? ha!", @

DnD = ($e,o)->
	
	$e.on "dragenter dragover dragexit", (e)->
		if e.originalEvent.dataTransfer?.files?.length
			console.log e.type, e.originalEvent.dataTransfer.files
		else
			console.log e.type, "no files", e.originalEvent.dataTransfer.files
	
	$e.on "drop", (e)->
		files = e.originalEvent.dataTransfer?.files
		return unless files?.length
		
		e.stopPropagation()
		e.preventDefault()
		
		handle files
	
	
	handle = (files, masterObj)->
		# handle only the first file
		file = files[0]
		reader = new FileReader
		
		# init the reader event handlers
		reader.onload = (e)->
			arrayBuffer = e.target.result
			arr = new Uint8Array arrayBuffer
			# do something with array?
		
		# load the file as array buffer
		reader.readAsArrayBuffer file
