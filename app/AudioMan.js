
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
		if(audio.canplay){ // @TODO: make sure this doesn't stop it from ever playing any sounds?
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
