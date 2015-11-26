
$.ajaxSetup({ cache: true });
//$.getScript("//dl.dropbox.com/u/209/zxcvbn/zxcvbn.js");
//$.getScript("/lib/zxcvbn/zxcvbn.js");

(function($) {
	$.fn.$ = $.fn.find;
	$.fn.attrs = function(){
		var attrs = {}; 

		if(this.length){
			$.each(this[0].attributes, function(index, attr){
				//IE lists unspecified attributes (must check for specified)
				//in other browsers, specified will probably always be true for compatibility
				if(attr.specified){
					attrs[attr.name.toLowerCase()] = attr.value;
				}
			}); 
		}

		return attrs;
	};
	$.fn.appendText = function(text){
		return this.each(function(){
			var textNode = document.createTextNode(text);
			$(this).append(textNode);
		});
	};
	$.fn.push = function(elements){
		var $addTo = this;
		var $elements = $(elements);
		$elements.each(function(){
			$addTo[$addTo.length++] = this;
		});
	};
})(jQuery);

/*!!
 * Title Alert 0.7
 * 
 * Copyright (c) 2009 ESN | http://esn.me
 * Jonatan Heyman | http://heyman.info
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */

(function($){
	$.titleAlert = function(text, settings) {
		// check if it currently flashing something, if so reset it
		if ($.titleAlert._running)
			$.titleAlert.stop();
		
		// override default settings with specified settings
		$.titleAlert._settings = settings = $.extend( {}, $.titleAlert.defaults, settings);
		
		// if it's required that the window doesn't have focus, and it has, just return
		if (settings.requireBlur && $.titleAlert.hasFocus)
			return;
		
		// originalTitleInterval defaults to interval if not set
		settings.originalTitleInterval = settings.originalTitleInterval || settings.interval;
		
		$.titleAlert._running = true;
		$.titleAlert._initialText = document.title;
		document.title = text;
		var showingAlertTitle = true;
		var switchTitle = function() {
			// WTF! Sometimes Internet Explorer 6 calls the interval function an extra time!
			if (!$.titleAlert._running)
				return;
			
			showingAlertTitle = !showingAlertTitle;
			document.title = (showingAlertTitle ? text : $.titleAlert._initialText);
			$.titleAlert._intervalToken = setTimeout(switchTitle, (showingAlertTitle ? settings.interval : settings.originalTitleInterval));
		}
		$.titleAlert._intervalToken = setTimeout(switchTitle, settings.interval);
		
		if (settings.stopOnMouseMove) {
			$(document).mousemove(function(event) {
				$(this).unbind(event);
				$.titleAlert.stop();
			});
		}
		
		// check if a duration is specified
		if (settings.duration > 0) {
			$.titleAlert._timeoutToken = setTimeout(function() {
				$.titleAlert.stop();
			}, settings.duration);
		}
	};
	
	// default settings
	$.titleAlert.defaults = {
		interval: 500,
		originalTitleInterval: null,
		duration:0,
		stopOnFocus: true,
		requireBlur: false,
		stopOnMouseMove: false
	};
	
	// stop current title flash
	$.titleAlert.stop = function() {
		if (!$.titleAlert._running)
			return;
		
		clearTimeout($.titleAlert._intervalToken);
		clearTimeout($.titleAlert._timeoutToken);
		document.title = $.titleAlert._initialText;
		
		$.titleAlert._timeoutToken = null;
		$.titleAlert._intervalToken = null;
		$.titleAlert._initialText = null;
		$.titleAlert._running = false;
		$.titleAlert._settings = null;
	}
	
	$.titleAlert.hasFocus = true;
	$.titleAlert._running = false;
	$.titleAlert._intervalToken = null;
	$.titleAlert._timeoutToken = null;
	$.titleAlert._initialText = null;
	$.titleAlert._settings = null;
	
	
	$.titleAlert._focus = function () {
		$.titleAlert.hasFocus = true;
		
		if ($.titleAlert._running && $.titleAlert._settings.stopOnFocus) {
			var initialText = $.titleAlert._initialText;
			$.titleAlert.stop();
			
			// ugly hack because of a bug in Chrome which causes a change of document.title immediately after tab switch
			// to have no effect on the browser title
			setTimeout(function() {
				if ($.titleAlert._running)
					return;
				document.title = ".";
				document.title = initialText;
			}, 1000);
		}
	};
	$.titleAlert._blur = function () {
		$.titleAlert.hasFocus = false;
	};
	
	// bind focus and blur event handlers
	$(window).bind("focus", $.titleAlert._focus);
	$(window).bind("blur", $.titleAlert._blur);
})(jQuery);

//////////////////

AudioMan = function(sounds){
	this.pools = {};
	if(sounds){
		this.add(sounds);
	}
};
AudioMan.prototype.add = function(sounds){
	var am = this;
	for(var s in sounds){
		var src = sounds[s];
		if(am.pools[s]) continue;
		var $pool = am.pools[s] = $('<audio>').attr("src",src);
		for(var i=0; i<1; i++){
			$pool.push($pool.eq(0).clone());
		}
		$pool.on('canplay canplaythrough', function(){
			this.canplay = true;
			//console.log("canplay");
		}).on('error',function(){
			this.cannotplay = true;
			//console.log("cannotplay");
		});
	}
	return am;
};
AudioMan.prototype.play = function(s){
	var am = this;
	var played = false;
	var allCannotEverPlay = true;
	var $pool = am.pools[s];
	for(var i=0; i<$pool.length; i++){
		var audio = $pool[i];
		//console.log(audio.canplay);
		if(audio.canplay){//@TOSOish: make sure this doesn't stop it from ever playing any sounds
			if(isPlaying(audio)){
				continue;
			}
			played = true;
			return audio.play();
		}
		allCannotEverPlay = allCannotEverPlay && audio.cannotplay;
	}
	if(!played && !allCannotEverPlay){
		setTimeout(function(){am.play(s);},200);
	}
	return am;
	//
	function isPlaying(audio){
		return !audio.paused && !audio.ended && 0 < audio.currentTime;
	}
};