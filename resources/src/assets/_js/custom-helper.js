module.exports.hoge = function(str) {
    return '俺の' + str;
}

module.exports.myArray = function (array) {
    var result = [];
    for(var i=0, len = array.length;i < len;i++) {
        result.push('俺の' + array[i].title);
    }
    return result.join(', ');
}
