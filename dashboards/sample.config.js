module.exports = {
  layout: {
    width: 1920,
    height: 1080,
    columns: 5,
    rows: 4
  },
  css: `
    body {
      background-color: #191919;
      font-family: Ubuntu, Verdana, Tahoma, Arial;
    }

    h3 {
      text-align: center;
    }

    .grid-item {
      background-color: #313131;
      color: #add8e6;
      border-radius: 3px;
    }
  `,
  widgets: [
    "time",
    "flipper",
    "gauge",
    "deploy",
    "heartbeat",
    "heroku",
    "twitter",
    "norms",
    "contentful",
    "stormpath"
  ]
}
