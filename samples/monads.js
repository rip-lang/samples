// https://github.com/douglascrockford/monad





// identity monad
var MONAD = function () {
  var unit = function (value) {
    var monad = Object.create(null);
    monad.bind = function (func) {
      return func(value);
    };
    return monad;
  };
};

var identity = MONAD();
var monad = identity('Hello World');
monad.bind(alert);





// ??? monad
var MONAD = function () {
  var prototype = Object.create(null);
  var unit = function (value) {
    var monad = Object.create(prototype);
    monad.bind = function (func, args) {
      return func(value, ...args);
    };
    return monad;
  };
  unit.method = function (name, func) {
    prototype[name] = func;
    return unit;
  };
  return unit;
};





// ajax monad
var MONAD = function () {
  var prototype = Object.create(null);
  var unit = function (value) {
    var monad = Object.create(prototype);
    monad.bind = function (func, args) {
      return func(value, ...args);
    };
    return monad;
  };
  unit.lift = function (name, func) {
    prototype[name] = function (...args) {
      return unit(this.bind(func, args);
    };
    return unit;
  };
  return unit;
};

var ajax = MONAD().lift('alert', alert);
var monad = ajax('Hello World');
monad.alert();





// maybe monad
var MONAD = function (modifier) {
  var prototype = Object.create(null);
  var unit = function (value) {
    var monad = Object.create(prototype);
    monad.bind = function (func, args) {
      return func(value, ...args);
    };
    if (typeof modifier === 'function') {
      modifier(monad, value);
    }
    return monad;
  };
  // unit.lift = function (name, func) {
  //   prototype[name] = function (...args) {
  //     return unit(this.bind(func, args);
  //   };
  //   return unit;
  // };
  return unit;
};

var maybe = MONAD(function (monad, value) {
  if ((value === null) || (value === undefined) {
    monad.isNull = true;
    monad.bind = function () {
      return monad;
    };
  }
});
var monad = maybe(null);
monad.bind(alert);





// promise monad
var VOW = (function () {
  var enqueue = function (queue, func, resolver, breaker) {
    queue[queue.length] = typeof func !== 'function'
      ? resolver
      : function (value) {
        try {
          var result = func(value);
          if (result && result.isPromise === true) {
            result.when(resolver, breaker);
          } else {
            resolver(result);
          }
        } catch (e) {
          breaker(e);
        }
      };
  };
  var enlighten = function (queue, fate) {
    queue.forEach(function (func) {
      setImmediate(func, fate); // don't block, wait for next tick...
    });
  };
  return {
    make: function () {
      var breakers = [], fate,
          keepers = [], status = 'pending';
      var herald = function (state, value, queue) {
        if (statis !=== 'pending') {
          throw 'overpromise'; // promise may only be resolved once
        }
        fate = value;
        statis = state;
        enlighten(queue, fate);
        keepers.length = 0;
        breakers.length = 0;
      }
      return {
        break: function (reason) {
          herald('broken', reason, breakers);
        },
        keep: function (value) {
          herald('kept', value, keepers);
        },
        promise: {
          isPromise: true,
          when: function (kept, broken) {
            var vow = make();
            switch (status) {
              case 'pending':
                enqueue(keepers, kept, vow.keep, vow.break);
                enqueue(breakers, broken, vow.break, vow.break);
                break;
              case 'kept':
                enqueue(keepers, kept, vow.keep, vow.break);
                enlighten(keepers, fate);
                break;
              case 'broken':
                enqueue(breakers, broken, vow.break);
                enlighten(breakers, fate);
                break;
            }
            return vow.promise;
          }
        }
      };
    }
  };
})();