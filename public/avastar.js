

function $Avastar(seedstr, size, sides){
	sides = sides || 5;
	//increase the resolution
	var s = size * 1;
	
	//set up the canvas
	var $c = $("<canvas>");
	$c[0].width = s;
	$c[0].height = s;
	$c.css("width", size+"px");
	$c.css("height", size+"px");
	var ctx = $c.get(0).getContext("2d");
	
	//set up the psuedo-random stuff
	var sha = new jsSHA(seedstr+"1337"+seedstr.toUpperCase(), "TEXT");
	var hash = sha.getHash("SHA-512", "HEX");
	for(var i=0; i<10; i++){
		sha = new jsSHA("s"+seedstr+"^"+seedstr.toUpperCase()+"!"+i*592.42334, "TEXT");
		hash += sha.getHash("SHA-512", "HEX");
	}
	var hashi = 0;
	var ih = function(){
		return parseInt(hash[((hashi++)%hash.length)],16);
	};
	var rand = function(min,max){
		//return somewhere between min and max
		return ((
			((ih()+ih())%16)/16
		)*(max-min))+min;
	};
	//for(var i=0;i<10;i++)console.log()
	//console.log([rand(0,100),rand(0,100),rand(0,100),rand(0,100),rand(0,100),rand(0,100)]);
	var choose = function(array){
		//choose random value from array
		return array[Math.floor(rand(0,array.length))];
	};
	
	//half-heartedly generate a palette
	var palette = [];
	for(var lig=0; lig<100; lig+=rand(10,40)){
		palette.push([rand(0,360),rand(0,100),lig]);
	}
	
	//draw some shit
	ctx.save();
	ctx.translate(s/2,s/2);
	ctx.scale(s/4,s/4);
	
	ctx.fillStyle = "rgba(155,155,155,0.5)";
	ctx.beginPath();
	ctx.arc(0,0,0.5,0,Math.PI*2,false);
	ctx.fill();
	ctx.fillStyle = "rgba(155,155,155,0.5)";
	ctx.beginPath();
	ctx.arc(0,0,1,0,Math.PI*2,false);
	ctx.fill();
	var x = rand(-1,1);
	var y = rand(-1,1);
	for(var si=0; si<150; si++){
		if(rand(0,100)<50){
			ctx.globalCompositeOperation = choose(["xor","darker","lighter","source-atop","source-over"]);
		}
		var hsl = choose(palette);
		ctx.fillStyle = "hsla("+hsl[0]+","+hsl[1]+"%,"+hsl[2]+"%,0.9)";
		if(rand(0,100)<60){
			x = rand(-1,1);
			y = rand(-1,1);
		}else{
			x += rand(-1,1)/3;
			y += rand(-1,1)/3;
		}
		var w = rand(0.1,0.5);
		var h = rand(0.1,0.5);
		
		var hashi_ = hashi;
		for(var r=0; r<sides; r++){
			hashi = hashi_;
			ctx.rotate(Math.PI*2/sides);
			
			switch(choose(["rect","tri","tri","tri","tri","oval","circle","--"])){
				case "rect":
					ctx.fillRect(x-w,y-h,w,h);
					break;
				case "circle":
					ctx.beginPath();
					ctx.arc(x,y,w,0,Math.PI*2,false);
					ctx.fill();
					break;
				case "oval":
					ctx.save();
					ctx.translate(x,y);
					ctx.rotate(rand(0,360));
					ctx.scale(w,h);
					ctx.beginPath();
					ctx.arc(0,0,1,0,Math.PI*2,false);
					ctx.fill();
					ctx.restore();
					break;
				case "tri":
					ctx.beginPath();
					ctx.moveTo(x,y);
					for(var i=0; i<3; i++){
						ctx.lineTo(x+rand(-w,w),y+rand(-h,h));
					}
					ctx.fill();
					break;
				case "poly":
					ctx.beginPath();
					ctx.moveTo(x,y);
					for(var i=0; i<Math.floor(rand(3,8)); i++){
						ctx.lineTo(x+rand(-w,w),y+rand(-h,h));
					}
					ctx.fill();
					break;
				case "--":
					hashi--;
					break;
			}
		}
	}
	ctx.restore();
	
	//debug rand()
	/*ctx.fillStyle = "rgba(255,255,255,0.5)";
	for(var i=0;i<s;i++){
		ctx.fillRect(i,rand(0,s),1,1);
	}
	ctx.fillStyle = "rgba(0,0,0,1)";
	for(var i=0;i<s*5;i++){
		ctx.fillRect(rand(0,s)+i/5,rand(0,s)+i/5,1,1);
	}*/
	
	return $c;
}