module.exports = function(layout, dimensions) {

  var width = (layout.width / layout.columns) * dimensions.columns + ( layout.gutter * (dimensions.columns - 1));
  var height = (layout.height / layout.rows) * dimensions.rows + ( layout.gutter * (dimensions.columns - 1));

  return 'width: '+width+'px; height: '+height+'px;'
}
