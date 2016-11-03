### What are constructor functions? 
Constructor functions are the Javascript way to to build objects with a certain set of properties. In essence, they act as a factory to build objects of a certain type.

If you told me to write a function to act as a factory for car objects and I didn't know anything about constructor functions, I might write something like this: 

::: codeblock
```javascript 
// Faux constructor function 
function transformObjectIntoACar(objectToTransform, brand, color) {
  objectToTransform.wheels = 4;
  objectToTransform.brand  = brand;
  objectToTransform.color  = color;
}

// I've called this object myCar for now, but it's not a car yet! 
var myCar = {};

// Transform myCar into a car 
transformObjectIntoACar(myCar, 'Honda', 'blue');

// Check out my new ride:  
console.log(myCar);
```
::: 

I've given the myCar object three properties that can be customized based on the arguments passed in because not every car is a blue Honda (even though it seems that way sometimes). 

Great! We've accomplished our goal of building a factory for car objects--you can stop reading now and go look at cat videos.

Except, this code isn't really that great. The purpose of the code isn't clear unless you read it closely. It also isn't particularly semantic, because it doesn't read like english. If I hadn't given the function a clear name, it wouldn't be obvious what this function did or even why I wrote it in the first place. 

Constructor functions will solve these problems. Check this out: 

::: codeblock
```javascript 
// Car constructor object 
function Car(brand, color) {
  this.wheels = 4;
  this.brand  = brand;
  this.color  = color;
}

// Make a new car 
var myCar = new Car('Honda', 'black');

// Check out my new ride:  
console.log(myCar);
```
::: 

This does exactly the same thing, but it's a little clearer. Now when I want to build a new car, that's exactly what I write! 

Normally, I name functions after the action that they perform, but this time I've named my function a noun (gasp!), and a capitalized noun at that. The transformObjectIntoACar function did perform an action, but the Car function is more like a template; it defines the car archetype. That's why it gets a capitalized name--because it is the Car from which all cars descend (constructor functions are the only things in Javascript that get capitalized first letters by convention). 

It's important to note that the Car function isn't a car object, just like transformObjectIntoACar wasn't--it's the factory that produces car objects. From now on, we can call these car objects 'instances' because they were instantiated by the constructor function. 

But wait! If myCar is an object, where did that object come from? When I used transformObjectIntoACar, I explicitly declared myCar equal to an empty object at the start, but this time I never made a new object with curly braces. The Car function doesn't even have a return value! What's going on? And what is 'this'?

### The 'new' operator 
Javascript didn't conjure a new object from the void. Or rather, it did, but only because I told it to when I used the ['new' operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new), which:
  * Creates a new object
  * Binds the 'this' keyword inside the constructor function to that object.
  * Sets the prototype of the new object to the constructor function's prototype (We'll talk about that later).

A lot of the things that I did explicitly in the first example are now automatically being done by Javascript and hidden away under the hood: 
  * Instead of having to create the object myself, 'new' did it for me. 
  * Instead of having to pass the object to transform into transformObjectIntoACar, Javascript has automatically given the Car function access to the object it is going to transform inside the ['this' keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this). 
  * Instead of having to think of a good function name, I can just name it after what I'm building. Naming the function is now automatic for the programmer. 

That's all fine, you say, but for all this talk, I've still only managed to make very simple objects. 

### Adding functionality to our cars 

Our cars are static right now--they don't do anything. I can make them more exciting by teaching them how to perform actions. To do that, I'll give them some methods (a method is just a function attached to an object). 

Here is a slightly more interesting car: 

::: codeblock
```javascript
// Car constructor object 
function Car(brand, color) {
  // Attach properties 
  this.wheels = 4;
  this.brand  = brand;
  this.color  = color;
  this.on     = false;
  
  // Attach methods
  this.turnOn = function() {
    this.on = true;
  }
}

// Make a new car and turn it on
var myCar = new Car('Honda', 'black');
myCar.turnOn();

// Check out my new ride:  
console.log(myCar);
```
::: 

IT'S ALIVE!!! I've attached a method that can change properties on the object! Slightly more interesting indeed.

What if there's more than one car? In keeping with the tradition of owning nondescript cars, lets make a silver Toyota too: 

::: codeblock
```javascript
// Car constructor object 
function Car(brand, color) {
  // Attach properties 
  this.wheels = 4;
  this.brand  = brand;
  this.color  = color;
  this.on     = false;
  
  // Attach methods
  this.turnOn = function() {
    this.on = true;
  }
}

// Make a new car and turn it on
var myCar = new Car('Honda', 'black');
myCar.turnOn();

// Make another car
var myOtherCar = new Car('Toyota', 'silver');

// Check out my rides:  
console.log('myCar: ', myCar);
console.log('myOtherCar: ', myOtherCar);
```
::: 

I've built two cars for myself, but I only turned myCar on--the Toyota is still off because all of those properties are stored independently on every instance of Car. 

