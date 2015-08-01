# vudash
A dashboard like dashing, but written in node, with less bumf.

<img src="docs/screenshot.png" style="width: 90%" alt="Vudash" title="Vudash" />

# rationale
- I'll get to the point. I like dashing, but I don't like ruby.
- Dashing-js is a stellar effort, but largely abandoned.
- Jade is an abomination.
- Coffeescript is an uneccessary abstraction.
- dashing-js has more bugs than code
 
# project status
It's a prototype, an alpha. Treat it as such. It does work predictably though.

# running
- You need a moderately recent version of node.
- It is transpiled by babel automatically for es6 support.
```
npm run watch // development, reloading
node app.js // production
```

# testing
There aren't any, it's a prototype. I don't know what I want it to do yet.

# configuring
- Widgets go in widgets/
- Dashboards go in dashboards/

- Widgets emit their data using ```emit({foo: 'bar'});```
- Widget html uses blocks.js

All dashboard/widget syntax is validated using Joi, so you'll know if you mess it up.

# roadmap
- More widgets
- Flashy widgets for warnings

# contributions
- Send me a PR. I love them.

# license
MIT
