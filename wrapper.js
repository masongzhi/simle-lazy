function Wrapper(param) {
  this.prevWrapper = param.prevWrapper;
  this.value = param.value;
  this.type = param.type;
  this.nextWrapper = null;
  this.takeCount = 0;
}

Wrapper.prototype.upload = function(nextWrapper, data, index) {
  if (!this.prevWrapper) {
    this.release(data, index);
  } else {
    this.nextWrapper = nextWrapper;
    this.prevWrapper.upload(this, data, index);
  }
};

Wrapper.prototype.release = function(nextData, index) {
  if (!this.nextWrapper) {
  }
  const result = this.handle(nextData, index);
  this.nextWrapper.release(result);
};

Wrapper.prototype.run = function(data) {
  const result = []
  const self = this
  data.forEach(function(item, index) {
    self.upload(null, item, index)
  })
  return result
};

Wrapper.prototype.handle = function(data, index) {
  if (this.type === "filter") {
    return this.value(data);
  } else if (this.type === "take") {
    if (this.takeCount < this.value) {
      this.takeCount++;
      return val.unshift();
    }
  }
};
