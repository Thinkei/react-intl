export default function compose(...funcs) {
  return function(val) {
    return funcs.reverse().reduce((result, func) => func(result), val);
  };
}
