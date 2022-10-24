# Python in a Box

Try it online: <https://python-in-a-box.radian.codes/>

This is an interactive online Python REPL, implemented in JavaScript
using

* **thirteen** lines of [code on the frontend](https://github.com/radian-software/python-in-a-box/blob/b28a39383c6b66098b414edf4a1b4165a5d11ca2/index.html#L32-L48)
* **seventeen** lines of [code on the backend](https://github.com/radian-software/python-in-a-box/blob/b28a39383c6b66098b414edf4a1b4165a5d11ca2/server.js#L1-L23)

and based on the open-source libraries

* [Express](https://expressjs.com/)
* [node-pty](https://github.com/microsoft/node-pty)
* [Xterm.js](https://xtermjs.org/)

Read the blog post, [How Replit used legal threats to kill my open-source project](https://intuitiveexplanations.com/tech/replit/).

Also, this should go without saying, but **letting people run
unsandboxed code on your server is incredibly stupid**. Do not ever,
ever do this in production. This repository demonstrates a proof of
concept only, and does *not* reflect appropriate ethical practices for
handling of user data.

If you'd like to see a service that actually *does* attempt to run
user code in a secure manner, please check out
[Riju](https://github.com/raxod502/riju).

*Note:* Please do not attempt to do malicious things with the hosted
version of this application, including using it for free compute. It
is running on an isolated Railway account that will automatically
terminate service if the free-tier limits are exceeded or if abuse is
registered. So all you will accomplish is taking the service offline
for everyone else.
