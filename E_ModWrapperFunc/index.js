// module wrapper function
// it is immediately invoked function

// data is private in iife

/*( function(exports, require, module, __filename, __dirname) {
    var name = "Ayush"
})();

console.log(name);
*/

( function(exports, require, module, __filename, __dirname) {
    const name = "Ayush"
    console.log(name);
})();

console.log(__dirname)
console.log(__filename)