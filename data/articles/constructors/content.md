# What are constructor functions? 
Constructor functions are the Javascript way to to build objects with a certain set of properties. In essence, they are template for a certain kind of object. 

Without knowing about constructor functions, if I wanted a function to act as a factory for car objects, I might write something like this: 

```javascript 
// Faux constructor function 
function transformObjectIntoACar(objectToTransform, brand, color) {
  objectToTransform.wheels = 4;
  objectToTransform.brand  = brand;
  objectToTransform.color  = color;
}

// Creating this object was done automatically by the new operator before 
// I've called it myCar for now, but it's not a car yet! 
var myCar = {};

// Transform myCar into a car 
transformObjectIntoACar(myCar, 'Honda', 'blue');

// Check out my new ride:  
console.log(myCar);
```

I've given the myCar object three properties, and they can be customized based on the arguments passed in (because not every car is a blue Honda even though it may seem that way sometimes). 

Great! We've accomplished our goal of building a factory for car object--stop reading and go look at cat videos. Except that this isn't great--to understand what's happening, you have to read the function in detail. This code also isn't particularly semantic--with the exception of the function name, nothing here reads like english, and if I'd given the function a vaguer name, it wouldn't be clear what this function did or even why I'd written it in the first place. 

Constructor functions will solve these problems for us. Check this out: 

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

This does exactly the same thing, but it's a little clearer. Now when I want to build a new car, that's exactly what I write! 

Normally, I name functions after the action that they perform, but this time I've named it a noun (gasp!), and a capitalized noun at that. The transformObjectIntoACar function did perform an action, but the Car function is more like a template; it defines the car archetype. That's why we've given it a capitalized name--because it is the Car from which all cars descend (constructor functions are the only things in javascript that get capitalized first letters by convention). 

It's important to note that the Car function isn't a car object, just like transformObjectIntoACar wasn't. Car is the factory that produces car objects. From now on, we can call these car objects 'instances' because they were instantiated by the constructor function. 

But wait! If myCar is an object, where did that object come from? When we used transformObjectIntoACar, we explicitly declared myCar equal to an empty object at the start, but this time we never made a new object with curly braces. Car doesn't even have a return value! What's going on? And what is 'this'?  

# The 'new' operator 
Javascript didn't conjure a new object from the void. Or rather, it did, but only because we told it to using the ['new' operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new). The 'new' operator:
  * Creates a new object
  * Binds the 'this' keyword in the constructor function to that new object.
  * Sets the prototype of the new object to the constructor function's prototype (we'll talk about that later).

A lot of the things that we did explicitly in the first example are now being done automatically by Javascript and hidden away under the hood: 
  * Instead of having to create the object ourselves, 'new' does it for us. 
  * Instead of having to pass the object to transform into transformObjectIntoACar, Javascript has automatically given the Car function access to the object it is going to transform in the ['this' keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this). 
  * Instead of having to think of a good function name, we can just name it after what we're constructing. This step is now automatic for *you* as a programmer. 

That's all fine, you say, but for all this talk, we've still only managed to make very simple objects. 

# Adding functionality to our cars 

Our cars are static right now--they don't do anything. We can define actions for them to perform by giving them methods (which is just a function attached to an object). 

Here is an moderately more exciting car: 

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

// Make a new car 
var myCar = new Car('Honda', 'black');

myCar.turnOn();

// Check out my new ride:  
console.log(myCar);
```
IT'S ALIVE!!! How's that for moderately more exciting? We've attached a method that can change properties on the object! 

What if there's more than once car? In keeping with the tradition of owning bland cars, lets get a silver Toyato too: 

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

// Make a new car 
var myCar = new Car('Honda', 'black');
myCar.turnOn();

// Make another car
var myOtherCar = new Car('Toyota', 'silver');

// Check out my rides:  
console.log('myCar: ', myCar);
console.log('myOtherCar: ', myOtherCar);
```

I've built two cars for myself, but I only turned myCar on--the Toyota is still off because all of those properties are stored independently on every instance of Car. 

Not sharing between cars makes sense for properties like 'on', because each car should keep track of whether it is on or off separately. But it seems a little silly for myCar and myOtherCar to independently store duplicate copies of the turnOn function--since turnOn is identical for all cars, and it doesn't refer to anything that specific to any one car, it seems like my cars should be able to share. Functions take up a lot of memory, so if I had a million cars (someday!), it would be inefficient memory-wise not to have the instances share when they can. 

# Prototypes in Javascript 
Every constructor function has a [prototype]() object, which acts as a cache of properties that are shared between all instances of that constructor. So, if I attach something to the Car prototype, all of my cars will have access to it. What's more, there will only be one version of it in memory, the version on the prototype, so nothing is duplicated that doesn't need to be. 

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

// Make a new car 
var myCar = new Car('Honda', 'black');
myCar.turnOn();

// Make another car
var myOtherCar = new Car('Toyota', 'silver');

