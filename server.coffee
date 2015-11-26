###
Console commands: 
> update
> force update
> javascript: function style(css){s=document.createElement("style")s.textContent=cssdocument.head.appendChild(s)} function animate(selector,from,to){name="a"+Math.floor(Math.random()*5000000)+Math.floor(Math.random()*50000)style("@-webkit-keyframes "+name+"{0%{"+from+"}50%{"+to+"}100%{"+from+"}}"+selector+"{-webkit-animation:"+name+" 5s infiniteposition:relative}")} animate( ":root", "-webkit-filter:saturate(10)contrast(440%)blur(0px)", "-webkit-filter:saturate(1)contrast(100%)blur(3px)" )
> js:alert("eval")
> cs:alert "eval"
> coffeescript: alert "eval"
> :alert "eval"
###

console.log "Chat Server v0.0.1.1"

ip = process.env.OPENSHIFT_NODEJS_IP ? process.env.IP ? "127.0.0.1"
port = process.env.OPENSHIFT_NODEJS_PORT ? process.env.PORT ? 8080
host = "#{ip}:#{port}"

# Shortcut
qss = (require 'querystring').stringify

# Require filesystem stuff
fs = require 'fs'
path = require 'path'
{walk} = require 'walk'

# Require web stuff
http = require 'http'
express = require 'express'
session = require 'express-session'
directory = require 'connect-directory'
extensionless = require 'extensionless'

# Require passwordless authentication stuff
passwordless = require 'passwordless'
MongoStore = require 'passwordless-mongostore'
email = require 'emailjs'

# Get password / secret
# just so u no, this is really secret, like u cant find it
#secret = ["VERY", "SECRET", "vrCn86M=MJTr-}qP6+n.%4Ju}nKwLz>A?8vrgb=8rYh;B:.zJ[Y;`QgWB9~3;4Sc))XAmJBnzfn&F57Nap1336"][~~ Math.pow(42, 0.2)]
#password = ["SxUR<7_2*nDNQ", secret] + new Object.prototype.constructor.apply.name.constructor
#require('rot13').rot14(password) additional encreyption unnecessary, oasis 1, secure.
crypto = require 'crypto'
secret = crypto.randomBytes(64).toString('base64')
password = crypto.randomBytes(42).toString('base64')
try secret = fs.readFileSync '.secret', 'utf-8'
try password = fs.readFileSync '.password', 'utf-8'
fs.writeFileSync '.secret', secret, 'utf-8'
fs.writeFileSync '.password', password, 'utf-8'


passwordless.init new MongoStore 'mongodb://localhost/passwordless-simple-mail'

smtpServer = email.server.connect
	user: "confabulateml"
	password: password
	host: "smtp.gmail.com"
	ssl: yes

passwordless.addDelivery (tokenToSend, uidToSend, recipient, callback)->
	
	url = "http://#{host}?token=#{tokenToSend}&uid=#{encodeURIComponent(uidToSend)}"
	
	url = "http://#{host}?" + qss
		token: tokenToSend
		uid: uidToSend
	
	url = "http://#{host}?#{qss
		token: tokenToSend
		uid: uidToSend
	}"
	
	url = "http://" + host + "?" + qss
		token: tokenToSend
		uid: uidToSend
	
	
	message = 
		from: "confabulate.ml <confabulateml@gmail.com>"
		to: "You <#{recipient}>"
		subject: "Authenticate #{host}"
		text: """
			Hello, you... person!
			Access your account here:
			#{url}
		"""
	
	smtpServer.send message, (err, message)->
		
		if err
			console.log(err)
			console.log(err.previous?.smtp)
		
		callback(err)


pub = __dirname + '/public'

app = express()
app.use session {secret}
app.use passwordless.sessionSupport()
app.use passwordless.acceptToken()

app.use extensionless(pub, ["html","png","svg","gif"])
app.use express.static(pub)
app.get '/emotes-list', (req, res)->
	walker = walk './public/res/emotes'
	emotes = []
	walker.on 'file', (dir, stat, next)->
		res.write(path.join(dir.replace("./public",""), stat.name)+'\n')
		next()
	
	walker.on 'end', ->
		res.end """
			http://i3.kym-cdn.com/photos/images/original/000/150/330/omnomnomnom.gif
			http://31.media.tumblr.com/tumblr_lgyexi5xvo1qhofrso1_500.gif
		"""

app.get '/logout', passwordless.logout(), (req, res)->
	res.redirect '/'



app.use directory(pub)
app.use express.errorHandler()

server = http.Server(app)
server.listen(port, ip)

console.log "Server started at #{host}"

io = (require 'socket.io')(server)

###

message =
	from: "confabulate.ml <confabulate.ml@gmail.com>"
	to: "You <isaiahodhner@gmail.com>"
	subject: "Authenticate to Confabulate"
	text: """
		Hello, 1j01!
		Access your account here:
		http://#{host}?#{qss
			token: 776597658756
			uid: 32565
		}
	"""

smtpServer.send message, (err, message)->
	
	if err
		console.log err
		erres = (''+err.previous?.smtp).replace /([\n\r]+)?534[- ]5.7.14 ?/gm, ''
		url = (erres.match /<(.*)>/)[1]
		console.log '\n'
		console.log erres.replace url, 'SEE URL BELOW'
		console.log url
		(require 'child_process').exec "explorer \"#{url}\""#weirdhax
	else
		console.log ';)'

###