Not sharing properties between cars makes sense for properties like 'on', because each car should keep track of whether it is on or off for itself. That said, it seems a little silly for myCar and myOtherCar to each store their own copy of the turnOn function. The process of turning a car on is identical for all cards, so it seems like my cars should be able to share it. Functions take up a lot of memory, so if I had a million cars instead of just two, my code would take up a lot of room. Let's make it more efficient! 

### Prototypes in Javascript 
Every constructor function has a [prototype](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes) object, which acts as a cache of properties that are shared between all objects instantiated with that constructor. So, if I attach something to the Car prototype, all of my cars will have access to it. What's more, there will only be one version of it in memory, the version on the prototype, so nothing is duplicated that doesn't need to be. 

::: codeblock
```javascript 
// Car constructor function 
function Car(brand, color) {
  this.brand  = brand;
  this.color  = color;
  this.on     = false;
}

// Attach the turnOn method to the Car prototype 
Car.prototype.turnOn = function() {
  this.on = true;
}
// Any shared properties can be attached to the prototype, not just methods  
Car.prototype.wheels = 4;

// Make a new car 
var myCar = new Car('Honda', 'black');
myCar.turnOn();

// Make another car
var myOtherCar = new Car('Toyota', 'silver');

// Check out my rides: 
console.log('myCar: ', myCar);
console.log('myOtherCar: ', myOtherCar);
```
::: 

We've achieved preschool level and learned how to share! Fantastic! You've probably used methods attached to a prototype before, like if you've ever used 'push' to add values to an array. Arrays have a constructor function, (named [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)), and attached to [Array.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype) are all the [array methods like push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods). Inside of these methods, 'this' refers to the instance that the method was called from. In Javascript, 'this' inside of any function refers to the object that it was called from (but it might not always be obvious what that means).

But wait--how does myCar know about turnOn? It isn't a property on myCar anymore, so why don't we get an error like 'Uncaught TypeError: myCar.turnOn is not a function'? That's the error that would be thrown if we had to tried to call some other nonexistent property on myCar as though it were a function, like if we'd made a typo and tried to call tirnOn instead of turnOn. 

This gets at a broader question: how does myCar find properites on it's prototype, or even know what it's prototype is? 

# Prototypical Inheritance 

When we try to access a property like turnOn that doesn't exist on myCar, Javascript will ['look up the Inheritance chain'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) at Car.prototype and see if it can find that property there. If it can't, it will keep looking up the chain to Object.prototype. Javascript will only return undefined for a property after searching the object, the object's prototype, the prototype's prototype, etc. and never found anything. 

If you look closely at myCar, there is a weird property on it that we never set called [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto), which is a reference to the Car prototype. Interestingly, Car.prototype has a prototype too, which is [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype). The \_\_proto\_\_ property is important to know about, but it is considered poor form to  modify it in any way (although you can). It's there for Javascript to use internally, not for you to mess with. 

One thing worth noting is that attaching a property to an instance may 'shadow' properties with the same name that exist on the prototype. Also, since items attached to the prototype are shared among all instances, they can behave in ways that aren't always intuitive. 

Prepare yourself, because now we're going to start to get into the weird stuff. Try to guess what the console logs at the bottoms will show before running the code: 

::: codeblock
```javascript 
// Car constructor function 
function Car(brand, color) {
  this.brand  = brand;
  this.color  = color;
  this.on     = false;
}

// Attach turnOn to the Car prototype 
Car.prototype.turnOn = function() {
  this.on = true;
}
// Any properties that should be shared can be attached to the prototype, not just methods  
Car.prototype.wheels = 4;

// What do you think these will do? 
Car.prototype.placesVisited = [];
Car.prototype.visitPlace = function(place) {
  this.placesVisited.push(place);
}

// Make myCar and visit a place 
var myCar = new Car('Honda', 'black');
myCar.visitPlace('Portland, OR');

// Make myOtherCar and give it a set of training wheels 
var myOtherCar = new Car('Toyota', 'silver');
myOtherCar.wheels = 6;

// What do you think myOtherCar.wheels will be? How about myCar.wheels? 
console.log('myCar.wheels: ', myCar.wheels);
console.log('myOtherCar.wheels: ', myOtherCar.wheels);

// What do you think these will be? 
console.log('myCar.placesVisited: ', myCar.placesVisited);
console.log('myOtherCar.placesVisited: ', myOtherCar.placesVisited);

// Check out my rides:  
console.log('myCar: ', myCar);
console.log('myOtherCar: ', myOtherCar);
```
::: 

Now it looks like both cars visited Portland, but oddly only myOtherCar had it's number of wheels change. If you expected that to happen, hats off to you. If you didn't expect that, I probably seem like wizard right now. Fortunately, Javascript isn't magic--let's reason our way through what happened. 

