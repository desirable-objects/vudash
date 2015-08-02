var truth = false;

module.exports = {
  dimensions: {
    rows: 1,
    columns: 1
  },
  template: {
    html: `
      <h3>Dashboard health</h3>
      <i class="dashboard-health--heart fa fa-heart fa-heart-o" data-query="setClass('fa-heart-o', heartbeat)"></i>
    `,
    css: `
      .dashboard-health--heart {
        font-size: 64px;
        color: #8B0000;
        transition: all 0.3s ease-in-out;
        display: block;
        text-align: center;
      }
      .dashboard-health--heart.fa-heart-o {
        transform: scaleX(0.8) scaleY(0.8);
      }
    `,
    model: {
      heartbeat: 'fa-heart'
    }
  },
  job: {
    schedule: 2500,
    script: function(emit, widget) {

      truth = !truth;

      emit({heartbeat: truth});
    }
  }
}