// Check out my rides: 
console.log('myCar: ', myCar);
console.log('myOtherCar: ', myOtherCar);
```

We've achieved preschool level and learned how to share. Great! You've probably used methods like this before, like if you've ever used push to add values to an array. Arrays have a constructor function, (named [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)), and attached to [Array.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype) are all the [array methods like push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Methods). Inside of these methods, 'this' refers to the instance that the method was called from. In Javascript, 'this' inside of any function refers to the object that it was called from (but it might not always be obvious what that means).

But wait--how does myCar know about turnOn? It isn't a property on myCar anymore, so why don't we get an error like 'Uncaught TypeError: myCar.turnOn is not a function'? That's the error that would be thrown if we had to tried to call some other nonexistant property on myCar as though it were a function. 
This gets at a broader question--how does myCar know what it's prototype is? 

# Prototypical Inheritance 

If we look at myCar, there is a weird property on it that we never set called [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto), which is a reference to the Car prototype. Interestingly, Car.prototype has a prototype too--it is an object, so its \_\_proto\_\_ property points at [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype). The \_\_proto\_\_ property is important to know about, but it is considered poor form to change it or modify it in any way. It's there for Javascript to use, not for you. 

When we try to access a property like turnOn that doesn't exist on in instance of Car, Javascript will ['look up the Inheritance chain'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) at Car.prototype and see if it can find that property there. If it can't, it will keep looking up the chain to Object.prototype. Javascript will only return undefined for a property after searching the object, the object's prototype, the prototype's prototype, etc. and never found anything. For example, this is what would have happened if I had made a typo and tried to call tirnOn instead of turnOn. 

One thing worth noting is that attaching a property to an instance may 'shadow' properties with the same name that exist on the prototype. Also, since items attached to the prototype are shared among all instances, they can behave in ways that aren't always intuitive. 

Prepare yourselves, because now we're going to start getting into the weird stuff. Try to guess what the console logs at the bottoms will show before running the code: 

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

// How do you think these are going to behave? 
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
Now it looks like both cars visited Portland, but oddly only myOtherCar had it's number of wheels change. If you expected that to happen, hats off to you. For everyone else, I probably seem like wizard right now. Fortunately, Javascript isn't magic--let's reason our way through what happened. 

When I used visitPlace on myCar, I pushed a value into myCar's placesVisited array. But, myCar doesn't have a property called placesVisited, so Javascript looked up the prototype chain to Car.prototype and found placesVisited there, then pushed a value into it. Since both myCar and myOtherCar use the same placesVisited array, I accidentally made it seem like both of my cars had visited Portland. For this to work sensibly, I should have attached placesVisited to the object inside of the constructor function so that each Car instance would have it's own placesVisited array. 

What about with wheels? I added a property, 'wheels', to myOtherCar, with the value of 6, so when I logged myOtherCar.wheels, it found a property with the name 'wheels' on myOtherCar and didn't bother looking up the prototype chain; the property 'wheels' on Car.prototype was shadowed by the property that we attached to the instance. Since we didn't give myCar a property called 'wheels', Javascript still had to look up the prototype chain when we logged myCar.wheels. 

As an exercise for the student, what do you think would have happened if I had done `myOtherCar.wheels += 6` instead? Did that do what you expected? 

# Yo dawg, I heard you like prototypes 

That's cool and all, but sometimes it's nice to able to describe things as inheriting from more than one thing. I'm making cars here, but what if I also wanted to make Vehicles? Wouldn't it make sense for instances of Car to inherit stuff from Vehicle.prototype too? 

This gets a little complicated, but it can be done in Javascript: 

```javascript 
// Define Vehicle constructor 
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
This is a lot more complicated than anything else up to this point! Instead of panicking, let's break it down into chunks and walk through them one by one. 

First, we define a Vehicle constructor function that sets two properties, and we attach the old turnOn function to Vehicle.prototype, which is all repeats of stuff we've done before. On the surface level, the Car constructor function looks pretty similar to before too--we just attach some properties we've seen before, and attach the old visitPlace method to Car.prototype.

The first line of the Car constructor is isn't something that we've encountered before--basically, since cars inherit from vehicles, we have to start out by building the object into a vehicle before we can turn it into a car. However, this time the 'new' keyword isn't automatically setting the value of 'this' for us--it does that for the Car constructor, but we have to set the value of 'this' inside the Vehicle constructor ourselves. To do this, we're using [Function.prototype.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)--the first argument is the value of 'this' we want the Vehicle constructor to have, and the rest of the arguments (in this case, just the brand) are the normal arguments passed into the Vehicle constructor. Like everything involving the 'this' keyword, this is confusing, so don't worry if it doesn't immediately make sense. 

Just calling the Vehicle constructor inside of the Car constructor won't set the prototypes correctly though. We have to tell Car.prototype that it inherits from Vehicle.prototype. To do that, we use [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create), which creates an empty object inheriting from the object passed in as the first argument. This replaces the old Car.prototype object, so to avoid any problems, we have to teach Car.prototype which constructor function it belongs to. Omitting this step probably won't break anything, but it also won't leave things exactly as they were. We could have achieved the same thing as we did in this step by doing something like `Car.prototype.__proto__ = Vehicle.prototype`, but the way that we're doing it doesn't require us to change the \_\_proto\_\_ property (remember, doing that is frowned upon). 

Everything else is stuff that we've seen before. The newest version of Javascript has implemented [a more intuitive way](http://es6-features.org/#ClassDefinition) to do this sort of thing, but it isn't supported everywhere yet, so I'll leave that as an exercise for the student. 

# Further reading 

If you want some exercises to practice this sort of thing, [nodeschool](https://nodeschool.io/) has a [quick tutorial on prototypes](https://github.com/sporto/planetproto). MDN also has some good articles on [working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects), [object-oriented programming in javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript), and  [inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).   



# TL;DR: 
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