When I used visitPlace on myCar, I pushed a value into myCar's placesVisited array. But, myCar doesn't have a property called placesVisited, so Javascript looked up the prototype chain to Car.prototype and finds a placesVisited property there with the value of an empty array, then pushes the string 'Portland, OR' into it. Since both myCar and myOtherCar use the same placesVisited array, I accidentally made it seem like both of my cars had visited Portland. For this to work sensibly, I should have attached placesVisited to the object inside of the constructor function so that each Car instance would have it's own placesVisited array. 

What about with wheels? I added a property, 'wheels', to myOtherCar, with the value of 6, so when I logged myOtherCar.wheels, it found a property with the name 'wheels' on myOtherCar and didn't bother looking up the prototype chain; the property 'wheels' on Car.prototype was shadowed by the property that we attached to myOtherCar. Since we didn't give myCar a 'wheels' property, Javascript still had to look up the prototype chain when I logged myCar.wheels. 

As an exercise for the student, what do you think would have happened if I had done `myOtherCar.wheels += 2` instead? Did that do what you expected? 

### Yo dawg, I heard you like prototypes 

That's cool and all, but sometimes it's nice to able to describe things as inheriting from more than one thing. I'm making cars here, but what if I also wanted to make Vehicles? Wouldn't it make sense for instances of Car to inherit stuff from Vehicle.prototype too? 

That can be done, but it's more complicated: 

::: codeblock
```javascript 
// Define Vehicle constructor and add turnOn method to its prototype
function Vehicle(brand) {
  this.on    = false;
  this.brand = brand;
}
Vehicle.prototype.turnOn = function() {
  this.on = true;
}

// Define Car constructor 
function Car(brand, color) {
  Vehicle.call(this, brand);
  this.placesVisited = [];
  this.color         = color;
}

// Replace Car.prototype with an empty object inheriting from Vehicle.prototype 
Car.prototype = Object.create(Vehicle.prototype);

// Re-teach Car.prototype that its constructor function is Car 
Car.prototype.constructor = Car;

// Teach cars how to visit a place 
Car.prototype.visitPlace = function(place) {
  this.placesVisited.push(place);
}

// Roadtrip to Portland in my new car 
var myCar = new Car('Honda', 'blue');
myCar.turnOn();
myCar.visitPlace('Portland, OR');

// Check out my new ride: 
console.log(myCar);
```
::: 

Instead of panicking, let's break this down into chunks and walk through them one by one. 

First, I define a Vehicle constructor function and attach the old turnOn function to Vehicle.prototype, which is all stuff we've seen before. On the surface level, the Car constructor function looks pretty similar to before too--we just attach some properties we've seen before, and attach the old visitPlace method to Car.prototype.

The first line of the Car constructor is isn't something we've encountered before though. Since cars inherit from vehicles, we have to start out by building a vehicle before we can turn it into a car. However, the value of 'this' is only set automatically inside of the Car function. I have to manually set 'this' inside the Vehicle constructor using [Function.prototype.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call). The first argument I pass to 'call' is the value of 'this' I want the Vehicle constructor to have, and the rest of the arguments (in this case, just 'brand') are the normal arguments passed into the Vehicle constructor. Don't worry if 'this' doesn't immediately make sense; it is considered one of the most confusing concepts in Javascript. 

Just calling the Vehicle constructor inside of the Car constructor won't tell Car.prototype that it inherits from Vehicle.prototype. Again, that has to be done manually. I'm using  [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create), which creates an empty object inheriting from the object passed in as the first argument, to build an empty object that will replace the old Car.prototype object.  To avoid any problems, I have to teach Car.prototype which constructor function it belongs to, since only the old prototype that I replaced knew that. Omitting this step probably won't break anything, but it's a good best practice. I could have achieved the same thing by doing something like `Car.prototype.__proto__ = Vehicle.prototype`, but this way doesn't require me to mess with the \_\_proto\_\_ property (remember, doing that is frowned upon). 

Everything else is stuff that we've seen before. The newest version of Javascript has implemented [a more intuitive way](http://es6-features.org/#ClassDefinition) to do this sort of thing, but it isn't supported everywhere yet.

### Further reading 

If you want some exercises to practice this sort of thing, [nodeschool](https://nodeschool.io/) has a [quick tutorial on prototypes](https://github.com/sporto/planetproto). MDN also has some good articles on [working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects), on [object-oriented programming in javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript), and on [the inheritance chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).   



### TL;DR
 * Constructor functions are templates that define a kind of object. 
 * Objects can be built from a constructor function using the 'new' operator. 
 * Constructor function prototypes are objects that contain properties that should be shared among all instances of that constructor (usually methods, but not always)
 * You can find the prototype: 
   * On the constructor function as ConstructorFunctionName.prototype 
   * On instances of that kind of object in the \_\_proto\_\_ property 
 * You can tell what the constructor function was: 
   * As the [constructor property on the prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor). 
   * Using the [instanceof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof).
 * There is a [new way to handle inheritance](http://es6-features.org/#ClassDefinition) coming out in ES6. 
