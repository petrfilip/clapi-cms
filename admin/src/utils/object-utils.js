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
