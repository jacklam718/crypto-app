const throttle = (func, delay = 250) => {
  let throttleId;
  return (...args) => {
    clearTimeout(throttleId);
    throttleId = setTimeout(() => func(...args), delay);
  };
};

export default throttle;
