function filterObj(oldObj, keys) {
  const newObj = {};
  if (!keys) return newObj;
  keys.forEach(key => newObj[key] = oldObj[key]);
  return newObj;
}

function hasChangedKeys(oldObj, newObj, keys) {
  if (!keys) return false;
  let changes = false;
  keys.forEach(key => {
    if (newObj[key] !== oldObj[key]) changes = true;
  });
  return changes;
}

export default {
  componentWillMount: function() {
    if (!this.getComputed) return;
    this.__computed = {}
    this.computed = {};
    Object.keys(this.getComputed).forEach(key => {
      const defn = this.getComputed[key];
      Object.defineProperty(this.computed, key, {
        get: () => this.__computed[key]
      });
      this.__computed[key] = defn.get(
        filterObj(this.props, defn.props),
        filterObj(this.state, defn.state)
      );
    });
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (!this.getComputed) return;
    Object.keys(this.getComputed).forEach(key => {
      const defn = this.getComputed[key];
      if (hasChangedKeys(this.props, nextProps, defn.props) ||
        hasChangedKeys(this.state, nextState, defn.state)) {
          this.__computed[key] = defn.get(
            filterObj(nextProps, defn.props),
            filterObj(nextState, defn.state)
          );
      }
    });
  }

};
