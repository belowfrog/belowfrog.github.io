const get = (obj, path) => {
  return path.split('.').reduce((memo, next) => {
    return memo[next];
  }, obj);
}

export {
  get,
}