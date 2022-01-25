//https://stackoverflow.com/questions/8834126

function isArray(obj) {
    return (!!obj) && (obj.constructor === Array);
}

function isObject(obj) {
    return (!!obj) && (obj.constructor === Object);
}

module.exports = {
    isArray, isObject
}
