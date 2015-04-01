import {Collection,Identifier} from '../../src/Collection';

describe('Collection', function() {
  describe('#insert', function() {
    it('returns an identifier', function() {
      var collection = new Collection();
      var identifier = collection.insert(40);
      expect(identifier).to.be.an.instanceOf(Identifier);
    });

    it('stores a value in the collection', function() {
      var collection = new Collection();
      collection.insert(40);
      expect(collection._items).to.have.a.lengthOf(1);
      collection.insert(25);
      expect(collection._items).to.have.a.lengthOf(2);
    });

    it('stores identifiers in order', function() {
      function *mockGenerator() {
        yield new Identifier(5);
        yield new Identifier(10);
        yield new Identifier(6);
        yield new Identifier(2);
      }

      var collection = new Collection(mockGenerator());
      collection.insert(40);
      collection.insert(25);
      collection.insert(30);
      collection.insert(50);

      expect(collection._items[0].id.value).to.be.equal(2);
      expect(collection._items[1].id.value).to.be.equal(5);
      expect(collection._items[2].id.value).to.be.equal(6);
      expect(collection._items[3].id.value).to.be.equal(10);
    });
  });

  describe('#remove', function() {
    beforeEach(function() {
      this.collection = new Collection();
      this.idA = this.collection.insert(40);
      this.idB = this.collection.insert(25);
    });

    it('removes an element by its identifier', function() {
      expect(this.collection._items).to.have.a.lengthOf(2);
      this.collection.remove(this.idA);
      expect(this.collection._items).to.have.a.lengthOf(1);
      this.collection.remove(this.idB);
      expect(this.collection._items).to.be.empty;
    });

    it('returns the value removed', function() {
      var value;
      value = this.collection.remove(this.idA);
      expect(value).to.be.equal(40);
      value = this.collection.remove(this.idB);
      expect(value).to.be.equal(25);
    });

    it('removes the first matched id on duplicated elements', function() {
      function *mockGenerator() {
        yield new Identifier(1);
        yield new Identifier(2);
        yield new Identifier(2);
        yield new Identifier(3);
      }

      var collection = new Collection(mockGenerator());

      var idA = collection.insert(40);
      var idB = collection.insert(25);
      var idC = collection.insert(30);
      var idD = collection.insert(50);

      expect(idB).to.be.deep.equal(idC);

      collection.remove(idB);
      expect(collection._items).to.have.a.lengthOf(3);
      collection.remove(idA);
      expect(collection._items).to.have.a.lengthOf(2);
      collection.remove(idC);
      expect(collection._items).to.have.a.lengthOf(1);
      collection.remove(idD);
      expect(collection._items).to.be.empty;
    });
  });

  describe('#removeLargest', function() {
    beforeEach(function() {
      this.collection = new Collection();
      this.collection.insert(40);
      this.collection.insert(25);
      this.collection.insert(30);
    });

    it('removes the largest value', function() {
      this.collection.removeLargest();
      this.collection._items.forEach(function(item) {
        expect(item.value).to.not.be.equal(40);
      });

      this.collection.removeLargest();
      this.collection._items.forEach(function(item) {
        expect(item.value).to.not.be.equal(30);
      });

      this.collection.removeLargest();
      expect(this.collection._items).to.be.empty;
    });
  });
});
