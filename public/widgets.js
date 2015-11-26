
/*
$prefixed variables hold jQuery objects
$Prefixed constructor-like widget function thingies that return a jQuery object
Things that aren't added to the page / munipulated like elements shouldn't be widgets.
Things that must be in the page at start (the login form, the <body>) definitely shouldn't be widgets.
*/

var $panels = $(), panels = [];
var $tabs = $(), tabs = [];
$Panel = function(){
	var $p = $("<div class='panel hidden'/>").appendTo("#panels-area");
	//$p.$tab = null;
	
	$p.open = function(){
		/*$p.trigger("open");
		$panels.each(function(){
			$(this).close();
		});*/
		$p.addClass("active");
		$p.removeClass("hidden");
	};
	$p.close = function(){
		/*if($p.hasClass("open")){
			$p.trigger("close");*/
			$p.addClass("hidden");
			$p.removeClass("active");
		//}
	};
	
	$panels.push($p);
	panels.push($p);
	
	return $p;
};
$ChatPanel = function(user, socket){
	//(?does not know what users are involved in the conversation, just adds messages? and has a send message event?)
	var $cp = $Panel().addClass("chat-panel");	
	var $log = $("<div class='chat-log'/>");
	var $input = $MessageInput();
	
	$cp.log = function(xmmlf){
		$log.append($MessageRow($Message(xmmlf)));
	};
	$cp.append($log,$input);
	$input.on("send",function(e,xmmlf){
		socket.emit("im",{to:user.uname, message:xmmlf});
		$log.append($MessageRow($Message(xmmlf).addClass("from-me")));
		//console.log(msg);
	});
	
	return $cp;
};
$SettingsPanel = function(socket){
	var $sp = $Panel().addClass("settings-panel");
	$sp.append("<h1>Settings</h1>");
	$sp.append("<p>There are none! Haha isn't this great?</p>");
	return $sp;
};

$PanelTab = function($panel){
	var $tab = $("<div class='panel-tab'/>");
	$tab.$panel = $panel;
	$panel.$tab = $tab;
	$tab.on("hide",function(){
		$tab.$panel.close();
		$tab.removeClass("active");		
	});
	$tab.on("click",function(){
		$tabs.trigger("hide");
		$tab.$panel.open();
		$tab.addClass("active");
	});
	$tabs.push($tab);
	tabs.push($tab);
	return $tab;
};

$ChatPanelTab = function(u,$p){
	var $tab = $PanelTab($p).addClass("chat-panel-tab");
	$tab.text(u.name||u.uname);
	$tab.prepend($Avastar(u.uname,24));
	return $tab;
};

(function(){
	var $em = $("<div class='emoticons-menu popup bubble'/>");
	$.get("/emotes-list",function(list){
		var urls = list.trim().split("\n");
		for(var i=0; i<urls.length; i++){
			$("<img/>").attr({
				width: 16,
				height: 16,
				src: urls[i],
				//title: urls[i].replace(/\.png/,"").replace(/\/?(res)?\/?emotes\/?(\w+\/)?/,"")
				title: urls[i]
					.match(/([^\/]*)\./)[1] //match "bla/bla/<THIS>.bmpsvg"
					//.replace(/[_\-]/g," ") // "-_-" -> "   "
			}).on("click",function(){
				var $emote = $(this).clone().addClass("emote").data("e",$(this).attr("title"));
				//insert $emote into selection (replace selection with $emote)
			}).appendTo($em);
		}
	});
	$EmoticonsMenu = function(){
		return $em;
	};
})();
