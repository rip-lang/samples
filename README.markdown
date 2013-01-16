Rip is a programming language with a functional core surrounded by an object-oriented shell.

## PLANNED FEATURES
* lazy evaluation
* tail call optimization
* first-class classes and lambdas (classes and lambdas may be passed around just like any other object)
* multiple inheritence
* implicit returns from last statement in a block or file
* qualified imports via System.require (uses load path)
* references complain loudly when reassigned
* no built-in operator precedence (use parenthesis to specify precedence)

## KEYWORDS
* class - define a class
* ->, => - define a lambda, function, method, closure, callback
  * -> `return` returns from lambda in which it appears (behaves like Ruby's return in a method)
  * => `return` returns from invocation in which it is passed (behaves like Ruby's return in a block)
* public, protected, private - visibility (default is public)
* if, unless, elseif, else, switch, case - branching (if and unless may be used post-fix)
* for, in, while, until - looping (while and until may be used post-fix)
* throw, try, catch, finally - exception handling
* next, break - used in switches and loops for flow control (consider making these lambdas on switches and loops)
* return - exit a block without executing the remaining statements (consider making this a property on lambdas) also return value for required files

## SPECIAL REFERENCES
* self - refers to the current receiver and is usually implied (inside a lambda, self refers to the lambda; inside a class, self refers to the class)
* scope - refers to the class or lambda that encloses the current self
* receiver - lambda property: refers to the object the is currently receiving the currently-executing message (lambda)
* true, false, nil - pre-defined instances of their respective classes
* System - defines properties for built-in classes and require mechanism
* Rip - hooks for metaprogramming

## OTHER
* comments start with # and continue to the end of the line
* names are strings of any valid unicode character except whitespaces not starting with a digit
* namespaces can be created by nesting classes
* subclasses and lambdas are accessed with a period
* subclasses may re-implement base class members
* operators are implemented as regular lambdas
* lambdas are invoked with ()
* code inside individual file is a module
