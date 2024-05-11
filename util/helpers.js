const hasOwnProp = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export default hasOwnProp;