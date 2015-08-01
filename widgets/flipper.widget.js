var truth = false;

module.exports = {
  dimensions: {
    height: 25,
    width: 25
  },
  template: {
    html: '{{truth}}',
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
