const Utils = {}

Utils.makeId = function() {
    return (Math.random()+1).toString(36).substring(7)
}

Utils.stringToTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default Utils
