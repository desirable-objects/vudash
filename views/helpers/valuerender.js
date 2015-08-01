module.exports = function(val) {

  if (typeof val === 'string') {
    return '\"'+val+'\"';
  } else {
    return JSON.stringify(val);
  }

}
