/* Cross Browser Support */
var requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;
var URL = window.URL || window.webkitURL;

$(function(){
	DnD($("body"));
	
	$("body").on("dragenter dragover dragexit", function(e){
		if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.hasfiles){
			//console.log(e.type,e.originalEvent.dataTransfer.files);
		}
	}).on("drop", function drop(e){
		if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files && e.originalEvent.dataTransfer.files.length){
			stopEvent(e);
		}
	});
});

$.fn.dnd = function(){
	console.log("dnd? you want DND? huh? ha!",this);
};

function DnD($e,o){
	
	$e.on("dragenter dragover dragexit", function(e){
		if(e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files && e.originalEvent.dataTransfer.files.length){
			//console.log(e.type,e.originalEvent.dataTransfer.files);
		}else{
			//console.log(e.type,"no files",e.originalEvent.dataTransfer.files);
		}
	});
	$e.on("drop", function drop(e){
		
		if(!e.originalEvent.dataTransfer || !e.originalEvent.dataTransfer.files || !e.originalEvent.dataTransfer.files.length){
			return;
		}
		stopEvent(e);
		
		// get list of dropped files (||fail silently)
		var files = e.originalEvent.dataTransfer.files||[];
		// amount of dropped files
		var count = files.length;
		
		// One file at least neccessary to continue
		if(count > 0){
			
		}
	});
	/*
	function handleFiles(files, masterObj){
		// handle only the first file (no multifile support) 
		var file = files[0];
		// create the reader to access the local file (note: browser have different security restrictions) 
		var reader = new FileReader();
		
		// init the reader event handlers
		reader.onload = function(e){
			var arrayBuffer = e.target.result;
			var arr = new Uint8Array(arrayBuffer);
			// do something with array?
		};
		
		// load the file as array buffer
		reader.readAsArrayBuffer(file);
	}*/
	
	function stopEvent(e){
		e.stopPropagation();
		e.preventDefault();
	}
	
};