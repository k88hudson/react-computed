"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function filterObj(oldObj, keys) {
  var newObj = {};
  if (!keys) return newObj;
  keys.forEach(function (key) {
    return newObj[key] = oldObj[key];
  });
  return newObj;
}

function hasChangedKeys(oldObj, newObj, keys) {
  if (!keys) return false;
  var changes = false;
  keys.forEach(function (key) {
    if (newObj[key] !== oldObj[key]) changes = true;
  });
  return changes;
}

exports.default = {
  componentWillMount: function componentWillMount() {
    var _this = this;

    if (!this.getComputed) return;
    this.__computed = {};
    this.computed = {};
    Object.keys(this.getComputed).forEach(function (key) {
      var defn = _this.getComputed[key];
      Object.defineProperty(_this.computed, key, {
        get: function get() {
          return _this.__computed[key];
        }
      });
      _this.__computed[key] = defn.get(filterObj(_this.props, defn.props), filterObj(_this.state, defn.state));
    });
  },

  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    var _this2 = this;

    if (!this.getComputed) return;
    Object.keys(this.getComputed).forEach(function (key) {
      var defn = _this2.getComputed[key];
      if (hasChangedKeys(_this2.props, nextProps, defn.props) || hasChangedKeys(_this2.state, nextState, defn.state)) {
        _this2.__computed[key] = defn.get(filterObj(nextProps, defn.props), filterObj(nextState, defn.state));
      }
    });
  }

};