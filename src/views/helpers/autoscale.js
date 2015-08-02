module.exports = function(layout, dimensions) {

  var availableWidth = (layout.width - (layout.gutter * (layout.columns + 1)));
  var availableHeight = (layout.height - (layout.gutter * (layout.rows + 1)));

  var width = (availableWidth / layout.columns) * dimensions.columns;
      width += layout.gutter * (dimensions.columns - 1);

  var height = (availableHeight / layout.rows) * dimensions.rows;
      height += layout.gutter * (dimensions.rows - 1);

  return 'width: '+width+'px; height: '+height+'px;'
}
