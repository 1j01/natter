/*
Console commands: 
> update
> force update
> :alert("eval");
> javascript: function style(css){var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);} function animate(selector,from,to){var name="a"+Math.floor(Math.random()*5000000)+Math.floor(Math.random()*50000);style("@-webkit-keyframes "+name+"{0%{"+from+"}50%{"+to+"}100%{"+from+"}}"+selector+"{-webkit-animation:"+name+" 5s infinite;position:relative}");} animate( ":root", "-webkit-filter:saturate(10)contrast(440%)blur(0px)", "-webkit-filter:saturate(1)contrast(100%)blur(3px)" );
*/
console.log("Chat Server v0.0.1.1");

var fs = require('fs');
var walk = require('walk');
var http = require('http');
var express = require('express');
var directory = require('connect-directory');
var extensionless = require('extensionless');
var crypto = require('crypto');

var public = __dirname + '/public';
var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;


var app = express();
app.use(extensionless(public, ["html","png","svg","gif"]));
app.use(express.static(public));
app.get('/emotes-list', function(req, res){
	var walker = walk.walk('./public/res/emotes');
	var emotes = [];
	walker.on('file', function(dir, stat, next){
		res.write(dir.replace("./public","")+"/"+stat.name+'\n');
		next();
	});
	walker.on('end', function(){
		res.end([
			"http://i3.kym-cdn.com/photos/images/original/000/150/330/omnomnomnom.gif",
			"http://31.media.tumblr.com/tumblr_lgyexi5xvo1qhofrso1_500.gif"
		].join("\n"));
	});
});
//app.use(directory(public));
app.use(express.errorHandler());

var server = http.Server(app);

server.listen(port, ip);
console.log('Server started at '+ip+':'+port);



var mode = parseInt("770",8);
//try {
	if(!fs.existsSync('db')){fs.mkdirSync('db',mode);}
	if(!fs.existsSync('db/users')){fs.mkdirSync('db/users',mode);}
//}catch(e){
	//console.log(e.code);
	//throw e;
//}

main();





