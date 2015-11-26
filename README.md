# Natter

### It's a chat app.

It doesn't run anymore.
To work again, it needs to be rewritten.

When it was working,
it used a directory as a poor man's database,
and it stored passwords with questionable cryptography.
They were salted and hashed at least, but I'm not a cryptographer.

Pretty much everything is to be refactored:
* `db/` -> [MongoDB][] or [Redis][] (or some other database)
* `user.pash` ("password hash") -> [passwordless][]
* JavaScript -> [CoffeeScript][]
* [jQuery][] -> [React][] (or maybe some other framework)

However, [Avastars][] still work,
and on the [main app screen][] there's a certain secret code
you can enter that can result in several interesting outcomes.

[MongoDB]: https://www.mongodb.org/
[Redis]: http://redis.io/
[passwordless]: https://passwordless.net/
[CoffeeScript]: http://coffeescript.org/
[jQuery]: https://jquery.org/
[React]: https://facebook.github.io/react/
[Avastars]: https://rawgit.com/1j01/natter/master/public/test/avastar.html
[main app screen]: https://rawgit.com/1j01/natter/master/public/index.html

