# Natter

### It's a chat app.

Features:

* Full rich text editing, with emoji and images
* [Avastars][]: the best default avatar images around, procedurally generated based on your username
* Paste a link to automatically embed videos from YouTube, Vimeo, and other sites, audio from SoundCloud, and even code fiddles like CodePen and JSFiddle
* Drag and drop anything anywhere, e.g. image to avatar, image/audio/video/other file to chat or to a user
* Easily send feedback (via chat; but don't worry you won't have to "friend"/"unfriend" Feedback or anything)
* Pick emoji from a dynamic interactive map with axes representing emotional factors, instead of just a grid
* Upload custom emoji/gifs easily for personal use
* Use drawing mode to send handwritten messages and pictures
* Insert emoji in drawing mode and position, rotate, flip and scale them

Design goals:

* Deep user expressitivity: to communicate with others, the user needs to be able to communicate with the app
* Simplicity: easy to get started, easy to use

### Status

The app has been defunct for a long time, but I've started remaking it.

Everything is to be rewritten, this time using [Firebase][], [CoffeeScript][], [React][] and [Draft.js][].

<!--
### The Secret Hidden Section (omg)

Notes (that could become tests):

* When you type a message and refresh the page, it should be saved
* When you double-click a message, it should edit the message
* You should also be able to edit a message on mobile
* You should be able to edit or delete messages from a context menu
* When you drag and drop an image (or maybe video? if it can make gifs and crop in 3D), your avatar should get bigger to show it as a drop target

Links:

Use this for searching for contacts (eventually):
	https://github.com/firebase/flashlight
	https://firebase.googleblog.com/2014/01/queries-part-2-advanced-searches-with.html

Automatic embedding (not enough):
	https://www.npmjs.com/package/oembed-auto
	https://github.com/egoist/autoembed

Automatic linking
	https://github.com/egoist/autolink.js

Bots are fun:
	https://cleverbot.io/ 


### The Secret Hidden Section II: Corporate Agenda Edition

A communications platform needs to have the lowest barrier to entry as possible.

Theoretical monetization strategies and limitations:
	ads
		hopefully unobtrusive
		almost definitely the way to go
	paid up-front
		considered as a "feature" by some, but for things like todo apps and email
		(the real feature is not having ads -- btw hulu, you screwed this up)
		limits the barrier to entry too much for a communications platform
	pay for small extra feature
		i.e. not showing a "Sent with MailChimp" watermark in an email
		unlimited history logs
			1. feels like an artificial limit to begin with
			2. unless it's economically disingenious, it doesn't unlock preexisting history and offer immediate value
			3. people still might think it will unlock previous history, and complain that they weren't able to recover their PGP key or whatever
		communication features
			e.g. "stickers", "emoji packs", "more GIFs 4 the lolz", or something similar to drawing mode
			makes the communication platform asyncronous
			1. can feel eletist
			2. can create a situation where one person can't respond in the same way (which they would naturally want to)
			3. I want to make this an open platform where you can use your own emojis, GIFs, and other means of expression
				(which might warrant a third-party "store" type of thing to discourage chrome extensions that could be malicious)
	free trial, with referal as an alternative to payment
		1. complicated to implement
		2. no one likes free trials, as they're inherently somewhat arbitrary
		3. referals could be nice though
		4. only makes sense for mobile apps, and if there's a web version, it can likely do everything you need
	donations
		1. possibly less reliable than other channels athough I have no data
		2. who's gonna donate, though?
	Patreon
		like donations, but more reliable?
	pay to remove ads for everyone for a period of time
		1. complicated to implement
		2. this could be cool though

-->

[Firebase]: https://www.firebase.com/
[CoffeeScript]: http://coffeescript.org/
[React]: https://facebook.github.io/react/
[Draft.js]: https://facebook.github.io/draft-js/
[Avastars]: https://rawgit.com/1j01/natter/master/app/components.html
[main app screen]: https://rawgit.com/1j01/natter/master/app/index.html

