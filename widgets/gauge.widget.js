'use strict';

module.exports = {
  dimensions: {
    height: 25,
    width: 25
  },
  template: {
    html: `<div class="gauge-widget">
    <div class='gauge percentage'>
    <div class='meter'></div>
    <div class='percentage-container'>
    <div class='percentage-indicator'>0%
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
      width:300px;
      height:80px;
      overflow:hidden;
      margin:2rem;
    }

    .gauge:before, .gauge:after, .meter {
      position:absolute;
      display:block;
      content:"";
    }

    .gauge:before, .meter { width:10rem; height:5rem; }
    .gauge:before { border-radius:5rem 5rem 0 0; background:#2a2a2a; }

    .gauge:after {
      position:absolute;
      bottom:0;
      left:2.5rem;
      width:5rem;
      height:2.5rem;
      background: #add8e6;;
      border-radius:2.5rem 2.5rem 0 0;
    }

    .meter {
      top:100%;
      transition:1.5s;
      transform-origin:center top;
      border-radius:0 0 6rem 6rem;
      background:deepskyblue;
    }

    .gauge:hover .meter { transform:rotate(.5turn); }


    /* Overload effect ==================== */
    .overload { transform-origin:center center; }
    .overload:hover {
      animation:overload .15s .5s infinite;
    }
    .overload .meter { background:gold; }
    .overload:hover .meter { background:orangered; }
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
      left:2.5rem;
      z-index:1000;
      width:5rem;
      height:2.5rem;
      overflow:hidden;
    }

    .percentage-indicator {
      font:bold 1.25rem/1.6 sans-serif;
      color:#333;
      line-height:2.5rem;
      white-space:pre;
      transition:1.5s;
      vertical-align:baseline;
      user-select:none;
    }

    .gauge:hover .percentage-indicator {
      transform:translateY(-50rem);
      color:limegreen;
    }`,
    model: {
      time: new Date()
    }
  },
  job: {
    schedule: 1000,
    script: function(emit) {
      // emit({time: moment().format('MMMM Do YYYY, h:mm:ss a').toString()});
    }
  }
}
