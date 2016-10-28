#### Introduction to Constructor Functions and Prototypes

Constructor functions in Javascript are a way to build objects with a particular set of properties, like cookie-cutters that can be used to stamp out a certain kind of object as needed. Here's an example constructor function that will produce cat objects. 

```javascript 
// Cat constructor function 
function Cat(name, breed) {
  this.name  = name;
  this.breed = breed;
  this.sound = 'meow';
}

// Make a new cat named fuzzums 
var fuzzums = new Cat('fuzzums', 'tabby');

// See what we made! 
console.log(fuzzums); 
```

#### The 'new' Keyword 

In the code above, we called a function, 'Cat', and somehow got an object back. How did that happen? 

Based on the title of this section, it's pretty obvious that the new keyword is responsible. The 'new' keyword creates a new object, then calls the function afterwards on that object. So, wheo/n the 'Cat' function attaches the property 'name' or breed or whatever onto 'this,' it is attaching those properties onto the newly instantiated object. 

The code below does pretty much the same thing, but less elegantly! Great! I've included it in an attempt to clarify what exactly the 'new' keyword is doing under-the-hood. 

```javascript 
// Define Cat faux-constructor function
function Cat(objectToMakeIntoACat, name, breed) {
  objectToMakeIntoACat.name  = name; 
  objectToMakeIntoACat.breed = breed; 
  objectToMakeIntoACat.sound = 'meow';
}

// Make a new object 
var fuzzums = {};

// Use the constructor function to attach properties to that object
Cat(fuzzums, 'fuzzums', 'tabby');

// See what we made!
console.log(fuzzums);
```
This does pretty much the same thing. The difference between the two is that this code doesn't do anything with the prototype,  




#### Prototypes in Javascript 

If we wanted this cat to make a noise, we could attach a function to the Cat constructor like this: 

```javascript 
function Cat(name, breed) {
  this.name   = name;
  this.breed  = breed;
  this.sound = 'meow';
  this.makeNoise = function() {
    console.log(this.sound);
  };
}

var fuzzums = new Cat('fuzzums', 'tabby');
fuzzums.makeNoise();
```

This isn't the best way to do this though. Every instance of cat now has its own version of the makeNoise function stored in memory. Since they're all identical, it seems like we could get rid of all the duplicates and just store one makeNoise function that all the cats could share. 

We can do that by attaching the makeNoise function to the Cat prototype like this: 

```javascript 
function Cat(name, breed) {
  this.name   = name;
  this.breed  = breed;
  this.sound = 'meow';
}
Cat.prototype.makeNoise = function() {
  console.log(this.sound);
}

var fuzzums = new Cat('fuzzums', 'tabby');
fuzzums.makeNoise();
```

Now there is a single makeNoise function attached to the Cat prototype. This code works exactly the same as the code above it, except that it's a bit less memory-intensive (which would matter if you had, say, a million cats) and it's a lot cleaner, even though it's a couple more lines of code.  

Constructor functions like Cat also have a property called their prototype, which is an object. Just like with any other object, we can add properties and functions onto the prototype. 
What's cool about the prototype though, is that all instances of the constructor know about it. If they can't find a property on themselves, they'll look and see if that property exists on their prototype. 







#### Prototypical Inheritance in Javascript 

What's interesting is that our cat object, fuzzums, actually doesn't have a property on it named 'makeNoise'. Instead, our cat has a property called __proto__, which points back at Cat.prototype. When we try to access the property 'makeNoise', after finding that 'makeNoise' is undefined on fuzzums, the Javascript engine looks at __proto__ property to see if it has a key called 'makeNoise'. If one isn't found there, it will continue 'looking up the inheritance chain' by looking at the next __proto__, until there isn't one anymore. 

A good way to show this is by having two classes, one of which inherits from the other: 

```javascript 
function Cat(name, breed) {
  this.name   = name;
  this.breed  = breed;
  this.sound  = 'meow';
}
Cat.prototype.makeNoise = function() {
  console.log(this.sound);
}

function TabbyCat(name) {
  Cat.call(this, name, 'tabby');  
}
TabbyCat.prototype = Object.create(Cat.prototype);

var misterSnuffles = new TabbyCat('misterSnuffles');
misterSnuffles.makeNoise();
```

