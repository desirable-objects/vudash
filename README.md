# vudash
A dashboard like dashing, but written in node, with less bumf. I *really* don't care how it's pronounced.

<img src="https://raw.githubusercontent.com/desirable-objects/vudash/master/docs/screenshot.png" style="width: 90%" alt="Vudash" title="Vudash" />

# rationale
- I'll get to the point. I like dashing, but I don't like ruby.
- Dashing-js is a stellar effort, but largely abandoned.
- Jade is an abomination.
- Coffeescript is an uneccessary abstraction.
- dashing-js has more bugs than code

# project status
It's a prototype, an alpha. Treat it as such. It does work predictably though.

# features
- will happily run on a free heroku instance
- es6 (for multiline strings, mostly!)
- all cross-origin requests done server side
- websockets rather than polling
- websocket fallback to long-poll when sockets aren't available
- Custom widgets
- Custom dashboards
- Simple flow layout
- Dashboard arrangement is simply the config order (see below)
- Transitioning background colour for widgets
- Extending existing widgets (soon!)

# demo

Check out the <a href="http://vudash.herokuapp.com/sample.dashboard">Demo App</a> which is basically this repo, deployed.

# quick start (TL;DR)

You can create a dashboard to get started in seconds. In a new directory:

```
npm install -g vudash
vudash create
vudash
```

Then, edit the contents of ```./widgets``` and ```./dashboards``` to your hearts content. You might want to edit package.json to suit your dashboard.
Whilst you are creating/editing widgets you can enjoy auto-reloading of your dashboard with:

```
vudash watch
```

To use other node modules in your widgets, simply ```npm install --save <modulename>``` as you would normally.

# prerequisites
- You need a moderately recent version of node.
- It is transpiled by babel automatically for es6 support.
- you need a browser which can use websockets, and supports modern html, css and javascript.

# developing

Check the project out, run ```npm install```, then:

```
npm run watch // development, reloading
```

You can visit your dashboards at http://localhost:8000/&lt;name&gt;.dashboard where &lt;name&gt; is your dashboard name (in this example, 'sample.dashboard')

# testing
There aren't any, it's a prototype. I don't know what I want it to do yet.

# configuring
- Widgets go in widgets/
- Dashboards go in dashboards/

- Widgets emit their data using ```emit({foo: 'bar'});```
- Widget html uses blocks.js

All dashboard/widget syntax is validated using Joi, so you'll know if you mess it up.

# define a widget

```js
var moment = require('moment');

module.exports = {
  dimensions: {
    rows: 1, // number of layout rows to consume. Can be fractional
    columns: 1 // number of layout columns to consume. Can be fractional
  },
  template: {
    html: `
     <div class="test">
      {{time}}
     </div>
    `, // the widget's htm, sits inside a .grid-item div.
    css: `
    .test {
      font-size: 30px;
    }
    `, // css specific to the widget, careful not to conflict
    model: { // blocks.js view model
      time: new Date() // property binding, and initial value
    }
  },
  job: {
    schedule: 1000, // How many ms should we run the update job
    variables: { // variables available to script
      dateFormat: 'MMMM Do YYYY, h:mm:ss a'
    },
    script: function(emit, widget) { // update job
      emit({time: moment().format(widget.job.variables.dateFormat).toString()});
      // we 'emit' a key/value map which is bound to the view model (above)
    }
  }
}
```

## Job scripts

The job.script function is the actual worker which prepares the data you want to display in a widget.

It recieves two things:
- The emit function, which is used to send data to the client
- A copy of the augmented widget object (i.e. itself, with things like .id (the widget's dynamic unique id) added onto it by the loader)

## Extending an existing widget

Another important reason for the 'widget' reference mentioned above, is that when using 'extend' you can simply reference variables from here to differentiate your objects, i.e:

```
// blue.widget.js
module.exports = {
  ...
  job: {
      schedule: 1000,
      variables: {
        colour: 'blue'
      },
      script: function(emit, widget) {
        emit({colour: widget.job.variables.colour})
      }
  }
}
// emits {colour: 'blue'}
```

```
// yellow.widget.js
module.exports = {
  extends: 'blue',
  job: {
    variables: {
      colour: 'yellow'
    }
  }
}
// emits {colour: 'yellow'}
```

Note use of the extends: 'blue' attribute.
You can now happily use yellow in your dashboard, it will inherit everything you don't specify from 'blue'.

# widget events

Widgets send data by emit()ing a map. Two special properties exist:
- background sets css properties for the widget's background.
- lastUpdated sets a last updated property which can be automatically momentised in your widget's html: ```<span data-last-updated="{{lastUpdated}}"></span>```

# define a dashboard
```js
{
  "layout": {
    "gutter": 6, // gutter in px between widgets. Defaults to 6
    "width": 1920, // dashboard width in pixels
    "height": 1080, // dashboard height in pixels
    "columns": 6, // number of columns
    "rows": 4 // number of rows
  },
  "css": ` // optional css styles for the main layout
   .grid-item {
     border: 1px solid #ddd
   }
  `,
  "widgets": [
    "time" // time is the name of the widget above
  ] // array of widget names
}
```

# roadmap
- Build this: https://raw.githubusercontent.com/cubedro/eth-netstats/master/src/images/screenshot.jpg?v=0.0.6
- More widgets
- Flashy widgets for warnings

# contributions
- Send me a PR. I love them.

# license
MIT
