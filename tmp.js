var proxy = new Proxy({}, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
  set(obj, prop, value) {
    return obj[prop] = value;
  },
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});

proxy.a = 2;

console.log(proxy.a);
