//Try entering the Konami Code.
//SAUASUHUHASUHASUH
(function(){
	var kkeys = [];
	$(window).on("keydown", function(e){ 
		kkeys.push(e.keyCode); 
		if(kkeys.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0){
			kcEntered(kkeys=[]);
		}
	});
	
	var kcfs = [filter,shady,woop,shady,woop,wooop,candles,yticy,rec,tol];
	function kcEntered(){
		kcfs[Math.floor(Math.random()*kcfs.length)]();
		return true;
	}
	function filter(){
		make$style("body{-webkit-filter: "+
			"saturate("+Math.floor((Math.random()*7055545))+"%) "+
			((Math.random()<0.3)?" sepia()":"")+
			((Math.random()<0.3)?" invert()":"")+
			"hue-rotate("+Math.floor((Math.random()*360))+"deg)"+
			((Math.random()<0.3)?" invert()":"")+
			((Math.random()<0.3)?" sepia()":"")+
			";}"
			+"*{ -webkit-transition: all .2s ease-in-out;- webkit-transform-origin: 50% 50%; "
			+":not(:hover){-webkit-transform: rotate(90deg) scale(0.9); }"
			+"div:not(:hover){-webkit-transform: rotate(-45deg) scale(0.6); }"
			+"span:not(:hover){-webkit-transform: rotate(90deg) scale(2); }");
		//console.log(c);
	}
	var $shady, shadypoints = [];
	function shady(){
		if(!$shady){
			$shady = $("<div/>").appendTo("body").css({
				width: "100%",
				height: "100%",
				position: "fixed",
				//pointerEvents: "none"
			})
			$(window).hover(function(){
				$shady.css({background: "transparent"});
			},function(){
				$shady.css({background: "url(http://s3.amazonaws.com/rapgenius/star.gif) repeat"});
			});
			setInterval(function(){
				for(var i=0; i<shadypoints.length; i++){
					var s=shadypoints[i];
					if(s.x<0){s.xs+=1;}
					if(s.y<0){s.ys+=1;}
					if(s.x>$shady.width()){s.xs-=1;}
					if(s.y>$shady.height()){s.ys-=1;}
					s.x += s.xs;
					s.y += s.ys;
					s.r += s.rs;
					s.$img.css({
						position: "absolute",
						left: s.x,
						top: s.y,
						transform: "scale("+s.s+") rotate("+s.r+"deg)",
					});
				}
			},20);
		}
		var mx = 0;
		var my = 0;
		var srcs = [
			// dead links
			// "http://i1104.photobucket.com/albums/h329/zorq1/bth_Spinning-asteroid-1.gif",
			// //"http://i1104.photobucket.com/albums/h329/zorq1/bth_Spinning-asteroid-2.gif",
			// "http://i1104.photobucket.com/albums/h329/zorq1/bth_Spinning-asteroid-3.gif",
			// "http://i1104.photobucket.com/albums/h329/zorq1/bth_Spinning-asteroid-4.gif",
			// "http://i1104.photobucket.com/albums/h329/zorq1/bth_Spinning-asteroid-5.gif",
			// "http://i1104.photobucket.com/albums/h329/zorq1/bth_Spinning-asteroid-6.gif",
			// "http://i1104.photobucket.com/albums/h329/zorq1/bth_Spinning-asteroid-7.gif",
			// "http://i1104.photobucket.com/albums/h329/zorq1/bth_Spinning-asteroid-8.gif",
			// "http://i1104.photobucket.com/albums/h329/zorq1/bth_Spinning-asteroid-9.gif",
			"https://web.archive.org/web/20070222062310/http://webtools.gieskes.nl/pages/images/explosion.gif"
		];
		for(var i=0; i<50; i++){
			(function(i){
				var $img=$('<img/>').attr("src",srcs[Math.floor(Math.random()*srcs.length)])
				.appendTo($shady).css({"position":"fixed","pointer-events":"all"});
				var w = $img[0].naturalWidth||64;
				var h = $img[0].naturalHeight||64;
				var s = {
					x:Math.random()*(innerWidth +w) - Math.random()*w,
					y:Math.random()*(innerHeight+h) - Math.random()*h,
					xs:Math.random()*10-5,
					ys:Math.random()*10-5,
					r:0,
					rs:Math.random()*10-5,
					//s:Math.random()*2,
					s:i/25,
					$img:$img
				};
				$img.on("dragstart",function(){
					var idx = shadypoints.indexOf(s);
					if(idx!==-1){ shadypoints.splice(idx, 1); }
				});
				$img.on("mousemove",function(e){
					s.xs = e.clientX - mx; mx = e.clientX;
					s.ys = e.clientY - my; my = e.clientY;
				});
				$img.on("mouseover",function(e){
					mx = e.clientX;
					my = e.clientY;
				});
				shadypoints.push(s);
			})(i);
		}
	}
	var am = new AudioMan();
	function candles(){
		am.add({"candles":"/res/lucky/candles.ogg"}).play("candles");
	}
	function rec(){
		am.add({"rec":"/res/lucky/rec.mp3"}).play("rec");
	}
	function tol(){
		am.add({"tol":"/res/lucky/TheOnlyLimitation.mp3"}).play("tol");
	}
	function yticy(){
		am.add({"yticy":"/res/lucky/youthinkimcrazyyeah.ogg"}).play("yticy");
	}
})();
//why is this
function make$style(css){$('<style/>').appendTo("head").append(css);}
//whyyyyyyyyyyy
function woop(q){
	for(var k="keyframes woop {\n",d=[[0,0],[10,180],[90,180],[100,360]],a="animation: woop 10s ease-in-out;",i=0;i<d.length;i++){
		k+="\t"+d[i][0]+"% {transform:rotate("+d[i][1]+"deg);-webkit-transform:rotate("+d[i][1]+"deg);-moz-transform:rotate("+d[i][1]+"deg);}\n";
	}k+="}\n";return make$style("@-webkit-"+k+"@"+k+(q||"body")+" {\n\t"+a+"\n\t-webkit-"+a+"\n}");
}
function wooop(q){
	for(var k="keyframes wooop {\n",d=[[0,0],[10,180],[90,180],[100,360]],a="animation: woop 10s ease-in-out;",i=0;i<d.length;i++){
		k+="\t"+d[i][0]+"% {transform:rotate("+d[i][1]+"deg);-webkit-transform:rotate("+d[i][1]+"deg);-moz-transform:rotate("+d[i][1]+"deg);}\n";
	}k+="}\n";return make$style("@-webkit-"+k+"@"+k+(q||"body")+" {\n\t"+a+"\n\t-webkit-"+a+"\n}");
}