Here, we have made a parent constructor, Cat, and a constructor that inherits from it, TabbyCat. To make TabbyCats, the Cat constructor has been [called](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) on the TabbyCat (because TabbyCats should at least have the same properties that Cats have). Then, I [created](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) a new object whose __proto__ property points at Cat.prototype to be the prototype for TabbyCats. This way, TabbyCats inherit all the methods being shared on the Cat prototype, but now they can also be given their own methods on the TabbyCat prototype that will only be available to TabbyCats, not all Cats. 


#### The 'new' Keyword


















#### WHAT CONSTRUCTOR FUNCTIONS ARE 
  Constructor functions are how you build objects of a particular type  
    * You can always build a new object w/ an object literal 
    * Constructors are when you want to build an object from a template, with a set of values and methods associated 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
  They 
    * Create a new object which inherits from the constructor's prototype 
    * The constructor is called with that new object as its context -- 'this' in the function will refer to that newly created object 
    * This new object is returned from the whole new statement


#### WHAT THE PROTOTYPE IS 
  The prototype is another object! 
  Attached to it are properties that should be shared by children 
  If you try to access a property of an object that is undefined, it will check that object's prototype for the same key. 
  If that prototype has a prototype, it will keep checking, all the way up the inheritance chain to the Object prototype 
  Only then, if it isn't found, will it return undefined 
  This is for getting a property only, if you set it, it will be set on the instance, not on the prototype, even if there is a property named the same name on the prototype 


#### WHY TO CARE ABOUT THE PROTOTYPE 
  Prototypes are mostly used for memory reasons 
  You could attach all the methods directly to the object, but then each would live separately in memory 
  By attaching just a reference to the prototype, only one of those functions exists in memory that all the children share 



#### WHERE TO FIND THE PROTOTYPE, CONSTRUCTOR 
  If you are on the instance, obj.__proto__ 
  If you are on the constructor, Constructor.prototype 
  Can find constructor with obj.constructor 
  Easy to test for inheritance w/ obj instanceof Constructor 
  




#### CONTEXT/VALUE OF THIS 
  For normal functions (not arrow functions), the value of 'this' always refers to the object that the function was called from 
  If you call a prototype method, the object it was called from is not the prototype, so 'this' refers to the object 
  
```javascript 
function MyConstructor() {
  this.name = 'Property on Object';
}
MyConstructor.prototype.name = 'Property on Prototype';
MyConstructor.prototype.sayName = function() {
  console.log(this.name);
}

var instance = new MyConstructor()
instance.sayName();
```  








### ILLUSTRATE HOW CONSTRUCTORS WORK 
```javascript 
function Constructor(name) {
  this.name = name;
}
Constructor.prototype.sayName = function() {
  console.log(this.name)
}

let instance = new Constructor('frank');
instance.sayName();
```



### ILLUSTRATE INHERITANCE 
```javascript 
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child(...args) {
  Parent.apply(this, args);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.sayHello = function() {
  console.log('Hello, ', this.name);
}

let instanceOfChild = new Child('I am a Child');
let instanceOfParent = new Parent('I am a Parent');

instanceOfChild.sayHello();
instanceOfChild.sayName();
// Doesn't exist: instanceOfParent.sayHello();
instanceOfParent.sayName();

```


### ILLUSTRATE SHADOWING 
```javascript 
// Define the parent 
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log(this.name);
}

// Define the child 
function Child(...args) {
  Parent.apply(this, args);
  
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.sayHello = function() {
  console.log('Hello, ', this.name);
}

// Make a parent and a child 
let instanceOfChild = new Child('I am a Child');
let instanceOfParent = new Parent('I am a Parent');

console.log('This is what a parent looks like: ', instanceOfParent);
console.log('This is what a child looks like: ', instanceOfChild);

instanceOfChild.sayHello(); // Hello, I am a Child 
instanceOfChild.sayName();  // I am a Child 

instanceOfChild.name = 'I am still a Child'

instanceOfChild.sayHello(); // Hello, I am still a Child 
instanceOfChild.sayName();  // I am still a Child 
```







<!-- TODO: link to es6 stuff http://es6-features.org/#ClassDefinition -->


<!--  -->
