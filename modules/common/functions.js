export let fun = {
  singleObjectToArray: (object) => {
    let array = []
    // empty object
    if (Object.keys(object).length === 0) {
      return array
    } else if (object.constructor.name !== 'Array') {
      // single object :- not a array
      array.push(object)
      return array
    } else {
      return object
    }
  }
}
