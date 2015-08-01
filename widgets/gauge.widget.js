'use strict';

module.exports = {
  dimensions: {
    rows: 1,
    columns: 1
  },
  template: {
    html: `<h3>Interest</h3><div class="gauge-widget">
    <div class="gauge percentage" data-query="setClass('overload', overload)">
    <div class="meter" data-query="css('transform', rotation)"></div>
    <div class="percentage-container">
    <div class="percentage-indicator" data-query="css('transform', position)">     0%
    5%
    10%
    15%
    20%
    25%
    30%
    35%
    40%
    45%
    50%
    55%
    60%
    65%
    70%
    75%
    80%
    85%
    90%
    95%
   100%</div>
    </div>
    </div>
    </div>`,
    css: `

    .gauge-widget {
      font-size: 150%;
    }

    .gauge {
      display:inline-block;
      position:relative;
      width:160px;
      height:80px;
      overflow:hidden;
    }

    .gauge:before, .gauge:after, .meter {
      position: absolute;
      display: block;
      content: "";
    }

    .gauge:before, .meter { width:10rem; height:5rem; }
    .gauge:before { border-radius:5rem 5rem 0 0; background:#2a2a2a; }

    .gauge:after {
      position:absolute;
      bottom:0;
      left: 2.5rem;
      width: 5rem;
      height: 2.5rem;
      background: #313131;
      border-radius: 2.5rem 2.5rem 0 0;
    }

    .meter {
      top:100%;
      transition:1s;
      transform-origin:center top;
      border-radius:0 0 6rem 6rem;
    }

    /* Overload effect ==================== */
    .overload { transform-origin: center center; }
    .overload {
      animation:overload .15s .5s infinite;
    }

    .overload .meter { background: orangered !important; }
    @keyframes overload {
      25%{ transform:translateX(2px); }
      50%{ transform:rotate(-1deg); }
      75%{ transform:translateX(1px); }
    }

    /* Gauge with percentage indicator ============== */
    .percentage .meter { background:limegreen; }
    .percentage-container {
      position:absolute;
      bottom:-.75rem;
      left:2.1rem;
      z-index:1000;
      width:5rem;
      height:2.5rem;
      overflow:hidden;
    }

    .percentage-indicator {
      font: bold 1.25rem/1.6;
      line-height: 2.5rem;
      white-space: pre;
      transition: 1.5s;
      vertical-align: baseline;
      user-select: none;
    }`,
    model: {
      position: '0',
      rotation: 'rotate(.0turn)',
      overload: false
    }
  },
  job: {
    schedule: 2500,
    script: function(emit) {

      let value = Math.floor( Math.random() * 7 ),
          overload = false,
          pc = 0;

      if (value > 5) {
        overload = true;
        value = 5;
      }

      pc = value * 10;

      emit({
        position: `translateY(-${pc}rem)`,
        rotation: `rotate(.${value}turn)`,
        overload: overload
      });
    }
  }
}
