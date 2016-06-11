
(function(){
	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;
	
	var $VideoEmbed = function($e, ur$l){
		var $ve = $("<iframe class='video'/>");
		$ve.attr({
			width: $e.attr("width") || 640,
			height: $e.attr("height") || 480,
			allowfullscreen: true,
			src: ur$l.replace("$vid", encodeURIComponent($ve.attr("vid")))
		});
		return $el;
	};
	var ytparam = $.param({
		enablejsapi: 1,
		fs: 1,
		autoplay: 0,
		modestbranding: 1,
		theme: "light",
		origin: location.origin
	});
	var elements = {
		emote: function($e){
			console.log("EMOTETEOMTETOM");
			return $("<img/>").attr("src","/res/emotes/"+$e.attr("e")+".png");
		},
		youtube: function($e){
			return $VideoEmbed($e, "//www.youtube.com/embed/$vid?"+ytparam).addClass("youtube");
		},
		vimeo: function($e){
			return $VideoEmbed($e, "//player.vimeo.com/video/$vid").addClass("vimeo");
		},
	};
	
	$Message = function(xmmlf){
		//call with xmmlf (eXtensibe Message Markup Language Fragment)
		//or an $XmlDoc jquery object
		var $message = $("<div class='message bubble'/>");
		
		if(xmmlf.is/*a jquery object*/){
			$xml = xmmlf;
		}else{
			//form xml from fragment
			var xml = "<message>"+xmmlf+"</message>";
			//and parse it
			try{
				$xml = $($.parseXML(xml));
			}catch(e){
				return $message.html("<b class='error' style='color:red'>Invalid XML</b>");
			}
		}
		
		X($xml.$("message"), $message);
		
		function X($element, $into){
			//console.log($element, $into);
			var $contents = $element.contents();
			$contents.each(function(){
				var $n = $(this);
				if(this.nodeType === TEXT_NODE){
					//$n is a $(#text node)
					$into.append($n.clone());
				}else if(this.nodeType === ELEMENT_NODE){
					//$n is an $element
					var $newel;
					var nn = this.nodeName.toLowerCase();
					if(/^([quibasp]|strike|strong|em|ins|del|sub|sup|span|div|img|h[123456r]|pre|blockquote|[ou]l|li|code|var|samp|kbd|w?br)$/.exec(nn)){
						$newel = $(document.createElement(nn));
					}else if(elements[nn]){
						$newel = elements[nn]($n);
					}
					if($newel){
						$newel.attr("title",$n.attr("title"));
						$into.append($newel);
						X($n, $newel);
					}
				}
			});
		}
		
		return $message;
	}

	$MessageRow = function($msg){
		return $("<div class='message-row'/>").append($msg||$());
	};
	
	$MessageInput = function(){
		var $mi = $("<div class='message-input-section bubble'/>");
		var $ce = $("<div contenteditable class='message-input-input'/>").appendTo($mi);
		$ce.on("keydown",function(e){
			if(e.keyCode===13 && !e.shiftKey){
				e.preventDefault();
				$mi.triggerHandler("send", getXMML($ce));
				$ce.empty();
			}
		});
		var $tools = $("<div class='message-input-tools'/>").appendTo($mi);
		var $link = $("<img class='tb-item' title='Create Link' src='https://cdn1.iconfinder.com/data/icons/ledicons/link.png'/>");
		var $emotes = $("<img class='tb-item' title='Emoticons Menu' src='/res/emotes/simple/happy.png'/>");
		var $draw = $("<img class='tb-item' title='Pictochat Mode' src='http://www.digitalnintendo.com/images/misc/Pictochat/box.png' width=16 height=16/>");
		/*var $speech = $("<input class='tb-item' title='Speech Input' x-webkit-speech/>");
		if($speech[0].webkitSpeech){
			//$speech.css({
			//	display: "inline-block",
			//	width: 16,
			//	height: 16,
			//	border: 0,
			//	background: "transparent"
			//});
			$speech.on("webkitspeechchange", function(){
				$ce.appendText(this.value);
				this.value = "";
			});
			$tools.append($speech);
		}*/
		$tools.append($link,$draw,$emotes);
		$tools.find(".tb-item").on("dragstart",function(e){
			e.preventDefault();
		});
		return $mi;
	};
	
	function getXMML($el){
		var xmml = "";
		//xhtml = $el.innerHTML;
		var children = $el.contents();
		children.each(function(){
			var n = this, $n = $(n);
			if(n.nodeType == TEXT_NODE){
				xmml += esc(n.nodeValue);
			}else if(n.nodeType == ELEMENT_NODE){
				var nn = n.nodeName.toLowerCase();
				if(nn === "a"){
					//@TODO: short yt urls
					var m = $n.attr("href").match(/^(?:https?)(?::\/\/)?(?:www\.)?youtube.com\/(?:watch\?v=|embed\/)([A-Za-z0-9\-]+)/);
					if(m){
						xmml += '<youtube vid="'+m[1]+'"/>';
						return;
					}
					var m = $n.attr("href").match(/^(?:https?)(?::\/\/)?(?:www\.)?vimeo.com\/(\d+)/);
					if(m){
						xmml += '<vimeo vid="'+m[1]+'"/>';
						return;
					}
				}else if(nn === "canvas"){
					xmml += '<img src="'+$n.toDataURL('image/png')+'"/>';
					return;
				}else if(nn === "img" && $n.data("e")){
					xmml += '<emote e="'+$n.data("e")+'"/>';
					return;
				}
				xmml += "<"+nn;
				var attrs = $n.attrs();
				for(var a in attrs){
					xmml += ' '+a+'="'+esc(attrs[a])+'"';
				}
				xmml += ">" + getXMML($n) + "</"+nn+">";
			}
		});
		return xmml;
	}		
	function esc(str){
		return str
		.replace(/'/g,"&#39;")
		.replace(/"/g,"&#34;")
		.replace(/</g,"&lt;")
		.replace(/>/g,"&gt;")
		.replace(/&/g,"&amp;");
	}
})();