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

*Defunct, revival imminent?*

Everything is to be rewritten:
* `db/`, `users/` -> [Firebase][]
* JavaScript -> [CoffeeScript][] (or could try [some other language][])
* [jQuery][] -> [React][]
* `contentEditable` -> [Draft.js][] (which uses `contentEditable`, but sanely)

<!-- https://github.com/egoist/autoembed -->
<!-- https://github.com/egoist/autolink.js -->
<!-- https://www.npmjs.com/package/oembed-auto -->
<!-- https://cleverbot.io/ -->

[Firebase]: https://www.firebase.com/
[CoffeeScript]: http://coffeescript.org/
[some other language]: https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js
[jQuery]: https://jquery.org/
[React]: https://facebook.github.io/react/
[Draft.js]: https://facebook.github.io/draft-js/
[Avastars]: https://rawgit.com/1j01/natter/master/public/test/avastar.html
[main app screen]: https://rawgit.com/1j01/natter/master/public/index.html

