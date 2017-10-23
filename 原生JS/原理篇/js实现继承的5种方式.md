1. ##### 使用对象冒充实现继承(该种实现方式可以实现多继承)

```
function Parent(firstname){  
    this.fname=firstname;  
    this.age=40;  
    this.sayAge=function(){  
        console.log(this.age);  
    }  
}  
function Child(firstname){  
    this.parent=Parent;  
    this.parent(firstname);  
    delete this.parent;  
    this.saySomeThing=function(){  
        console.log(this.fname);  
        this.sayAge();  
    }  
}  
var mychild=new Child("李");  
mychild.saySomeThing();
```
##### 2. 采用call方法改变函数上下文实现继承(该种方式不能继承原型链,若想继承原型链，则采用5混合模式)
实现原理:改变函数内部的函数上下文this,使它指向传入函数的具体对象

```
function Parent(firstname) {
    this.fname = firstname;
    this.age = 40;
    this.sayAge = function() {
    	console.log(this.age);
    }
}

function Child(firstname) {
    this.saySomeThing = function() {
    	console.log(this.fname);
    	this.sayAge();
    }
    this.getName = function() {
    	return firstname;
    }

}
var child = new Child("张");
Parent.call(child, child.getName());
child.saySomeThing();
```
##### 3. 采用Apply方法改变函数上下文实现继承(该种方式不能继承原型链,若想继承原型链，则采用5混合模式)
实现原理:改变函数内部的函数上下文this,使它指向传入函数的具体对象

```
function Parent(firstname) {
    this.fname = firstname;
    this.age = 40;
    this.sayAge = function() {
    	console.log(this.age);
    }
}

function Child(firstname) {
    this.saySomeThing = function() {
    	console.log(this.fname);
    	this.sayAge();
    }
    this.getName = function() {
    	return firstname;
    }
}
var child = new Child("张");
Parent.apply(child, [child.getName()]);
child.saySomeThing();
```
##### 4. 采用原型链的方式实现继承
实现原理:使子类原型对象指向父类的实例以实现继承,即重写类的原型,弊端是不能直接实现多继承

```
function Parent() {
    this.sayAge = function() {
    	console.log(this.age);
    }
}

function Child(firstname) {
    this.fname = firstname;
    this.age = 40;
    this.saySomeThing = function() {
    	console.log(this.fname);
    	this.sayAge();
    }
}

Child.prototype = new Parent();
var child = new Child("张");
child.saySomeThing();
```
##### 5. 采用混合模式实现继承

```
function Parent() {
    this.sayAge = function() {
    	console.log(this.age);
    }
}

Parent.prototype.sayParent = function() {
    alert("this is parentmethod!!!");
}

function Child(firstname) {
    Parent.call(this);
    this.fname = firstname;
    this.age = 40;
    this.saySomeThing = function() {
    	console.log(this.fname);
    	this.sayAge();
    }
}

Child.prototype = new Parent();
var child = new Child("张");
child.saySomeThing();
child.sayParent();
```