renderIcon();
function renderIcon(unread){
	//Render the page's icon.
	icon(function(ctx){
		var greeny = 1;
		for(var i=0; i<200; i++){
			var s = Math.random()*4 + 3;
			var x = Math.random()*(16-s*2)+s;
			var y = Math.random()*(16-s*2)+s;
			s = y/4;
			
			var g = ctx.createRadialGradient(x, y, 0, x, y, s), hue;
			
			if(greeny){
				hue = Math.random()*(120-50)+50;//{80..120}
			}else{
				hue = Math.random()*70;//{0..70}
			}
			g.addColorStop(0, "hsla("+hue+",100%,50%,1)");
			g.addColorStop(0.8, "hsla("+hue+",100%,50%,0.3)");
			//g.addColorStop(0.8, 'rgba(0,0,0,0.3)');
			//g.addColorStop(0.8, 'rgba(255,255,255,0.3)');
			//g.addColorStop(1, Math.random()<0.2?'rgba(0,255,255,0.5)':'transparent');
			g.addColorStop(1, 'rgba(255,255,255,0)');
			ctx.fillStyle = g;
			ctx.arc(x, y, s, 0, 2*Math.PI, false);
			ctx.fill();
		}
		for(var i=0;i<15;i++){
			var s = Math.random()*1.5;
			var x = Math.random()*(16-s-s)+s;
			var y = Math.random()*(16-s-s)+s;
			var g = ctx.createRadialGradient(x, y, 0, x, y, s);
			g.addColorStop(0, "black");
			if(greeny){
				g.addColorStop(0.8, "rgba(155,255,0,1)");
			}else{
				g.addColorStop(0.8, "rgba(255,120,0,1)");
			}
			g.addColorStop(1, 'rgba(0,0,0,0)');
			ctx.fillStyle = g;
			ctx.arc(x, y, s, 0, 2*Math.PI, false);
			ctx.fill();
		}
		
		/*if(unread){
			ctx.fillStyle = "#000";
			//ctx.fillRect(8,8,8,8);
			ctx.fillRect(9,8,6,8);
			ctx.fillRect(8,9,8,6);
			ctx.fillStyle = "#FFF";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "8pt sans-serif";
			ctx.fillText(unread,12,12);
		}*/
	});
}

function icon(f) {
	/// Set the page's icon.
	
	var $l = $("link[rel~=icon]");
	//If there is no <link rel="icon"> or <link rel="shortcut icon">, create one.
	if(!$l.length){ $l = $("<link rel='shortcut icon'/>").appendTo("head"); }
	
	if(typeof f=="function"){
		//Set up the canvas.
		//var c = $('<canvas width=16 height=16/>')[0];
		var c = $('<canvas/>').attr({width:16,height:16})[0];
		//Callback.
		f(c.getContext("2d"));
		//Set the icon.
		//Internet explorer may require a .ico encoding... wait, does it even support canvas?
		$l.attr("href", c.toDataURL("image/png"||"image/x-vnd.microsoft.icon/x-ms-IE.http.favicon.ico"));
	}else if(typeof i=="string"){
		$l.attr("href", f);
	}else{
		throw new Error("Invalid args");
	}
}