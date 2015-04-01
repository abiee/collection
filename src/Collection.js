const SMALLER = -1;
const EQUAL = 0;
const BIGGER = 1;

export class Identifier {
  constructor(value) {
    this._value = value || 1;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  compare(identifier) {
    if (this.value > identifier.value) {
      return BIGGER;
    } else if (this.value < identifier.value) {
      return SMALLER;
    } else {
      return EQUAL;
    }
  }
}

function *defaultIdentifierGenerator() {
  for (var i = 1; ; i++) {
    yield new Identifier(i);
  }
}

export class Collection {
  constructor(idsGenerator) {
    this._generator = idsGenerator || defaultIdentifierGenerator();
    this._items = [];
  }

  insert(value) {
    var identifier = this._generator.next().value;

    if (this._items.length === 0) {
      this._items.push({ id: identifier, value: value });
      return identifier;
    }

    var index = this._calculateIndex(identifier);

    this._items.splice(index, 0, { id: identifier, value: value });
    return identifier;
  }

  _calculateIndex(id) {
    var high = this._items.length - 1;
    var low = 0;
    var index = 0;

    while(high > low) {
      index = Math.floor((high + low) / 2);
      let element = this._items[index];

      switch (element.id.compare(id)) {
        case SMALLER:
          low = index + 1;
          break;
        case BIGGER:
          high = index - 1;
          break;
        case EQUAL:
          return index;
      }
    }

    if (this._items[index].id.compare(id) === SMALLER) {
      return index + 1;
    } else {
      return index - 1;
    }
  }

  remove(id) {
    var index = this.findById(id);
    if (index < 0) { return; }

    var element = this._items[index].value;
    this._items.splice(index, 1);

    return element;
  }

  findById(id) {
    var high = this._items.length;
    var low = 0;

    while(high > low) {
      let index = Math.floor((high + low) / 2);
      let element = this._items[index];

      switch (element.id.compare(id)) {
        case SMALLER:
          low = index + 1;
          break;
        case BIGGER:
          high = index;
          break;
        case EQUAL:
          return index;
      }
    }

    return -1;
  }

  removeLargest() {
    if (this._items.length === 0) { return; }

    var largestIndex = 0;
    var largestValue = this._items[largestIndex].value;

    for (let i = 1; i < this._items.length; i++) {
      let item = this._items[i];

      if (largestValue < item.value) {
        largestIndex = i;
        largestValue = item.value;
      }
    }

    this._items.splice(largestIndex, 1);
  }
}
