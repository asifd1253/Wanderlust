// function wrapAsync(fn) {
//   return function (req, res, next) {
//     fn(req, res, next).catch(next);
//   };
// }

// module.exports = wrapAsync;

module.exports = function wrapAsync(fn) {
  if (typeof fn !== "function") {
    throw new TypeError(`wrapAsync expected a function but got ${typeof fn}`);
  }
  return function (req, res, next) {
    // Promise.resolve makes it safe for sync or async functions
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
