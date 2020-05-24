export function move(array, from, to) {
  const elm = array.splice(from, 1)[0]
  array.splice(to, 0, elm)
  return array
}

export const moveTo = (obj, key, value, index) => {
  removeFromObject(obj, key)
  addToObject(obj, key, value, index)
}

export const getIndexOfProperty = (obj, propertyName) => {
  return Object.keys(obj).find((key, index) => (key === propertyName ? index : false))
}

export const getPropertyOnIndex = (obj, index) => {
  return Object.keys(obj).find((key, i) => (i === index ? key : false))
}

export const addToObject = function (obj, key, value, index) {
  // Create a temp object and index variable
  const temp = {}
  let i = 0

  // Loop through the original object
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // If the indexes match, add the new item
      if (i === index && key && value) {
        temp[key] = value
      }

      // Add the current item in the loop to the temp obj
      temp[prop] = obj[prop]

      // Increase the count
      i++
    }
  }

  // If no index, add to the end
  if ((!index || i === index) && key && value) {
    temp[key] = value
  }

  return temp
}

export const removeFromObject = (obj, key) => {
  const copy = Object.assign({}, obj)
  delete copy[key]
  return copy
}
