
panels = []
tabs = []

class Panel extends View
	constructor: ->
		panels.push @
		super()
	
	@content: ->

		$p = $("<div class='panel hidden'/>").appendTo("#panels-area")
		# $p.$tab = null
		
	open: ->
		$p.addClass("active")
		$p.removeClass("hidden")
	
	close: ->
		$p.addClass("hidden")
		$p.removeClass("active")
	

class ChatPanel extends Panel
	@content: (user, socket)->
		$cp = $Panel().addClass("chat-panel")	
		$log = $("<div class='chat-log'/>")
		$input = $MessageInput()
		
		@div class: 'chat-log', outlet: 'chatlog'
		$cp.append($log,$input)
		$input.on "send", (e,xmmlf)->
			socket.emit("im",{to:user.uname, message:xmmlf})
			$log.append($MessageRow($Message(xmmlf).addClass("from-me")))
			# console.log(msg)

		
	log: (xmmlf)->
		$log.append($MessageRow($Message(xmmlf)))
		
class SettingsPanel extends Panel
	@content: (socket)->
		$sp = $Panel().addClass("settings-panel")
		$sp.append("<h1>Settings</h1>")
		$sp.append("<p>There are none! Haha isn't this great?</p>")


class PanelTab extends View
	@content: (panel)->
		$tab = $("<div class='panel-tab'/>")
		$tab.$panel = $panel
		panel.tab = @
		$tab.on("hide", ->
			$tab.$panel.close()
			$tab.removeClass("active")		
		
		$tab.on("click", ->
			$tabs.trigger("hide")
			$tab.$panel.open()
			$tab.addClass("active")
		
		$tabs.push($tab)
		tabs.push($tab)

class ChatPanelTab extends PanelTab
	@content: (u, panel)->
		#$tab = $PanelTab($p).addClass("chat-panel-tab")
		@div =>
			@subview new Avastar(u.uname,24))
			@text (u.name ? u.uname)

do ->
	$em = $("<div class='emoticons-menu popup bubble'/>")
	$.get "/emotes-list", (list)->
		urls = list.trim().split("\n")
		for url in urls
			name = url.match(///
				#(.*/*)
				([^/]*) # file name segment with no slashes in it
				\. # that goes right up to the .ext
			///)[1]
			
			$("<img/>").attr(
				width: 16
				height: 16
				src: url
				title: name
			).on("click", ->
				$emote = $(this).clone().addClass("emote").data("e", $(this).attr("title"))
				# insert $emote into selection (replace selection with $emote)
			).appendTo($em)
		
	
	EmoticonsMenu = -> $em

