Collection
====================
A simple Collection class which implements three main methods insert(), remove() and removeLargest().

obj.insert(item)
--------------------
Insert an item in the collection, it will create and assign an identifier to the object that can be used to remove the item from the collection.

    var id = obj.insert(500);

Returned object is an instance of Identifier class. The stored objects are sorted by its id, an binary search will be perfomed to find the correct place of the object.

obj.remove(identifier)
--------------------
Removes the object with the specified identified if exists.

    var id = obj.insert(500);
    var deleted = obj.remove(id);

The remove method returns the deleted object, so deleted will be equal to 500. As insert ensures all the objects are sorted bu its id, remove() method binary search the object to be removed.

obj.removeLargest()
--------------------
Finds the largest element in the collection and remove it.

    var deleted = obj.removeLargest();

As we did in remove() method, removeLargest() will return the deleted object.

Custom identifiers
--------------------
Identifiers are assigned with a generator, you can create your own generator by passing it as first argument when you create a Collection object.

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function *randomGenerator() {
      while (true) {
        yield new Identifier(getRandomInt(1, 1000));
      }
    }

    var collection = new Collection(randomGenerator());

Snippet above will create random generated identifiers. Also you can create a new kind of identifier by extending the Identifier class.

    class StringIdentifier extends Identifier {
      compare(other) {
        return this.value.localeCompare(other.value);
      }
    }

    function *stringGenerator() {
      while (true) {
        yield new StringIdentifier('MyId' + getRandomInt(1, 1000));
      }
    }

    var collection = new Collection(stringGenerator());

Test the project
--------------------
Clone the repository and install dependencies.

    $ git clone https://github.com/abiee/collection.git
    $ cd collection
    $ npm install
    $ npm test

Development
--------------------
You can make TDD development by running.

    $ gulp

Will run all your tests and wait for changes, on any changes will run all the tests again.

Build it
--------------------
To build your library for distribution just run.

    $ gulp build

Licence
---------------------
Licensed under the MIT license.
