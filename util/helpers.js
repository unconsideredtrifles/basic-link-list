const hasOwnProp = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};


const noop = function() {};


export {
  hasOwnProp,
  noop
};
