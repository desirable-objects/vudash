module.exports = {
  dimensions: {
    height: 1,
    width: 1
  },
  template: {
    html: '<div class="test">Hello</div>',
    css: '.test { color: #ccc; }'
  },
  job: {
    schedule: 5000,
    script: function() {
      console.log('hi');
    }
  }
}
