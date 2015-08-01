module.exports = function(layout, dimensions) {

  var width = (layout.width / layout.columns) * dimensions.columns + ( 6 * (dimensions.columns - 1));
  var height = (layout.height / layout.rows) * dimensions.rows + ( 6 * (dimensions.columns - 1));

  return 'width: '+width+'px; height: '+height+'px;'
}
