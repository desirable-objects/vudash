var truth = false;

module.exports = {
  dimensions: {
    rows: 1,
    columns: 1
  },
  template: {
    html: '<h3>Truth is</h3><span class="truth">{{truth}}</span>',
    css: '.truth { font-size: 64px; font-weight: bold; }',
    model: {
      truth: false
    }
  },
  job: {
    schedule: 2500,
    script: function(emit, widget) {

      truth = !truth;

      var background = truth ? 'green' : 'red';

      emit({truth: truth, background: background});
    }
  }
}
