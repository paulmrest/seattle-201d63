'use strict';

var allCats = [];

function Cat(name, age, loud, catNip){
  this.name = name;
  this.age = age;
  this.isLoud = loud;
  this.likeCatNip = catNip;
  allCats.push(this);
}

new Cat('Spaceghost', 10, true, true);
new Cat('Harry Winston', 10, true, true);
new Cat('Lucipurr', 4, true, true);
new Cat('Ethel', 4, false, true);
new Cat('Sophie', 2, true, true);
new Cat('Orie', 2, false, true);

console.log('my original cats array', allCats)

// Step 1. turn the thing you want to save in Local Storage into JSON
  // JSON.stringify()

var stringifiedCats = JSON.stringify(allCats);
console.log('this is the JSON for the all Cats array', stringifiedCats);

// Step 2. set the item into Local Storage. Give it any key you want as a string and set the value as the JSON

localStorage.setItem('cats', stringifiedCats);

// Step 3. to get something out of local storage, we are going to get an item

var catsFromLocalStorage = localStorage.getItem('cats');
console.log('this is my cats from Local Storage', catsFromLocalStorage);

// Step 4. turn it back into javascript

var catsTurnedBackIntoJavaScript = JSON.parse(catsFromLocalStorage);
console.log('my parsed cats', catsTurnedBackIntoJavaScript);

// loop over this array
// for each cat, I need to make a new object instance using my constructor
// new Cat(obj[i].name, obj[i].age, obj[i].isLoud, obj[i].catNip)

// the returned cats array is now a normal array of objects - it has lost its connection to the constructor