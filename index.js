import Wrapper from "./wrapper";

function Lazy(data) {
  if (!(data instanceof Array)) {
    throw new TypeError("not a array");
  }
  this.data = data;
  this.sequenceList = [];
  this.length = 0;
}

Lazy.prototype.filter = function(filter) {
  const self = this;
  this.sequenceList.push(
    new Wrapper({
      prevWrapper: self.sequenceList.pop(),
      value: filter,
      type: "filter",
    })
  );
  this.length++;
  return this;
};

Lazy.prototype.take = function(n) {
  const self = this;
  this.sequenceList.push(
    new Wrapper({
      prevWrapper: self.sequenceList.pop(),
      value: n,
      type: "take",
    })
  );
  this.length++;
  return this;
};

Lazy.prototype.join = function() {
  const result = this.sequenceList.pop().run(this.data);
};
