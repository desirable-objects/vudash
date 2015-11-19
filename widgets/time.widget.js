var moment = require('moment'),
    React = require('react');

class TimeWidget extends React.Component {

  render() {
    return (
            <div>
              <span className="date">12/12/13</span>
              <span className="time">12:12:13</span>
            </div>
          )
  }

}

//     var model = {};
//
// class Widget {
//
//   job(emit) {
//     emit({
//       date: moment().format('h:mm:ss a').toString(),
//       time: moment().format('MMMM Do YYYY').toString()
//     });
//   }
//
//   getElement() {
//       return (
//         <div>
//           <span className="date">{this.model.date}</span>
//           <span className="time">12:12:13</span>
//         </div>
//       )
//   }
//
// }
//
// class TimeWidget extends Widget {


    // dimensions: {
    //   rows: 1,
    //   columns: 1
    // }
    //
    // template: {
    //   element: React.createComponent(
    //     <div>
    //       <span className="date">{this.model.date}</span>
    //       <span className="time">12:12:13</span>
    //     </div>
    //   ),
    //   css: '.date, .time { display: block; font-size: 40px; }',
    //   model: {
    //     time: new Date(),
    //     date: new Date()
    //   }
    // }
    //
    // job: {
    //   schedule: 1000,
    //   script: function(emit) {
    //     emit({
    //       date: moment().format('h:mm:ss a').toString(),
    //       time: moment().format('MMMM Do YYYY').toString()
    //     });
    //   }
    // }
// }
//
// TimeWidget.component = React.createClass({
//
//   propTypes: {
//     children: React.PropTypes.string
//   },
//
//   render: function() {
//     return (
//       <div>
//             <span className="date">{this.model.date}</span>
//             <span className="time">12:12:13</span>
//       </div>
//     );
//   }
//
// });
//
//
// TimeWidget.dimensions = {
//   rows: 1,
//   columns: 1
// }
//
// TimeWidget.css = ```
//   .date, .time { display: block; font-size: 40px; }
// ```

export default TimeWidget;