function main(){
	
	var io = require('socket.io')(server);
	
	/*io.enable('browser client minification');
	io.enable('browser client etag');
	io.enable('browser client gzip');
	io.set('log level', 1);
	io.set('transports', [
		'websocket',
		'flashsocket',
		'htmlfile',
		'xhr-polling',
		'jsonp-polling'
	]);*/
	
	var bot = new require("cleverbot")();
	var online = {};
	io.sockets.on('connection', function(socket) {
		
		var publicKey;
		var generatePublicKey = function(){
			crypto.randomBytes(48, function(ex, buf){
				publicKey = buf.toString('base64');
				socket.emit("public-key",publicKey);
				//console.log("public-key",publicKey);
			});
		};
		generatePublicKey();
		
		// Keep track of the user associated with this socket
		var user = {
			socket: socket,
			logout: function(){
				if(user.uname){
					socket.broadcast.emit("someone-logged-out",{
						uname: user.uname
					});
					delete online[user.uname];
				}else{
					console.log("debug: logout with no uname heh um ok");
				}
				publicKey = null; //invalidate publicKey;
			},
			disconnect: function(){
				//console.log("debug: disconnect, uname="+user.uname);
				delete online[user.uname];
				publicKey = null; //invalidate publicKey;			
			},
			/* added on login *\
			uname: "username",
			\*                */
		};
		
		socket.on('logout', user.logout);
		socket.on('disconnect', user.disconnect);
	
		socket.on('create-account', function(data) {
			if(badArgs(data,{
				uname: "username",
				pash: "3ncryp73d_p4ssw0rd",
			})) return socket.emit('login-failed', {message:"Data fail."});
			
			if(data.uname.length<4){
				return socket.emit('login-failed', {message:'Username is too short. The minimum is 4 characters.'});
			}
			if(data.uname.match(/[\[\/\\{<"'#@(*)>}\]]/gim)){
				return socket.emit('login-failed', {message:'Username cannot contain any of \\ / [ { < " \' # @ ( ) * > } ]'});
			}
			for(var i in online){
				var u = online[i];
				if(u.socket == socket){
					return socket.emit('login-failed', {message:"You're already logged in."+u+","+socket});
				}
			}
			fs.exists('db/users/'+data.uname,function(exists){
				if(exists){
					//console.debug("user folder exists");
					return socket.emit('login-failed', {message:'That username already exists.'});
				}else{
					fs.mkdir('db/users/'+data.uname,mode,function(){
						user.uname = data.uname;
						data.pash = hash(data.pash,data.uname);
						//user.firstName = data.firstName;
						//user.lastName = data.lastName;
						user.timeAccountCreated = data.timeAccountCreated = 
						user.timeLastLoggedIn = data.timeLastLoggedIn = +new Date();
						
						fs.writeFile('db/users/'+data.uname+'/user.json', JSON.stringify(data), function(err,fd){
							if(err){
								console.warn("writeFile "+'db/users/'+data.uname+'/user.json failed!');
								return socket.emit('login-failed', {message:'Filesystem error!'});
							}
							//"just to be safe", don't broadcast the password to every freaking person yh k
							delete data.pash;
							//
							socket.broadcast.emit('logged-in', data);
							data.isme = true;
							socket.emit('logged-in', data);
							sendUsers();
						});
					});
				}
			});
			//console.log("unknown error");
			//socket.emit('login-failed', {message:'unknown error'});
		});
	
		socket.on('login', function(data) {
			if(badArgs(data,{
				uname: "username",
				pash: "encrypted password"
			})) return socket.emit('login-failed', {message:"Data fail."});
			
			//console.log(data.uname+' is attempting to log in...');
			// When logs in, dump logs? or use REST?
			if(online[data.uname]){
				return socket.emit('login-failed', {message:data.uname+" is already logged in."});
			}
			for(var i in online){
				var u = online[i];
				if(u.socket == socket){
					return socket.emit('login-failed', {message:"You're already logged in as "+u.uname});
				}
			}
			if(data.uname.length<4){
				return socket.emit('login-failed', {message:'Username is too short. The minimum is 4 characters.'});
			}
			if(data.uname.match(/[\[\/\\{<"'#@(*)>}\]]/gim)){
				return socket.emit('login-failed', {message:'Username cannot contain any of \\ / [ { < " \' # @ ( ) * > } ]'});
			}
			fs.exists('db/users/'+data.uname,function(exists){
				if(!exists){
					return socket.emit('login-failed', {message:'User doesn\'t exist.'});
				}else{
					fs.readFile('db/users/'+data.uname+"/user.json",function(err,json){
						if(err){
							console.warn("readFile "+'db/users/'+data.uname+'/user.json failed');
							return socket.emit('login-failed', {message:'Filesystem error!'});
						}
						try {
							var jso = JSON.parse(json);
							if(jso.pash == hash(data.pash,data.uname)){
								
								user.uname = data.uname;
								online[user.uname] = user;
								user.timeLastLoggedIn = data.timeLastLoggedIn = +new Date();
								//console.log(data.uname+' logged in.');
								//data.timeStamp = new Date();
								
								// make sure not to broadcast the password
								delete data.pash;
								// Broadcast that client has logged in
								// (this should only go to friends)
								socket.broadcast.emit('someone-logged-in', data);
								data.settings = jso.settings;
								socket.emit('logged-in', data);
								sendUsers();
							}else{
								//console.log("incorrect password");
								socket.emit('login-failed', {message:'Incorrect password.'});
							}
						}catch(e){
							console.error('parse "db/users/'+data.uname+'/user.json" failed...',e.message);
							socket.emit('login-failed', {message:'JSON.parse() error!'});
						}
					});
				}
			});
		});
		
		function sendUsers(){
			//so far just sends a list of all online users
			var onlines = [];
			for(var i in online){
				var u = online[i];
				if(u !== user && (!!/*is friend*/11)){
					onlines.push({
						uname: u.uname,
						online: true,
					});
				}
			}
			//and bots, of course
			onlines.push({
				uname: "@feedback",
				name: "Send Feedback"
			});
			onlines.push({
				uname: "@cleverbot",
				name: "CleverBot"
			});
			socket.emit('users',onlines);
		}
		
		socket.on('im', function(data){
			if(badArgs(data,{
				to: "username",
				message: "sup bro",
			})) return;
			
			data.from = user.uname;
			data.time = +new Date();
			var recipient = data.to;
			
			if(recipient.match(/^@bot-/)){
				if(data.message.match(/ping/gmi)){
					socket.emit("im",{from:recipient,message:"SAUASUHUHASUHASUH"});
				}else{
					for(var i=0;i<3;i+=1+(Math.random()<0.5)){
						socket.emit("im",{from:"@bot-"+i,message:Math.random()<0.01?"SAUASUHUHASUHASUH":"HELLO THERE HUMAN"});
					}
				}
			}else if(recipient==="@cleverbot"){
				bot.think(data.message,function(err,res){
					socket.emit("im",{from:recipient,message:res||err});
				});
			}else if(recipient==="@feedback"){
				fs.appendFile(
					"FEEDBACK",
					"\u2029[:"+data.from+"@"+data.time+":]\n"+data.message.replace(/\u2029/g,'')+"\n",
					function(err){
						if(err)console.error("feedback log error!",err);
					}
				);
				if(online["1j01"]){
					data.from += "#feedback";
					online["1j01"].socket.emit('im', data);
				}
				//thxprops
				socket.emit("im",{from:"@feedback",message:"Thanks for your feedback probably!"});
			}else{
				// Pass it on.
				if(online[recipient]){
					online[recipient].socket.emit('im', data);
					//console.log(user.uname+' said "'+data.message+'" to '+recipient);
				}else{
					//console.log(user.uname+' tried to say "'+data.message+'" to '+recipient+', but '+recipient+" isn't online and logs aren't implemented. :(");
				}
				// Add the message to the log(s).
				fs.exists('db/users/'+recipient,function(exists){
					if(!exists){
						console.log("user does not exist:",recipient);
					}else{
						fs.appendFile(
							'db/users/'+recipient+"/"+data.from+".chat",
							"\u2029[:"+data.from+"@"+data.time+":]\n"+data.message.replace(/\u2029/g,'')+"\n",
							function(err){
								if(err)console.error("log error!",err);
							}
						);
					}
				});
			}
		});
		
	});
	
	/*module.exports = {
		login: function(){
			
		},
		
	};*/
	
	function badArgs(data,struct){
		if(typeof data !== typeof struct){
			console.error("TypeError: "+JSON.stringify(data)+" !=> "+typeof struct+" ("+JSON.stringify(struct)+")");
			return true;
		}
		if(typeof data === "object"){
			for(var k in struct){
				if(badArgs(data[k],struct[k])) return true;
			}
		}
		if(typeof data === "array"){
			for(var i in data){
				if(badArgs(data[i],struct[0])) return true;
			}
		}
		return false;
	}
	
	var stdin = process.openStdin();
	//process.stdin.setEncoding('utf8');
	stdin.on('data', function(chunk) {
		var line = (chunk+"").trim();
		if(!line) return;
		if(line.match(/^(?:javascript)?:/)){
			var js = line.replace(/^(?:javascript)?:/,"").trim();
			io.sockets.emit("eval",js);
			console.log("broadcast eval()");
		}else if(line.match(/^force[ \-]?update:?/)){
			var msg = line.replace(/^force[ \-]?update:?/,"").trim() || "There's an update. The page will be reloaded.";
			var js = ("("+function(){
				setInterval(function(){
					var go=!windowActive,$$i=$$(".input.message");
					for(i=0;i<$$i.length;i++){
						if($$i[i].innerHTML.match(/\S/)){go=0;}
					}
					if(go){
						location.reload();
					}
				},5000);
			}+")()");
			io.sockets.emit("eval",js);
			console.log("page update forced");
		}else if(line.match(/^update:?/)){
			var msg = line.replace(/^update:?/,"").trim() || "There's an update! Reload maybe?";
			var js = ("("+function(){
				var $not = document.createElement("div");
				$not.innerHTML = msg;
				$("#notifications").appendChild($not);
				$not.onclick = function(){
					location.reload();
				};
				$not.style.cursor = "pointer";
			}+")()").replace("msg",'"'+msg+'"');
			io.sockets.emit("eval",js);
			console.log("sent update notification");
		}else{
			console.log("invalid command");
		}
	});

	function hash(str,moresalt){
		return crypto
			.createHash('sha512')
			.update(
				"egassem+sdrawkcab_atlas"+str+"e_z"+moresalt+"_yay1337funtoo#toomuchsalt"+str.toUpperCase()+
				"http://img2.timeinc.net/health/images/slides/to-much-salt-400x400.jpg"//note: too, not to (is importnat)
			).digest('hex');
	}
};
