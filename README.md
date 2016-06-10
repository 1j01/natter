# Natter

### It's a chat app.

Features:

* Full rich text editing
* Automatic embeds of videos from YouTube, Vimeo, and other sites, audio from SoundCloud, and even code fiddles like CodePen and JSFiddle
* Drag and drop anything anywhere, e.g. image to avatar, image/audio/video/other file to chat or to a user
* Easily send feedback (via chat; but don't worry you won't have to "friend"/"unfriend" Feedback or anything)
* Evolutionary emoji menu: instead of just a grid, Natter could have a dynamic interactive map with axes representing emotional factors
* Upload custom emoji/gifs easily for personal use
* [Avastars][]: the best default avatar images around, procedurally generated based on your username

### Status

It doesn't run anymore.
To work again, it needs to be rewritten.

When it was working,
it used a directory as a poor man's database,
and it stored passwords with questionable cryptography.
They were salted and hashed, but I'm not a cryptographer, and it was probably significantly flawed.

Pretty much everything is to be refactored:
* `db/` -> [MongoDB][] or [Redis][] (or some other database, maybe Firebase?)
* `user.pash` ("password hash") -> [passwordless][] (or Firebase?)
* JavaScript -> [CoffeeScript][] (or [some other language][]?)
* [jQuery][] -> [React][]
* `contenteditable` -> [Draft.js][]

However, [Avastars][] still work,
and on the [main app screen][] there's a certain secret code
you can enter that can result in several interesting outcomes.

[MongoDB]: https://www.mongodb.org/
[Redis]: http://redis.io/
[passwordless]: https://passwordless.net/
[CoffeeScript]: http://coffeescript.org/
[some other language]: https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js
[jQuery]: https://jquery.org/
[React]: https://facebook.github.io/react/
[Draft.js]: https://facebook.github.io/draft-js/
[Avastars]: https://rawgit.com/1j01/natter/master/public/test/avastar.html
[main app screen]: https://rawgit.com/1j01/natter/master/public/index.html

