
var SERVER_URL = location.origin;// + ":2998";
var CONNECT_OPTIONS = {
	'reconnect': true,
	'reconnection delay': 1000,
	'max reconnection attempts': 1000
};

$(function(){
	
	var $body = $("body");
	var $app = $("#app");
	
	//create messages
	var $serverDown = $('<div id="server-down">The server is down!</div>');
	var $bye = $('<div id="bye">Bye!</div>');
	var $disconnected = $("<div id='disconnected'> - disconnected - </div>");
	$body.prepend($bye, $serverDown);
	
	//state handling functions that just trigger visuals
	var _serverDown = function(){
		setTimeout(function(){
			$body.addClass("server-down");
		},100);
	};
	var _loaded = function(){
		$body.addClass("loaded");
		$body.removeClass("not-loaded");
	};
	var _loggedIn = function(){
		$body.addClass("logged-in");
		$body.removeClass("not-logged-in");
	};
	var _loggedOut = function(){
		$body.addClass("logged-out");
		$body.addClass("not-logged-in");
		$body.removeClass("logged-in");
	};
	
	//window.zxcvbn_load_hook = function(){};
	
	var $login = $("#login");
	var $un = $("#username");
	var $pw = $("#password");
	var $err = $("#login-error");
	var $goLogin = $("#go-login");
	var $goCreateAccount = $("#go-create-account");
	var $goBypass = $("#go-bypass");
	
	$login.on("submit",function(e){
		e.preventDefault();
		login($un.val(), $pw.val());
	});
	$goLogin.on("click",function(e){
		e.preventDefault();
		login($un.val(), $pw.val());
	});
	$goCreateAccount.on("click",function(e){
		e.preventDefault();
		login($un.val(), $pw.val(), "(create account)");
	});
	$goBypass.on("click",function(e){
		e.preventDefault();
		_loggedIn();
	});
	
	var am = new AudioMan();
	am.add({
		"recieve-message": "/res/bop.ogg",
		"send-message": "/res/bop1.ogg"
	});
	
	if(!window.io){
		_serverDown();
	}else{
		var socket = io.connect(SERVER_URL, CONNECT_OPTIONS);
		var publicKey;
		var chats = {};
		
		////////////////////////////////////////
		var $panelsArea = $("<div id='panels-area'/>");
		
		//The sidebar shows user info/logout and a tabstack of users
		var $sidebar = $("<div id='sidebar'/>");
		var $sbtoggler = $("<div id='sidebar-toggle'/>");
		
		var $you = $("<div id='you'/>");
		var $greeting = $("<div id='greetings'>Greetings!</div>").appendTo($you);
		var $logout = $("<button id='logout'>Log out</button>").appendTo($you);
		var $settingsButton = $("<div id='settings-button'><img src='/res/gear.svg' width='15' height='15'/></div>");
		//$logout.on("click",logout);
		var $tabstack = $("<div id='chat-panel-tabs'/>");
		
		$sidebar.append($sbtoggler, $you, $tabstack, $settingsButton);
		
		$app.append($sidebar, $panelsArea);
		////////////////////////////////////////
		
		var sortTabs = function(){
			//for(var i1=0,i2=1;i2<
			$tabstack.empty().append($tabs);
		};
		
		//var creating = false;
		var login = function(username, password, newAccount){
			if(!publicKey){
				alert("OMG no publicKey! :((( Things are broken... problems connecting to server.. :(");
			}
			var u = {uname:username,pash:hash(password,username)};
			socket.emit(newAccount?"create-account":"login",u);
			//console.log(newAccount?"create-account":"login",u);
		};
		var logout = function(){
			//visually log out (immediately)
			_loggedOut();
			//send log out message
			socket.emit("logout");
			console.log("logout");
		};
		socket.on("disconnect", function(what){
			$body.addClass("disconnected");
			$disconnected.appendTo($body);
		});
		socket.on("connect", function(){
			$disconnected.detach();
			//auto-login was here
			//Does socket.io queue messages before it connects?
		});
		socket.on("public-key", function(key){
			publicKey = key;
			//console.log("public-key",publicKey);
		});
		socket.on("login-failed", function(data){
			/*if(data.message.match(/doesn't exist/)){
				creating = true;
			}else if(data.message.match(/exists/)){
				creating = false;
			}
			console.log(data.message,creating);*/
			$err.text(data.message);
			console.log("login failed:", data.message);
		});
		socket.on("logged-out", function(data){
			_loggedOut();
		});
		socket.on("logged-in", function(my){
			_loggedIn();
			$err.empty();
			$greeting.text("Hello, "+my.uname);
			//console.log("my settings:", my.settings);
		});
		socket.on("someone-logged-in", function(u){
			var $panel = chats[u.uname] || $ChatPanel(u, socket);
			var $tab = $ChatPanelTab(u, $panel);
			chats[u.uname] = $tab.$panel;
			sortTabs();
		});
		/*socket.on("someone-logged-out", function(u){
			$.each(tabs,(function(i,$tab){
				if($tab.user && $tab.user.uname==u.uname){
					//$tab.();
				}
			});
			//delete chats[u.uname];
			sortTabs();
		});*/
		socket.on("users", function(users){
			$tabs.remove(), $tabs = $();
			for(var i=0; i<users.length; i++){
				var u = users[i];
				var $tab = $ChatPanelTab(u, $ChatPanel(u, socket));
				chats[u.uname] = $tab.$panel;
			}
			sortTabs();
		});
		socket.on("im", function(data){
			//recieved a message
			if(chats[data.from]){
				chats[data.from].log(data.message);
			}else{
				console.log(data);
			}
		});
		socket.on("eval", function(js){
			console.log("eval: ",js);
			try{
				eval(js);
			}catch(e){
				console.warn(e.name,e.message);
			}
		});
		
		$sidebar.find("#logout").on("click",logout);
	}
	
	
	function hash(str,moresalt){
		var shaObj = new jsSHA(
			"egassem+sdrawkcab-ytlas"+str+"e_z"+moresalt+"_yay1337funtoo#toomuchsalt"+str.toUpperCase()+
			"http://img2.timeinc.net/health/images/slides/to-much-salt-400x400.jpg",//note: too, not to
			"TEXT");
		return shaObj.getHash("SHA-512", "HEX");
	}
});
//some Date(1386472965769);